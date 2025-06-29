# User Management System

A full-stack user management application with a secure admin panel, built using React (frontend) and Node.js/Express with MongoDB (backend).

---

## Features

- **Admin Authentication:** Secure login for admin users (JWT-based).
- **User CRUD:** Create, read, update, and delete users from the admin panel.
- **Protected Routes:** Only authenticated admins can access dashboard and user management pages.
- **Responsive UI:** Built with React and React Router.
- **RESTful API:** Express.js backend with MongoDB for data storage.

---

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd Server
   npm install
   PORT=5001
MONGO_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword

npm run dev


