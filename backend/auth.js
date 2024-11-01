const router = require("express").Router();
import express, { Router } from "express";
import cors from 'cors';
import pg from "pg";

const app = express();
app.use(cors());
const port = 3005;

const db = new pg.Client({
  user: "user-admin",
  host: "localhost",
  database: "Delivery System",
  password: "biruk4you",
  port: 6543,
});
db.connect();

////************this section is for the Home page V1(version 1)************************////

//RESTAURAT NAME

router.get("/getRestaurant_name",async(req,res) =>{
    const getRestaurant_name = await db.query("select restaurant_name from restaurant");
     
    const restaurants = getRestaurant_name.rows.map((restaurant) =>
       restaurant.restaurant_name
      );
      res.json(restaurants);
})

//GET CATAGORIES

router.get("/getCategories", async (req, res) => {
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
  
  router.get("/getMenu", async (req, res) => {
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

  router.put("/addToOrder", async (req, res) => {
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
  //////************* this is for authentication V1  ***************** */////

///SIGN UP USERS TO BE CONTINUED FOR THIS SECTION

Router.post("/signup",async(req,res) => {
  try {
    const {username,email,password,address,phone} = req.body;
  const signInData = await db.query(`
    insert into users
     (username,email,password,address,phone,created_at) 
     value ($1, $2,$3,$4,$5,NOW())`,
     [username,email,password,address,phone])
  } catch (error) {
    console.error("Error adding order:", error);
        res.status(500).json({ error: "Failed to add user" });
  }
});

router.get("/user/:id", async (req, res) => {
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

router.post("/addUsers", async (req, res) => {
  const { firstName, lastName, address, email, phone, password, role } = req.body;

  try {

    const roleResult = await db.query(
      "SELECT role_id FROM roles WHERE role_name = $1",
      [role]
    );

    if (roleResult.rows.length === 0) {
      return res.status(400).json({ error: "Role not found" });
    }
    const roleId = roleResult.rows[0].role_id;

    await db.query(
      `
      INSERT INTO users (username, password, email, address, phone, role_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [firstName + " " + lastName, password, email, address, phone, roleId]
    );

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(port,(req,res) => {
  console.log(`server connected on port: ${port}`)
})
