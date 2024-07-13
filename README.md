Ridesharing Backend
Overview
This repository contains the backend implementation for a ridesharing application built with Node.js, utilizing Prisma ORM for database operations with MongoDB, RabbitMQ for message queueing, and Firebase for real-time notifications.

Features
User Management: CRUD operations for managing users.
Ride Management: Create, update, delete rides. Assign drivers and manage ride statuses.
Notifications: Real-time notifications using Firebase Cloud Messaging (FCM).
Messaging: Inter-service communication with RabbitMQ.
Authentication: JWT-based authentication for securing APIs.
Technologies Used
Node.js: Backend JavaScript runtime environment.
Express.js: Web application framework for Node.js.
Prisma ORM: Database toolkit for TypeScript and Node.js.
MongoDB: NoSQL database for storing application data.
RabbitMQ: Message broker for handling asynchronous tasks and communication.
Firebase: Real-time database and notification service.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your_username/ridesharing-backend.git
cd ridesharing-backend
Install dependencies:

Copy code
npm install
Set up environment variables:
Create a .env file based on .env.example and provide necessary configurations for MongoDB connection, Firebase credentials, RabbitMQ URL, etc.

Run the application:

sql
Copy code
npm start
Access API documentation:
API documentation is available at http://localhost:3000/api-docs (assuming default port configuration).
