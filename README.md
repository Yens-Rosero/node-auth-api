# My Store API

## Description
My Store API is a RESTful API built with Node.js and Express, designed to manage an online store. It provides endpoints for user authentication, product management, order processing, and category management. The API is built with a focus on security, performance, and scalability.

## Features
- User authentication with JWT
- Role-based access control
- CRUD operations for products, categories, and orders
- Email recovery for user passwords
- Integration with PostgreSQL database

## Technologies Used
- Node.js
- Express
- Sequelize (ORM for PostgreSQL)
- Passport.js (for authentication)
- Joi (for validation)
- Nodemailer (for sending emails)
- Docker (for containerization)

## Getting Started

### Prerequisites
- Node.js (v20.16.0 or higher)
- PostgreSQL (for local development)
- Docker (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-store.git
   cd my-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
   JWT_SECRET=your_jwt_secret
   JWT_SECRET_RECOVERY=your_jwt_recovery_secret
   EMAIL=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   FRONTEND_URL=http://localhost:8080
   ```

### Running the Application
1. Start the PostgreSQL database (if not using Docker):
   ```bash
   # Ensure PostgreSQL is running
   ```

2. Run the application:
   ```bash
   npm run dev
   ```

3. Access the API at `http://localhost:3000/api/v1`.

### Running with Docker
1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Access the API at `http://localhost:3000/api/v1`.

### API Documentation
Refer to the API documentation for detailed information on available endpoints and their usage.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Passport.js](http://www.passportjs.org/)
- [Joi](https://joi.dev/)
- [Nodemailer](https://nodemailer.com/)
