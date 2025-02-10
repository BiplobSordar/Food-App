import { Request, Response } from "express"
import { query } from "../DB/connect";
import Stripe from "stripe";


type CheckoutSessionRequest = {
  user_id: string,
  orderItems: {
    menu_id: string,
    restaurant_id: string,
    quantity: number
  }[],
  input: any,
  total_amount: any
}


export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { user_id, orderItems, input, total_amount }: CheckoutSessionRequest = req.body
  console.log(total_amount)

  // 1. Group items by restaurant
  const itemsByRestaurant = orderItems.reduce((grouped: any, item) => {
    const { restaurant_id } = item;
    if (!grouped[restaurant_id]) {
      grouped[restaurant_id] = [];
    }
    grouped[restaurant_id].push(item);
    return grouped;
  }, {});




  // 2. Create main order
  const main_order: any = await query(
    `INSERT INTO orders (user_id, total_amount, status,city,country,address) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *`,
    [user_id, total_amount, 'pending', input.city, input.country, input.address]
  );


  let totalPrice = 0;
  const subOrders = [];

  // 3. Create sub-orders and calculate total price
  for (const [restaurantId, restaurantItems] of Object.entries(itemsByRestaurant)) {
    let subOrderTotal = 0;
    console.log(restaurantId, restaurantItems)

    for (const item of restaurantItems as any) {
      const result = await query(
        `SELECT * FROM menus WHERE id = $1`,
        [item.menu_id]
      );
      const menu: any = result.rows[0]
      subOrderTotal += menu.price * item.quantity;
    }

    totalPrice += subOrderTotal;

    // // create subOrder 

    const sub_result: any = await query(
      `INSERT INTO sub_order (order_id, restaurant_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [main_order.rows[0].id, restaurantId, subOrderTotal, 'pending']
    );

    for (const item of restaurantItems as any) {
      await query(
        `INSERT INTO order_item (sub_order_id, menu_id, quantity) VALUES ($1, $2, $3)`,
        [sub_result.rows[0].id, item.menu_id, item.quantity]
      );
    }

    subOrders.push(sub_result.rows[0]);
  }




  if (!main_order?.rows?.[0]?.id) {
    throw new Error('Order ID is missing or invalid');
  }

  const menu_ids = orderItems.map((item: any) => (item.menu_id))
  const orderMenuItems: any = await query(`SELECT * 
    FROM menus 
    WHERE id = ANY($1::uuid[])`, [menu_ids])
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA'],
    },
    line_items: orderMenuItems.rows.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || 'Unknown Item',
          description: item.description || '',
          images: [item.image_url || 'https://via.placeholder.com/150'],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    })),
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/order`,
    cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cart`,
    metadata: {
      orderId: main_order.rows[0].id,
      total: total_amount.toFixed(2),
      orderSummary: JSON.stringify(
        orderMenuItems.rows.map((item: any) => ({
          name: item.name || 'Unknown Item',
          quantity: item.quantity || 0,
          price: item.price || 0,
        }))
      ),
    },
  });


  if (!session.url) {
    res.status(400).json({ success: false, message: "Error while creating session" });
    return
  }

  res.status(200).json({
    success: true,
    session
  });
  return




}

export const webhook = async (req: Request, res: Response): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
    return
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const order: any = await query(`select * from orders where id = $1`, [session.metadata?.orderId])
      //  Order.findById(session.metadata?.orderId);

      if (!order.rows[0]) {
        res.status(404).json({ message: "Order not found" });
        return
      }

      // Update the order with the amount and status
      query(`update orders set status =$1 where id = $2`, ['confirmed', order.rows[0].id])
    } catch (error) {
      console.error('Error handling event:', error);
      res.status(500).json({ message: "Internal Server Error" });
      return
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
}

export const getOrders = async (req: Request, res: Response): Promise<void> => {


  const userId = req.id

  try {

    const result = await query(`SELECT 
    orders.id AS order_id, 
    orders.user_id, 
    orders.created_at AS order_created_at, 
    sub_order.id AS sub_order_id, 
    sub_order.restaurant_id, 
    orders.status AS order_status, 
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'menu_id', menus.id,
            'restaurant_id', menus.restaurant_id,
            'name', menus.name,
            'description', menus.description,
            'price', menus.price,
            'image_url', menus.image_url
        )
    ) AS menus
