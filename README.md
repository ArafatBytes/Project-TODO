# Project-TODO

## Overview
**Project-TODO** is a full-stack web application built with **Express.js** and **MongoDB**, allowing users to manage their tasks efficiently. The application includes features like user registration, login authentication, and persistent task storage.

---

## Features
- **User Authentication**: Secure signup and login process using hashed passwords.
- **Task Management**: Users can add, edit, delete, and view their TODOs.
- **Database Integration**: Persistent data storage with MongoDB.
- **Secure API**: Protects routes using JWT for authentication.

---

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token) for secure user sessions
- **Libraries**: 
  - `bcrypt`: For password hashing.
  - `dotenv`: To manage environment variables.
  - `cors` & `helmet`: For API security.
  - `express-validator`: To validate user inputs.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/ArafatBytes/Project-TODO.git
   cd Project-TODO
2. Install dependencies:
   ```bash
   npm install node modules
   npm install nodemon
   npm install express
   npm install bcrypto
   npm install jsonwebtoken
   npm install dotenv
   npm install mongoose
3. Set up environment variables:
   - create a .env file in the root directory
   - add the following variable
   ```bash
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
4. Run the development server:
   ```bash
   npm start

---

## API Endpoints

**Auth Routes**
- **POST /signup**:Register a new user.
- **POST /login**:Authenticate user and return a token.

**TODO Routes (Protected with JWT)**
- **GET /todo**:Get all tasks for the user.
- **POST /todo**:Create a new task.
- **PUT /todo/:id**:Update a task.
- **DELETE /todo/:id**:Delete a task.

---

## Conclusion

One of the very interesting wokrs I've ever done with backend is this project. Looking forward to update it more in future. Hope you'll enjoy using my application. PEACE!



