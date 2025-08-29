# MERN Stack Todo App 

This is a full-stack to-do application built with the **MERN** (MongoDB, Express, React, Node.js) stack. It features secure user authentication and allows users to create, read, update, and delete their own to-do items. The application is deployed and hosted on Render.com.

## 🌟 Overview

The purpose of this project is to demonstrate a modern, full-stack web application with a clear separation between the frontend and backend. It showcases key concepts like user authentication, data management, and seamless deployment using a monorepo structure.

## 📦 Project Structure

The project is structured as a monorepo, with the frontend and backend code living in separate folders.

```
.
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## 🚀 Features

  * **User Authentication:** Secure user registration and login with JSON Web Tokens (JWT).
  * **CRUD Operations:** Create, Read, Update, and Delete functionality for to-do items.
  * **Data Ownership:** Each user can only view and manage their own list, ensuring data privacy.
  * **Responsive Design:** The application is built with React and styled using **Tailwind CSS** for a clean, mobile-first user interface.
  * **Secure Passwords:** User passwords are encrypted using `bcryptjs` before being stored in the database.

## 💻 Technologies

### Backend

  * **Node.js & Express.js:** For building the RESTful API.
  * **MongoDB & Mongoose:** For efficient database management.
  * **JSON Web Token (JWT):** For secure authentication.
  * **bcryptjs:** For password hashing.

### Frontend

  * **React:** For the dynamic and component-based user interface.
  * **Vite:** As the build tool for a fast development experience.
  * **Tailwind CSS:** For streamlined styling and design.
  * **Axios:** For making HTTP requests to the API.


## ☁️ Deployment

This application is deployed on Render.com with a continuous deployment pipeline.

  * **Live Application URL:** [https://mern-crud-hayk.onrender.com](https://mern-crud-hayk.onrender.com)
