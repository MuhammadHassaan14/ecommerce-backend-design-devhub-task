# eCommerce Backend Design

This repository contains the backend and frontend setup for a complete eCommerce platform. The backend is built with **Node.js, Express, MongoDB (Mongoose)** and renders dynamic views using **EJS**. It features full user authentication, protected routes, database pagination, and a matching Tailwind CSS design system.

## Project Structure
- `frontend/`: Contains the original React + Vite source code used for UI design.
- `backend/`: Contains the complete Node.js Express server.
  - `server.js`: Main application entry point.
  - `routes/`: Routing logic for `/auth` and `/products`.
  - `views/`: EJS templates styled with Tailwind.
  - `models/`: Mongoose schemas (User, Product).
  - `public/`: Static assets (images, compiled CSS).

## Local Development

### Prerequisites
- Node.js installed.
- Local MongoDB server running (or a MongoDB Atlas URI).

### Setup
1. Open terminal in the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file in the `backend` folder:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
4. **Seed the database** with sample products:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm start
   ```
Visit `http://localhost:3000` to view the app!

## Deployment (Render)

If deploying to Render, ensure your settings match the following:
- **Root Directory:** `backend` *(Crucial!)*
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `MONGO_URI`: Your MongoDB Atlas Connection String
  - `JWT_SECRET`: A secure random string

*Note: Make sure to allow network access from anywhere (`0.0.0.0/0`) in your MongoDB Atlas settings.*