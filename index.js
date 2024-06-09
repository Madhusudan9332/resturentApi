// Import required modules
// import express from 'express';
// import bodyParser from 'body-parser';

// Initialize Express app
const express = require("express");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const PORT = 3001;

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Sample restaurant data
let restaurants = [
    { 
        id: 1, 
        name: 'Tasty Burger', 
        cuisine: 'American', 
        rating: 4.5, 
        foods: ['Burger', 'Fries', 'Milkshake', 'Chicken Sandwich', 'Onion Rings', 'Salad', 'Hot Dog', 'Fish and Chips', 'Cheeseburger', 'Soda', 'Ice Cream', 'Nachos', 'Wings', 'Wrap', 'Pancakes', 'French Toast', 'Hash Browns', 'Chicken Tenders', 'Quesadilla', 'BBQ Ribs', 'Pizza']
    },
    { 
        id: 2, 
        name: 'Spice Bazaar', 
        cuisine: 'Indian', 
        rating: 4.0, 
        foods: ['Curry','milk' ,'Naan', 'Biryani', 'Tandoori Chicken', 'Samosa', 'Raita', 'Paneer Tikka', 'Dosa', 'Pakora', 'Chaat', 'Gulab Jamun', 'Jalebi', 'Korma', 'Lassi', 'Chutney', 'Bhaji', 'Bhel Puri', 'Pav Bhaji', 'Vada', 'Rice', 'Kebab', 'Paratha']
    },
    { 
        id: 3, 
        name: 'Sushi Palace', 
        cuisine: 'Japanese', 
        rating: 4.8, 
        foods: ['Sushi', 'Sashimi', 'Miso Soup', 'Tempura', 'Ramen', 'Teriyaki', 'Udon', 'Nigiri', 'Rolls', 'Edamame', 'Yakitori', 'Wasabi', 'Gyoza', 'Tempura', 'Chirashi', 'Sake', 'Tofu', 'Donburi', 'Sunomono', 'Takoyaki', 'Okonomiyaki', 'Matcha']
    },
];

// API endpoints

// Get all restaurants
app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

// Get a specific restaurant by ID
app.get("/api/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.json(restaurant);
});

// Get restaurants by name or food name
app.get("/api/restaurants/search/:query", (req, res) => {
    let query = req.params.query || "";
    query = query.toLowerCase();
    console.log(query);
    const results = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query) 
    ||
      ( restaurant.cuisine.toLowerCase().includes(query) )
    );
    res.json(results);

})


// Get restaurants by category of food
app.get('/api/restaurants/food/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const results = restaurants.filter(restaurant => restaurant.foods.some(food => food.toLowerCase().startsWith(category)));
    res.json(results);
});

// Add a new restaurant
app.post("/api/restaurants", (req, res) => {
  const { name, cuisine, rating, foods } = req.body;
  if (!name || !cuisine || !rating || !foods) {
    return res
      .status(400)
      .json({ message: "Name, cuisine, rating, and foods are required" });
  }
  const newRestaurant = {
    id: restaurants.length + 1,
    name,
    cuisine,
    rating,
    foods,
  };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// Update an existing restaurant
app.put("/api/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  restaurant.name = req.body.name || restaurant.name;
  restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
  restaurant.rating = req.body.rating || restaurant.rating;
  restaurant.foods = req.body.foods || restaurant.foods;
  res.json(restaurant);
});

// Delete a restaurant
app.delete("/api/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restaurants = restaurants.filter((restaurant) => restaurant.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
