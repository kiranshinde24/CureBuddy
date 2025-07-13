**🩺 CureBuddy – Online Doctor Appointment System**
CureBuddy is a full-stack web application that connects patients with doctors and facilitates online appointments, profile management, and admin moderation.

**🌐 Live Website**
Frontend: https://cure-buddy.vercel.app

**🚀 Tech Stack**

**🔷 Frontend**

React + TypeScript

Tailwind CSS

Vite

React Router DOM

Axios

**🔶 Backend**
Node.js + Express

MongoDB (via MongoDB Atlas)

Mongoose ODM

JSON Web Tokens (JWT)

Multer (for file uploads)

**⚙️ Local Development Setup**

**1. Clone the Repository**

git clone https://github.com/your-username/CureBuddy.git

cd CureBuddy

**2. Backend Setup**

cd backend

npm install

Create a .env file inside the backend/ directory:

env

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Run the backend server:

npm start

Server will run at http://localhost:5000

**3. Frontend Setup**

cd ../frontend

npm install

Create a .env file in frontend/:

env

VITE_API_URL=https://curebuddy-1-zgdm.onrender.com

Run the frontend locally:

npm run dev

App will run at http://localhost:5173
