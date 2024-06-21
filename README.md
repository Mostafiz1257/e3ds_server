# Meeting Room Booking System for Co-working Spaces

## Project Overview

Welcome to the Meeting Room Booking System for Co-working Spaces. This web application is designed to streamline the process of reserving meeting rooms in a co-working environment. It provides both administrative and user functionalities for managing room bookings efficiently.

## Live URL

Access the application live at: [Meeting Room Booking System](https://meeting-room-booking-system-liart.vercel.app/)

## Features

### Admin Features
- **Room Management**: Create, update, and delete rooms with details such as name, room number, floor number, capacity, price per slot, and available amenities.
- **Slot Management**: Create time slots for each room, specifying the date, start time, and end time.

### User Features
- **User Registration**: Sign up for an account with details like name, email, password, phone, address, and role (user/admin).
- **User Login**: Secure login for registered users.
- **Booking**: Select from available time slots to book a meeting room. The system calculates the total cost based on selected slots.

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB
- **ODM and Validation Library**: Mongoose

## Setup and Installation

### Prerequisites
- Node.js (version 14.x or higher)
- MongoDB (local or cloud instance)

### Installation Steps
1. **Clone the repository**
    ```bash
    git clone https://github.com/your-repo/meeting-room-booking.git
    cd meeting-room-booking
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Configure environment variables**
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. **Start the server**
    ```bash
    npm start
    ```
5. **Access the application in your localhost**
    Open your browser and navigate to `http://localhost:5000`


