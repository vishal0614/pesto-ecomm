# E-Commerce Microservices Monorepo

This project demonstrates an e-commerce system built using a microservices architecture with NestJS. The system includes modules for user authentication, product management, and order processing. MongoDB is used as the database, and Mongoose is utilized for schema definitions. Optimistic locking is implemented to handle concurrent access to resources.

## Authentication
The authentication mechanism in this project utilizes the Passport middleware for Node.js along with the Passport-JWT strategy. Passport provides a flexible and modular authentication middleware, while Passport-JWT is used to validate JSON Web Tokens (JWT) to secure API endpoints.

## Modules

### Auth Module

- Handles user registration and authentication.
- Manages JWT tokens for secure access.

### Product Module

- Provides CRUD operations for products.
- Implements optimistic locking to manage concurrent updates.

### Order Module

- Manages order placement, updates, and retrieval.
- Ensures that the order processing is consistent and reliable.

## Features

- **Microservices Architecture**: Each module (Auth, Product, Order) is a separate microservice.
- **Monorepo Setup**: All microservices are contained within a single repository.
- **MongoDB**: Used as the primary database for storing user, product, and order data.
- **Mongoose**: For schema definitions and database interactions.
- **Optimistic Locking**: Ensures data consistency during concurrent updates.
- **Validation**: Uses [class-validator](https://www.npmjs.com/package/class-validator) for validating data across all modules, ensuring data integrity and proper input constraints.

## Getting Started

### Prerequisites

- Node.js (v20.x)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/e-commerce-microservices.git
   cd e-commerce-microservices

2. Install dependencies:
   npm install

3. Running the Application: 
   npm run start

### Route Lists
-------------------------------------
1) POST    /auth/register          
2) POST    /auth/login     
3) GET     /auth/user              
-------------------------------------
1) GET     /products              
2) GET     /products/:id           
3) POST    /products/add 
4) PUT     /products/:id          
5) DELETE  /products/:id          
-------------------------------------
1) POST    /orders/place    
2) GET     /orders/:id      
3) PUT     /orders/:id      
4) GET     /orders          
5) DELETE  /orders/:id      
-------------------------------------