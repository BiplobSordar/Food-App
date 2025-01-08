import { MenuItem } from "./components/MenuCard";

  
export  type Restaurant = {
    imageUrl: string;
    restaurantName: string;
    cuisines: string[];
    deliveryTime: number;
    menus: MenuItem[];
  };
  
  
 
 
export  const restaurantsData: Restaurant[] = [
    {
      imageUrl: "https://via.placeholder.com/600x400",
      restaurantName: "Delicious Bites",
      cuisines: ["Italian", "Mexican", "Chinese"],
      deliveryTime: 30,
      menus: [
        {
          id: 1,
          name: "Margherita Pizza",
          description: "Classic cheese and tomato pizza with a crispy crust.",
          price: 299,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          name: "Chicken Biryani",
          description: "Fragrant basmati rice with tender chicken pieces and spices.",
          price: 399,
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      imageUrl: "https://via.placeholder.com/600x400",
      restaurantName: "The Spicy Spoon",
      cuisines: ["Indian", "Thai", "Continental"],
      deliveryTime: 25,
      menus: [
        {
          id: 3,
          name: "Paneer Tikka",
          description: "Cubes of paneer marinated and grilled to perfection.",
          price: 249,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 4,
          name: "Tom Yum Soup",
          description: "Hot and sour Thai soup with fresh ingredients.",
          price: 199,
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      imageUrl: "https://via.placeholder.com/600x400",
      restaurantName: "Burger Haven",
      cuisines: ["American", "Fast Food"],
      deliveryTime: 20,
      menus: [
        {
          id: 5,
          name: "Cheeseburger",
          description: "A juicy burger with melted cheese and fresh toppings.",
          price: 149,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 6,
          name: "Fries Combo",
          description: "Crispy fries served with ketchup and your choice of dip.",
          price: 99,
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      imageUrl: "https://via.placeholder.com/600x400",
      restaurantName: "Ocean's Delight",
      cuisines: ["Seafood", "Mediterranean"],
      deliveryTime: 35,
      menus: [
        {
          id: 7,
          name: "Grilled Salmon",
          description: "Fresh salmon grilled with a blend of Mediterranean spices.",
          price: 499,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 8,
          name: "Garlic Prawns",
          description: "Juicy prawns cooked in a rich garlic butter sauce.",
          price: 399,
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      imageUrl: "https://via.placeholder.com/600x400",
      restaurantName: "Sweet Treats",
      cuisines: ["Desserts", "Bakery"],
      deliveryTime: 15,
      menus: [
        {
          id: 9,
          name: "Chocolate Cake",
          description: "A rich and moist chocolate cake topped with ganache.",
          price: 299,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 10,
          name: "Blueberry Muffin",
          description: "Soft and fluffy muffins loaded with blueberries.",
          price: 129,
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
  ];
  