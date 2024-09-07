
# Gift Shop Website

This project is a full-stack application for a gift shop that offers products like flowers, vases, and more. The website allows clients to browse products and place orders, while the shop owner (admin) can manage products and view orders through an admin dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

## Features

### Client (User)
- Browse and view products.
- Place orders for selected products.
- View their order history.

### Admin (Shop Owner)
- Add, update, and remove products.
- View orders placed by users.
- Manage product inventory.

## Tech Stack

- **Frontend**: React, CSS, Emotion (for styling)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **State Management**: Redux Toolkit, Redux Saga
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub

## System Design

The project is structured to have separate sections for clients and the admin. 

- **User Flow**: Users can browse products, add them to their cart, and place an order after logging in.
- **Admin Flow**: Admin can log into a dashboard where they can manage products and view user orders.

### Backend
- **Models**: User, Product, Order
- **Routes**: Authentication, Product Management, Order Management
- **Controllers**: Handles the logic for each route, interacting with MongoDB through Mongoose.

### Frontend
- **Components**: Separate components for listing products, order forms, admin dashboard, etc.
- **State Management**: Redux is used for managing the state of products, orders, and user authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gift-shop.git
   cd gift-shop
## Backend Setup


```
## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the `backend` folder and add the following:

```
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

Run the Backend:

```bash
npm start
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Run the Frontend:

```bash
npm start
```
