# Event Management System (SDN302 Practical Exam)

## Overview

This is an Event Management System for FPT University Da Nang. It allows organizers (admins) to manage events and registrations, and students to search for and register for events. The system supports authentication, role-based access control, and real-time notifications (API response).

## Features

- **User Authentication & Authorization**

  - Session-based authentication for web interface
  - Role-based access control (admin, student)

- **Student Features**

  - Browse available events
  - Register for events (with capacity validation)
  - View and cancel their registrations

- **Admin Features**

  - View all event registrations with pagination
  - Search registrations by date range

- **MVC Architecture**
  - Models: User, Event, Registration
  - Controllers: Auth, Event, Registration, User
  - Views: EJS templates with responsive design
  - Routes: Organized by functionality

## Project Structure

```
Hoang_Event-TuLam/
├── app.js                          # Main application file
├── package.json                    # Dependencies and scripts
├── README.md                       # This file
├── config/
│   └── jwtConfig.js               # JWT configuration
├── controllers/
│   ├── authController.js          # Authentication logic
│   ├── eventController.js         # Event management
│   ├── registrationController.js  # Registration display logic
│   └── userController.js          # User operations
├── middlewares/
│   ├── authMiddleware.js          # JWT authentication
│   ├── roleMiddleware.js          # Role-based access control
│   ├── sessionAuthMiddleware.js   # Session authentication
│   └── sessionMiddleware.js       # Session handling
├── models/
│   ├── eventModel.js              # Event schema and model
│   ├── registrationModel.js       # Registration schema and model
│   └── userModel.js               # User schema and model
├── public/
│   └── css/
│       └── style.css              # Custom styles
├── routes/
│   ├── authRoutes.js              # Authentication routes
│   ├── eventRoutes.js             # Event routes
│   ├── registrationRoutes.js      # Registration routes
│   └── userRouter.js              # API routes
└── views/
    ├── cancelRegistration.ejs     # Cancel registration page
    ├── layout.ejs                 # Base layout template
    ├── listRegistrations.ejs      # List all registrations
    ├── login.ejs                  # Login page
    ├── registerEvent.ejs          # Event registration page
    └── searchRegistrations.ejs    # Search registrations page
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

### Installation

1. **Clone or download the project**

   ```bash
   cd Hoang_Event-TuLam
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start MongoDB**

   - Make sure MongoDB is running on the default port (27017)
   - The application will automatically create the database `EventPETest1206`

4. **Run the application**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`

## Usage

### Web Interface

1. **Access the application**

   - Open your browser and go to `http://localhost:3000`
   - You'll be redirected to the login page

2. **Login**

   - Use your username and password
   - You'll be redirected to the appropriate page based on your role

3. **Student Features**

   - **Register for Events**: Browse and register for available events
   - **Cancel Registrations**: View and cancel your registrations

4. **Admin Features**
   - **View All Registrations**: Paginated list of all registrations
   - **Search Registrations**: Search by date range

### API Endpoints

#### Authentication

- `GET /login` - Show login page
- `POST /login` - Handle login form
- `GET /logout` - Logout

#### Events

- `GET /events` - Get all events (web interface)
- `GET /events/:id` - Get event details
- `POST /events` - Create new event (admin only)

#### Registrations

- `GET /register-event` - Show event registration page (student)
- `GET /cancel-registration` - Show cancel registration page (student)
- `GET /list-registrations` - Show all registrations (admin)
- `GET /search-registrations` - Search registrations by date (admin)

#### API Routes

- `POST /api/registration` - Register for an event
- `DELETE /api/registrations/:id` - Cancel registration
- `GET /api/listRegistrations` - Get paginated registrations
- `GET /api/getRegistrationsByDate` - Search by date range

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **Session Management**: Secure session handling for web interface
- **Role-Based Access Control**: Different permissions for admin and student roles
- **Input Validation**: Server-side validation for all inputs

## Responsive Design

The web interface is built with Bootstrap 5 and includes:

- **Mobile-friendly**: Responsive design for all screen sizes
- **Modern UI**: Clean and intuitive user interface
- **Cross-browser**: Compatible with modern browsers

## License

This project is created for educational purposes as part of the SDN302 course at FPT University Da Nang.
