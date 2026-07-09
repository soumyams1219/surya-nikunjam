# 🏡 Surya Nikunjam Community Website

A modern full-stack MERN application for **Surya Nikunjam Community**, featuring a public website and an admin dashboard for managing all website content.

---

## Features

### 🌐 Public Website

- Home Page
- Hero Slider
- Welcome Section
- Mission & Vision
- Why Choose Us
- Location Advantages
- Villas
- Amenities
- Lifestyle
- Gallery
- Events
- Testimonials
- FAQ
- Contact Page
- Book Site Visit
- Responsive Design

---

### 🔐 Admin Panel

Admin can manage:

- Hero Slider
- About Content
- Welcome Content
- Mission & Vision
- Why Choose
- Location Advantages
- Villas
- Amenities
- Lifestyle
- Gallery
- Events
- Testimonials
- FAQ
- Contact Information
- Site Visit Bookings

---

## 🛠 Tech Stack

### Frontend

- React.js
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Lucide React Icons
- SweetAlert2

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Bcrypt

---

## 📁 Project Structure


Surya-Nikunjam/
│
├── backend/
│   ├── src/
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore


---

# ⚙ Installation

## 1 Clone Repository


git clone https://github.com/yourusername/Surya-Nikunjam.git



cd Surya-Nikunjam


---

## 2 Backend Setup


cd backend


Install dependencies


npm install


Create `.env`


PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

SETUP_SECRET=your_setup_secret


Run backend


npm run dev


---

## 3 Frontend Setup


cd ../frontend


Install dependencies


npm install


Create `.env`


VITE_API_URL=http://localhost:5000/api

VITE_IMG_URL=http://localhost:5000


Run frontend


npm run dev


---

# Admin Setup

The project includes a secure **one-time Admin Setup API**.

After deployment, create the first admin using Postman.


POST

/api/admin/create-admin


Headers


x-setup-secret: YOUR_SETUP_SECRET


Body


{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123"
}


After the first admin is created, the endpoint automatically becomes unavailable.

---

# Admin Login


/admin/login


Use the created admin credentials.

---

# 📸 Image Upload

Images are uploaded through the Admin Panel and stored inside:


backend/uploads/


---



