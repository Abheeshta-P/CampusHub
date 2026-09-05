# CampusHub — Student Portal

CampusHub is a full-stack student portal that provides students with a unified dashboard to manage events, assignments, personal notes, and profile records.

## Architecture

- **Frontend:** React 18, Vite, React Router, Context API
- **Backend:** Node.js, Express REST API
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)

```
Browser (React + Vite) ──HTTP / JSON──► Express API (Node.js) ──► MongoDB
```

## Project Structure

```
CampusHub/
├── client/          # React frontend (Vite)
├── server/          # Express API & MongoDB models
└── README.md
```

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** A local MongoDB instance (`mongodb://127.0.0.1:27017/campushub`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.

## Getting Started

### 1. Install Dependencies

Install dependencies for both the server and client:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`):**
```bash
cd server
cp .env.example .env
```

Open `server/.env` and verify the values:
- `PORT=5050`
- `MONGODB_URI=mongodb://127.0.0.1:27017/campushub` (or your MongoDB Atlas connection string)
- `JWT_SECRET=your_secret_key_here`
- `CLIENT_ORIGIN=http://localhost:5173`

**Frontend (`client/.env`):**
```bash
cd client
cp .env.example .env
```
Open `client/.env` and verify:
- `VITE_API_URL=http://localhost:5050/api`

### 3. Seed the Database (Only if Required)

Run the seed script only if your database is empty or if you need to populate/reset sample data for demonstration and testing:

```bash
cd server
npm run seed
```

> **Note:** The seed script is used for demonstration and testing. It populates the database with initial sample student profiles, campus events, and assignments. You only need to run it on a fresh database setup or whenever you want to reset everything back to the initial demo state.

#### Sample Student Accounts


| Username | Password | Student Name | Department | Year |
|---|---|---|---|---|
| `CS1042` | `campus1042` | Alex Rivera | Computer Science | 3rd Year |
| `CS1087` | `campus1087` | Priya Nair | Information Science | 2nd Year |
| `CS1134` | `campus1134` | Jordan Blake | Computer Science | 4th Year |
| `CS1198` | `campus1198` | Sam Okafor | Electronics & Communication | 1st Year |

### 4. Run the Application

Start the backend and frontend development servers in two separate terminal windows:

**Terminal 1 — Start Backend Server:**
```bash
cd server
npm run dev
```
*The API server will start on http://localhost:5050.*

**Terminal 2 — Start Frontend Client:**
```bash
cd client
npm run dev
```
*The Vite development server will start on http://localhost:5173.*

Open **http://localhost:5173** in your browser and sign in using any of the sample student accounts above.

## Available Scripts

| Location | Command | Description |
|---|---|---|
| `server/` | `npm run dev` | Starts Express server with auto-reload (`nodemon`) |
| `server/` | `npm start` | Starts Express server in production mode |
| `server/` | `npm run seed` | Seeds database with initial sample student data |
| `client/` | `npm run dev` | Starts Vite local development server |
| `client/` | `npm run build` | Builds optimized production assets to `client/dist/` |
| `client/` | `npm run preview` | Previews production build locally |

## Production Deployment

- **Frontend:** Deploy the `client/` folder to Vercel, Netlify, or AWS Amplify. Set `VITE_API_URL` to your live API backend URL.
- **Backend:** Deploy the `server/` folder to Render, Railway, or Heroku. Configure the environment variables from `server/.env`.
- **Database:** Connect your hosted backend to a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster by providing the `MONGODB_URI` connection string.

