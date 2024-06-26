# TaxCrafter

This project is a software solution for managing Goods and Services Tax (GST) calculations for different product categories. The software has functionalities to create product categories, set GST rates, manage products within categories, record sales, and generate bills with calculated taxes.

The project aims to provide a system that allows users to:

- Set different GST rates for various product categories.
- Create, manage, and categorize products.
- Record sales while automatically calculating the tax rate based on the product category.
- Generate a final bill with taxes for multiple products of different categories.

# Set Up

Prerequisites
 
- Node.js and npm installed

# Installation

- Clone the repository:
  
   ```bash
    git clone https://github.com/aayushk9/TaxCrafter.git
  ```
   
- Install dependencies:
  
    ```bash
    npm install
   ```
    
# Usage 

- Start the application:
  
   ```bash
   node app.js
   ```
   
- Access the application via browser at http://localhost:3000

# Database SetUp

- Set up a MongoDB instance. (MongoDB Atlas)
- Replace URI with your specific MongoDB URI
- .env File Configuration: Create a .env file in root directory
- Struture of .env file -> MONGODB_URI = your_mongodb_uri_here
- Code Implementation -> load .env package in app.js and than save URI as const URI= process.env.MONGODB_URI
- Connect the application to the MongoDB database.

# Configuration

- Configure environment variables for MongoDB connection.
- Set up .env file with required credentials.

# Technologies Used

- Node.js
- Express.js
- MongoDB
- HTML/CSS/JavaScript