FROM 
    orders
INNER JOIN 
    sub_order ON sub_order.order_id = orders.id
INNER JOIN 
    order_item ON order_item.sub_order_id = sub_order.id
INNER JOIN 
    menus ON menus.id = order_item.menu_id
WHERE 
    orders.user_id = $1 AND orders.status NOT IN ($2, $3)
GROUP BY 
    orders.id, 
    orders.user_id, 
    orders.created_at, 
    sub_order.id, 
    sub_order.restaurant_id, 
    orders.status
ORDER BY 
    orders.created_at DESC;`, [userId, 'pending', 'delivered'])
    console.log(result.rows[0])
    res.status(200).json({ success: true, order: result.rows[0] })
    return
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server Error Connot Get The Orders' })
    return
  }
}

// export const getRestaurantOrders = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.id

//     const restaurnat_id: any = await query(`select * from restaurants where owner=$1`, [userId])
//     if (!restaurnat_id.rows[0]) {
//       res.status(404).json({
//         success: false,
//         message: "Cannot Find Admin Restaurant"
//       })
//       return
//     };
//     // console.log(restaurnat_id.rows[0], 'thsi is tem user restaurant')

//     const subOrder = await query(`select * from sub_order where restaurant_id=$1 and status Not In ($2)`, [restaurnat_id.rows[0].id, 'delivered'])
//     let sub_orders: any = subOrder.rows



//     if (!sub_orders) {
//       res.status(404).json({
//         success: false,
//         message: "Restaurant Order Are Not Found"
//       })
//       return
//     }
//     // console.log(sub_orders,'this is the sub_orders')

//     let menu: any = []
//     for (const order of sub_orders as any) {
//       const items = await query(`select menu_id from order_item where sub_order_id=$1`, [order.id])
//       for (const id of items.rows as any) {
//         menu.push(id.menu_id)
//       }
//     }

//     const getMenus=await query(`select * from menus where id= Any($1)`,[menu])
//     console.log(getMenus.rows,'thsi is the mensus')


//     // console.log(restaurnat_id.rows)
//     res.status(200).json({ message: 'Get the orders', success: true, menu })
//     return
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Internal Server Error At RestaurantControllers.ts' })
//     return
//   }
// }
export const getRestaurantOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;

    // Combined query to fetch restaurant orders and associated menu items
    const combinedQuery = `
    WITH restaurant AS (
  SELECT id 
  FROM restaurants 
  WHERE owner = $1
),
sub_orders AS (
  SELECT so.id AS sub_order_id, o.address, o.status
  FROM sub_order so
  JOIN restaurant r ON so.restaurant_id = r.id
  JOIN "orders" o ON so.order_id = o.id -- Join with the order table to get the address and status
  WHERE so.status <> 'delivered'
),
order_items AS (
  SELECT oi.menu_id, so.address, so.status
  FROM order_item oi
  JOIN sub_orders so ON oi.sub_order_id = so.sub_order_id
)
SELECT m.*, oi.address, oi.status
FROM menus m
JOIN order_items oi ON m.id = oi.menu_id;
    `;

    // Execute the combined query
    const result = await query(combinedQuery, [userId]);

    if (!result.rows.length) {
      res.status(404).json({
        success: false,
        message: "No orders or menus found for the restaurant",
      });
      return;
    }

    // Send the response
    res.status(200).json({
      success: true,
      message: "Orders and menus fetched successfully",
      menus: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error at RestaurantControllers.ts",
    });
  }
};