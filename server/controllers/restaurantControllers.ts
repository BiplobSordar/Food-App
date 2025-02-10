import { Request, Response } from "express";
import { query } from "../DB/connect";
import destroyImage from "../utils/deleteImage";
import cloudinary from "../utils/cloudinary";




export const createRestaurant = async (req: Request, res: Response, next: Function): Promise<void> => {

    const { name, city, country, deliveryTime, cuisines } = req.body

    try {

        const result = await query(`select * from restaurants where owner =$1`, [req.id])

        let restaurant = result.rows[0]
        if (restaurant) {
            res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
            return
        }

        const createdRestaurantResult: any = await query(`Insert Into restaurants (owner,name,country,city,delivery_time,cuisines) values($1,$2,$3,$4,$5,$6) returning *`, [req.id, name, country, city, deliveryTime, cuisines])

        res.status(200).json({ message: 'Resturent Created Successfully', success: true, restaurantId: createdRestaurantResult.rows[0].id })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error .Cannot Create Restaurant' })
        return
    }
}

export const getRestaurant = async (req: Request, res: Response): Promise<void> => {

    try {
        const result = await query(`SELECT 
    restaurants.*,
    COALESCE(JSON_AGG(menus.*) FILTER (WHERE menus.id IS NOT NULL), '[]') AS menus
    FROM 
    restaurants
    LEFT JOIN 
    menus 
    ON 
    menus.restaurant_id = restaurants.id
    WHERE 
    owner = $1
    GROUP BY 
     restaurants.id`, [req.id])

        let restaurant: any = result.rows[0]
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant Not Exist"
            })
            return
        };

        res.status(200).json({ restaurant, success: true })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error .Cannot Get The Restaurant' })
        return
    }
}

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {

    try {
        const result = await query(`select * from restaurants`, [])

        let restaurants: any = result.rows
        if (!restaurants) {
            res.status(404).json({
                success: false,
                message: "Restaurant Not Exist"
            })
            return
        };

        res.status(200).json({ restaurants, success: true })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error .Cannot Get  Restaurants' })
        return
    }
}
export const getSigleRestaurant = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    console.log(id)


    try {
        const result = await query(`SELECT 
    restaurants.*,
    COALESCE(JSON_AGG(menus.*) FILTER (WHERE menus.id IS NOT NULL), '[]') AS menus
    FROM 
    restaurants
    LEFT JOIN 
    menus 
    ON 
    menus.restaurant_id = restaurants.id
    WHERE 
    restaurants.id = $1
    GROUP BY 
     restaurants.id`, [id])

        let restaurant: any = result.rows[0]
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant Not Exist"
            })
            return
        };
        console.log(restaurant)

        res.status(200).json({ restaurant, success: true })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error .Cannot Get  Restaurants' })
        return
    }
}



export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    const { name, city, country, deliveryTime, cuisines } = req.body;
    try {
        const result = await query('select * from restaurants where owner =$1', [req.id])
        const restaurant = result.rows[0]


        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return
        };


        await query('update restaurants set name=$1 ,delivery_time =$2,city=$3,country=$4,cuisines=$5 where owner=$6', [name, deliveryTime, city, country, cuisines, req.id])
        res.status(200).json({ message: 'Restaurant Data Updated Successfully', success: true })
        return
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: 'Internal Server Error.Cannot Update The Restaurant' })
        return
    }
}

export const uploadRestaurantBanner = async (req: Request, res: Response): Promise<void> => {
    const { file, restaurantId } = req.body

    const userId = req.id
    try {

        const restaurant: any = await query(`select * from restaurants where id=$1 and owner=$2`, [restaurantId, userId])
        console.log(restaurant.rows[0])
        if (!restaurant.rows[0]) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return
        };
        if (restaurant.rows[0].image_url) {
            console.log('hello i am herer at image distry section')
            destroyImage(restaurant.rows[0].image_url)
        }


        const uploadResponse: any = await cloudinary.uploader.upload(file)
        await query(`update restaurants set image_url=$1 where id=$2`, [uploadResponse.url, restaurantId])
        res.status(200).json({ message: 'Banner Uploded Successfully', success: true, image_url: uploadResponse.url })
        return
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error At RestaurantControllers.ts' })
        return
    }
}




// export const updateOrderStatus = async (res: Response, req: Request): Promise<void> => {
//     const { orderId } = req.params
//     const { status } = req.body
//     try {
//         const [order]: any = await query('select * from orders where id =$1', [orderId])
//         if (!order) {
//             res.status(404).json({
//                 success: false,
//                 message: "Order not found"
//             })
//             return
//         }

//         await query('update orders set status =$1 where id =$2', [status, orderId])

//         res.status(200).json({ message: "Status updated", success: true })
//         return
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal Server Error At RestaurantControllers.ts' })
//         return
//     }
// }

//




export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.searchText || '';
        const searchQuery = (req.query.searchQuery as string) || '';
        console.log(searchQuery,'this is the search query')
        const selectedCuisines = ((req.query.selectedCuisines as string) || '')
            .split(',')
            .map(cuisine => cuisine.trim()) // Trim spaces
            .filter(cuisine => cuisine.length > 0); // Remove empty values

        // Base query
        let q = 'SELECT * FROM restaurants WHERE 1=1';
        const queryParams: any[] = [];

        // Search based on searchText (restaurantName, city, country, cuisines)
        if (searchText) {
            q += ` AND (name ILIKE $${queryParams.length + 1} OR city ILIKE $${queryParams.length + 1} OR country ILIKE $${queryParams.length + 1} OR EXISTS (SELECT 1 FROM unnest(cuisines) AS cuisine WHERE cuisine ILIKE $${queryParams.length + 1}))`;
            queryParams.push(`%${searchText}%`);
        }

        // Filter based on searchQuery (restaurantName)
        if (searchQuery) {
            
            q += ` AND (name ILIKE $${queryParams.length + 1} OR city ILIKE $${queryParams.length + 1} OR country ILIKE $${queryParams.length + 1} OR EXISTS (SELECT 1 FROM unnest(cuisines) AS cuisine WHERE cuisine ILIKE $${queryParams.length + 1}))`;
            queryParams.push(`%${searchQuery}%`);
        }

        // Filter based on selectedCuisines (cuisines array)
        if (selectedCuisines.length > 0) {
            q += ` AND cuisines @> $${queryParams.length + 1}::text[]`;
            queryParams.push(selectedCuisines); // Pass array directly
        }

        

        // Execute the query
        const { rows: restaurants } = await query(q, queryParams);
     

        res.status(200).json({
            success: true,
            data: restaurants
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};
export const getCuisines = async (req: Request, res: Response): Promise<void> => {
 
    try {
        const result: any = await query(`SELECT DISTINCT unnest(cuisines) AS cuisines FROM restaurants;`, [])
        const cuisineValues = result.rows.map((item: any) => item.cuisines);
        console.log(cuisineValues);

        res.status(200).json({ message: '', success: true, cuisine: cuisineValues })
        return
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error At RestaurantControllers.ts' })
        return
    }
}
