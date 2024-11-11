const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Update with your front-end URL
  methods: ['GET', 'POST' ,'PUT'], // Add any other methods you use
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());
const port = 3065;

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Delivery System",
  password: "biruk4you",
  port: 6543,
});
db.connect();

////************this section is for the Home page V1(version 1)************************////

//RESTAURAT NAME

app.get("/getRestaurant_name",async(req,res) =>{
    const getRestaurant_name = await db.query("select restaurant_name from restaurant");
     
    const restaurants = getRestaurant_name.rows.map((restaurant) =>
       restaurant.restaurant_name
      );
      res.json(restaurants);
})

//GET CATAGORIES

app.get("/getCategories", async (req, res) => {
    try {
      const { restaurant_name } = req.body; 

      const getCategories = await db.query(
        `SELECT DISTINCT c.category_name 
         FROM category c
         INNER JOIN restaurant r ON c.restaurant_id = r.restaurant_id
         WHERE r.restaurant_name = $1`,
        [restaurant_name]
      ); 
  
      const categories = getCategories.rows.map((category) => category.category_name);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  });

  //GET MENU
  
  app.get("/getMenu", async (req, res) => {
    try {
      const { restaurant_name, category_name } = req.body; // Expecting restaurant_name and category_name in request body
  
      const getMenuByCategory = await db.query(
        `SELECT DISTINCT f.food_name, f.picture_url 
         FROM food f
         INNER JOIN category c ON c.category_id = f.category_id
         INNER JOIN restaurant r ON r.restaurant_id = c.restaurant_id
         WHERE r.restaurant_name = $1 AND c.category_name = $2`,
        [restaurant_name, category_name]
      );
  
      const menuItems = getMenuByCategory.rows; // Get the actual rows to return
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu by category:", error);
      res.status(500).json({ error: "Failed to retrieve menu" });
    }
  });

///ADDING ORDER

  app.put("/addToOrder", async (req, res) => {
    try {
        
        const { user_id, food_id } = req.body;
        const {restaurant_id,total_price} = req.body;

        if (!user_id || !food_id) {
            return res.status(400).json({ error: "user_id and food_id are required" });
        }

        const insertOrder = await db.query(
            "INSERT INTO orders (user_id, food_id , restaurant_id , total_price ,placed_at) VALUES ($1, $2,$3,$4, NOW()) RETURNING *",
            [user_id, food_id ,restaurant_id,total_price]
        );

        res.status(201).json({ order: insertOrder.rows[0] });
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ error: "Failed to add order" });
    }
}); 

//giving orders to the components over all get responses
app.get("/getOrderData", async (req, res) => {
  try {
    const { user_id } = req.query;
    const getOrderData = await db.query(`
      SELECT *
      FROM orders 
      WHERE user_id = $1
      AND placed_at > NOW() - INTERVAL '60 minutes'
    `, [user_id]);
    const grandTotal = getOrderData.rows.reduce((acc, order) => acc + order.total_price, 0);
    res.json({ orders: getOrderData.rows, grandTotal });
  } catch (error) {
    console.error("Error getting total price:", error);
    res.status(500).json({ error: "Failed to get total price" });
  }
});


  //////************* this is for authentication V1  ***************** */////

///SIGN UP USERS TO BE CONTINUED FOR THIS SECTION

app.post("/signup",async(req,res) => {
  try {
    const {username,email,password,address,phone} = req.body;
  const signInData = await db.query(`
    insert into users
     (username,email,password,address,phone,created_at) 
     VALUES ($1, $2,$3,$4,$5,NOW())`,
     [username,email,password,address,phone])
     res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error adding order:", error);
        res.status(500).json({ error: "Failed to add user" });
  }
});

app.get("/user/:id", async (req, res) => {
  const userId = req.body.password;

  try {
    const userQuery = await db.query(
      `SELECT id, email, name FROM users WHERE id = $1`,
      [userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userQuery.rows[0];
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

//**********************   this is for admin page  **************************//

app.post("/addUsers", async (req, res) => {
  const { firstName, lastName, address, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !password || !address || !phone) {
    return res.status(400).json({ error: "All fields are required." });
}
  
  try {

    await db.query(
      `
      INSERT INTO users (username, password, email, address, phone)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [firstName + " " + lastName, password, email, address, phone]
    );
 
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(port, () => {
  console.log(`Server connected on port: ${port}`);
});


//********************       the restaurant page        *******************//

app.post("/AddRestaurant", async (req, res) => {
  const { restaurant, phone, address } = req.body;
  try {
    await db.query(
      `INSERT INTO restaurant (restaurant_name, Phone, address, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [restaurant, phone, address]
    );
    res.status(201).json({ message: "Restaurant added successfully!" });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "An error occurred while adding the restaurant." });
  }
});

app.put("/UpdateRestaurant", async (req, res) => {
  const { restaurant, updatedRestaurant, updatedPhone, updatedAddress } = req.body;
  try {
    const updateResult = await db.query(
      `UPDATE restaurant
       SET restaurant_name = $1, phone = $2, address = $3, created_at = NOW()
       WHERE restaurant_name = $4`,
      [updatedRestaurant, updatedPhone, updatedAddress, restaurant]
    );
 
    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.status(200).json({ message: "Restaurant updated successfully!" });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ error: "An error occurred while updating the restaurant." });
  }
});
