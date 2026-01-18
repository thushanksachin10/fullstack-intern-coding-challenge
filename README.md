# fullstack-intern-coding-challenge
Store Rating Platform – Full Stack Intern Coding Challenge

A full-stack web application that allows users to submit ratings for registered stores, with role-based access for System Administrators, Normal Users, and Store Owners.

Built using React + Material UI, Express.js, Prisma ORM, and PostgreSQL, following industry best practices.

1) Tech Stack
a) Frontend:
    React (Vite)
    Material UI (MUI)
    Axios
    React Router DOM

b) Backend:
    Node.js
    Express.js
    Prisma ORM
    JWT Authentication
    bcrypt

c) Database:
    PostgreSQL

2) User Roles & Features
1️⃣ System Administrator

Add new users (Admin / Normal User)

Add new stores

View dashboard:

Total users

Total stores

Total ratings

View all users (filter & sort by name, email, address, role)

View all stores with average rating

Secure admin-only access

2️⃣ Normal User

Register & login

View all stores

Search stores by name & address

Submit ratings (1–5)

Update previously submitted ratings

View:

Overall store rating

Their own submitted rating

3️⃣ Store Owner

Login

View dashboard:

Average rating of their store

Users who rated their store

Secure access to only their own store data

✅ Form Validation Rules

Name: 20–60 characters

Address: Max 400 characters

Password:

8–16 characters

At least 1 uppercase letter

At least 1 special character

Email: Standard email validation

Rating: Integer between 1 and 5

📂 Project Structure
fullstack-intern-coding-challenge/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── README.md
│
└── README.md

⚙️ Backend Setup Instructions
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Configure environment variables

Create a .env file inside backend/:

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/storedb
JWT_SECRET=supersecretkey
PORT=5000

3️⃣ Run Prisma migrations
npx prisma migrate dev --name init

4️⃣ Seed database (Admin, Store Owner, Store)
npx prisma db seed


Seeded credentials:

Role	Email	Password
Admin	admin@system.com
	Admin@123
Store Owner	owner@store.com
	Owner@123
5️⃣ Start backend server
npm run dev


Health check:

GET http://localhost:5000/health

🎨 Frontend Setup Instructions
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Start frontend
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication Flow

JWT-based authentication

Token stored in localStorage

Role-based route protection

Backend enforces authorization at API level

📡 API Overview
Auth

POST /api/auth/register

POST /api/auth/login

Admin

GET /api/admin/dashboard

GET /api/admin/users

GET /api/admin/stores

Normal User

GET /api/user/stores

POST /api/ratings

Store Owner

GET /api/store-owner/dashboard

Design Decisions:

Prisma ORM used for:

Type safety

Schema-level validation

Preventing duplicate ratings

PostgreSQL chosen for:

Relational data integrity

Accurate aggregations (AVG, COUNT)

JWT for stateless authentication

Role middleware for strict access control

Future Improvements:

Pagination for large datasets

Admin UI for adding users & stores

Password reset feature

Deployment using Docker & cloud hosting

Author:
Thushank Sachin Bagal
Full-Stack Developer (Internship Candidate)