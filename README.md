# MediApp 🏥

MediApp is a **full-stack doctor appointment booking platform** where patients can book appointments and doctors can manage their schedules and consultations.
It is built using **React, Node.js, Express, and MySQL** and demonstrates a complete authentication and appointment management workflow.

🌐 **Live Application:**
https://mediappfrontend.onrender.com

---

# ✨ Features

## 👤 Patient Features

* User registration and login
* Secure authentication using JWT
* Book doctor appointments
* View appointment history
* Cancel appointments
* Update profile information
* Change account password

## 👨‍⚕️ Doctor Features

* Doctor login
* View scheduled appointments
* Cancel appointments
* Mark appointments as completed
* Doctor dashboard statistics
* Change doctor password

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt (password hashing)

## Cloud Services

* Cloudinary (for image uploads)

---

# 📂 Project Structure

```
MediApp
│
├── backend
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers
│   │   ├── user.controller.js
│   │   └── doctor.controller.js
│   │
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.jsx
│   │
│   └── .env
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```
PORT=4000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mediapp
DB_PORT=3306

JWT_SECRET=your_secret_key

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
```

## Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:4000
```

---

# 💻 Installation & Setup

## 1️⃣ Clone the Repository

```
git clone https://github.com/Nasim-Khan-Milon/MediApp.git
cd MediApp
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

Backend server will run on:

```
http://localhost:4000
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend development server will run on:

```
http://localhost:5173
```

---

# 🗄️ Database Setup

Create the database in MySQL:

```
CREATE DATABASE mediapp;
```

Then import the required tables (`users`, `doctors`, `appointments`) before starting the backend server.

---

# 🔐 Authentication

MediApp uses **JWT authentication**:

* Users and doctors log in with credentials
* Server generates a JWT token
* Token is used to access protected API routes
* Token expiration: **7 days**

---

# 🚀 Deployment

Frontend is deployed on **Render**.

Live URL:

https://mediappfrontend.onrender.com

---

# 👨‍💻 Author

**Nasim Khan Milon**

Software Engineering Student
Shahjalal University of Science and Technology (SUST)

GitHub:
https://github.com/Nasim-Khan-Milon

---

# ⭐ Contributing

Contributions are welcome.
Feel free to fork this repository and submit pull requests.

---

# 📜 License

This project is open-source and available under the **MIT License**.
