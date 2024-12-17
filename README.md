
# Basic Uber Microservices - User Service

This project is a microservice-based **User Service** implemented using **Node.js** and **Express.js**, backed by a MongoDB database. It handles user authentication and profile management with secure JWT-based authentication and token blacklisting.

---

## **File Structure**

```plaintext
BASIC_UBER_MICROSERVICES/
│
├── config/
│   └── DB.js                # MongoDB connection file
│
├── controllers/
│   └── user.controller.js   # User-related functions: register, login, logout, profile
│
├── middleware/
│   └── auth.js              # Authentication middleware using JWT tokens
│
├── models/
│   ├── blacklistToken.model.js # Schema to blacklist logged-out JWT tokens
│   └── user.model.js        # User Schema: name, email, and password
│
├── routes/
│   └── user.routes.js       # Express routes for handling user actions
│
├── .env                     # Environment variables
├── index.js                 # Entry point connecting routes and middlewares
├── server.js                # HTTP Server configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation (this file)
```

---

## **Features**

- **User Registration**:
  - Hashes the password using `bcrypt`.
  - Generates and sends a JWT token.
- **User Login**:
  - Verifies the user credentials.
  - Generates JWT tokens upon success.
- **Logout**:
  - Blacklists the JWT token in `BlacklistToken` schema.
- **Profile Fetch**:
  - Authenticates JWT tokens and returns user details securely.
- **Authentication Middleware**:
  - Validates JWT tokens attached to headers or cookies.

---

## **Installation Steps**

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14+)
- MongoDB

### 1. Clone the repository
```bash
git clone <repository-url>
cd BASIC_UBER_MICROSERVICES
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory.

```plaintext
MONGO_URL=<your-mongodb-url>
JWT_SECRET=<your-secret-key>
```

### 4. Run the project
```bash
npm start
```
The server will start on `http://localhost:3001`.

---

## **Endpoints**

| METHOD   | ROUTE           | DESCRIPTION                 | AUTH |
| -------- | --------------- | --------------------------- | ---- |
| POST     | `/register`     | Register a new user         | No   |
| POST     | `/login`        | Log in an existing user     | No   |
| GET      | `/logout`       | Logout the user             | Yes  |
| GET      | `/profile`      | Get the user profile        | Yes  |

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Package Manager**: NPM

---

## **Dependencies**

The following npm packages are used in this project:
- `express`: Web framework for Node.js
- `mongoose`: ODM for MongoDB
- `bcrypt`: Password hashing utility
- `jsonwebtoken`: Token-based authentication
- `cookie-parser`: Middleware for handling cookies
- `dotenv`: Environment configuration
- `nodemon`: Development server monitor

---

## **Project Setup Explanation**

1. **DB.js**:
   - Connects the project to MongoDB using `MONGO_URL` from `.env`.

2. **user.controller.js**:
   - Functions:
     - `register`: Hashes the password and creates a user.
     - `login`: Verifies user credentials and provides JWT tokens.
     - `logout`: Blacklists the token.
     - `profile`: Fetches authenticated user data.

3. **auth.js (Middleware)**:
   - Ensures only valid JWT tokens access protected routes.

4. **Routes**:
   - Defined in `user.routes.js` and used in `index.js`.

5. **server.js**:
   - Creates and starts the HTTP server on `port 3001`.

---

## **Security Measures**

- Passwords are hashed before saving into the database (using `bcrypt`).
- JWT tokens are used for secure authentication.
- Blacklisted tokens are saved in `BlacklistToken` schema to prevent reuse.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Author**

[Divyanshu Pathak]

---
