# CampusHub

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

CampusHub is a full-stack student portal built with React 18, Vite, Express, and MongoDB.

It is an open-source educational codebase designed for developers, students, and engineers worldwide to practice code forensics, full-stack debugging, and AI-assisted troubleshooting on a realistic application.

## Why This Repository Exists

Most programming tutorials only show happy-path code where everything works perfectly on the first try. Real-world engineering is different: most of your time is spent reading existing code, forming mental models, tracing unexpected behavior, and fixing subtle bugs.

CampusHub contains real, intentional bugs embedded directly into standard product features (not inside an artificial sandbox). These include:

- React hook lifecycle traps and stale closures
- Client-side session loss and storage trade-offs
- Optimistic UI state vs. backend database persistence
- Object mutation vs. replacement in state management
- Inconsistent sources of truth across pages
- Route-table drift in client-side routing
- Authorization vulnerabilities (Insecure Direct Object Reference)
- Asynchronous race conditions on action triggers


## How to Use This Repository (Fork and Learn)

This repository is designed for independent learners, coding bootcamps, university workshops, and pair-programming sessions.

**Please do not submit pull requests fixing the bugs to this repository.** The upstream repository intentionally keeps these bugs intact so that anyone who visits can start fresh.

### Recommended Workflow:
1. **Fork this repository** to your personal GitHub account.
2. Clone your fork locally or deploy it to Vercel.
3. Explore the portal using the demo accounts and observe what breaks.
4. Open the source code in your editor and conduct **code forensics**: trace the data flow from component state to API route to database schema.
5. Practice using **AI coding assistants** to analyze symptoms, review suspect code blocks, explain root causes, and draft clean fixes.
6. Commit and push your fixes to your own fork.



## Key Features

| Feature | Description |
|---|---|
| **Student Dashboard** | Central dashboard showing enrolled courses, quick statistics, upcoming events, and announcements. |
| **Campus Events** | Filterable list of campus hackathons, workshops, and seminars with status indicators. |
| **Assignments** | Course assignments list with deadlines, details preview, and status tracking. |
| **Personal Notes** | Note-taking interface with tag support, search, and deletion. |
| **Profile Management** | Student profile details with editable bio, skills, contact numbers, and student ID card. |
| **Authentication** | JWT-based authentication with protected frontend routes and password hashing via bcrypt. |



## Tech Stack

- **Frontend:** React 18, Vite, React Router v6, React Context API, Lucide Icons, Pure CSS Tokens
- **Backend:** Node.js (ES Modules), Express 4, Mongoose 8, JSON Web Tokens (JWT), bcryptjs, CORS
- **Database:** MongoDB / MongoDB Atlas
- **Monorepo & Deployment:** NPM Workspaces, Vercel Serverless Functions



## Project Structure

```text
CampusHub/
├── api/                    # Vercel serverless function entry point
│   └── index.js            # Exports Express app for serverless execution
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # HTTP client & token management
│   │   ├── components/     # Reusable UI components & layouts
│   │   ├── context/        # Auth and Toast notification providers
│   │   ├── pages/          # Dashboard, Events, Notes, Profile, Login
│   │   └── styles/         # Design token CSS styles
│   └── package.json
├── server/                 # Express backend API
│   ├── src/
│   │   ├── config/         # MongoDB connection with serverless connection pooling
│   │   ├── middleware/     # Authentication & error handling
│   │   ├── models/         # Mongoose schemas (User, Event, Assignment, Note)
│   │   ├── routes/         # REST API route handlers (/auth, /profile, etc.)
│   │   └── seed/           # Starter data population script
│   └── package.json
├── package.json            # Root monorepo workspace configuration
├── vercel.json             # Single-domain routing & build rules
└── README.md
```



## Quick Start (Local Development)

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- MongoDB instance (local `mongodb://127.0.0.1:27017/campushub` or a free MongoDB Atlas URI)

### 1. Clone Your Fork
```bash
git clone https://github.com/<your-username>/CampusHub.git
cd CampusHub
```

### 2. Install Dependencies
Install all workspace dependencies across both frontend and backend with one command:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the sample environment file:
```bash
cp server/.env.example server/.env
```

Open `server/.env` and configure your database URI and secrets:
```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/campushub
JWT_SECRET=your_development_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

### 4. Seed Starter Data
Populate the database with sample students, events, and assignments:
```bash
npm run seed
```

#### Demo Accounts

| Student ID / Username | Password | Student Name | Department |
|---|---|---|---|
| `CS1042` | `campus1042` | Alex Rivera | Computer Science (3rd Year) |
| `CS1087` | `campus1087` | Priya Nair | Information Science (2nd Year) |
| `CS1134` | `campus1134` | Jordan Blake | Computer Science (4th Year) |
| `CS1198` | `campus1198` | Sam Okafor | Electronics & Comm. (1st Year) |

### 5. Start Development Servers

Run the backend and frontend in separate terminals:

**Terminal 1 (Backend API):**
```bash
npm run dev:server
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
```

Open `http://localhost:5173` in your browser and sign in.



## Available Scripts

Run these scripts from the project root:

| Command | Description |
|---|---|
| `npm run dev:client` | Starts Vite local development server for the React UI |
| `npm run dev:server` | Starts Express server with hot-reload (`nodemon`) |
| `npm run build` | Compiles optimized React production bundle into `client/dist/` |
| `npm run seed` | Resets and populates the database with demo student data |



## Deployment to Vercel (Single URL)

CampusHub is pre-configured to deploy both the React frontend and Express backend under a single URL on Vercel:

1. Import your forked repository into [Vercel](https://vercel.com/new).
2. Leave **Root Directory** as `./` and **Framework Preset** as **Other** (or Vite).
3. Add your Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (ensure Atlas Network Access allows `0.0.0.0/0`).
   - `JWT_SECRET`: Any secure random secret string.
4. Click **Deploy**.

The frontend will be served at your root domain, and the API will be available at `/api/*` on the same domain without any CORS configuration required.



## Debugging and AI Forensics Prompts

As you investigate the application, try to diagnose the root cause of these common issues by reading the code:

1. **Authentication Session:** Sign in, verify the dashboard loads, and then refresh the browser tab. Why is the session lost? Where is the token stored?
2. **Profile Persistence:** Edit your phone number on the Profile page, save it, and refresh. Why did the success notification display while the database remained unchanged?
3. **Data Mutation:** Add a new skill to the student profile and save twice. Why does the list duplicate rather than append cleanly?
4. **Discrepant Counts:** Compare the event count shown on the Dashboard against the count on the Events page. Why do the numbers differ?
5. **Route Integrity:** Click "My Notes" from the sidebar navigation. Where does it lead, and why?
6. **Authorization Check:** Can a student access another student's assignment details simply by changing the ID in the URL?
7. **Race Conditions:** Rapidly click the "Add Note" button multiple times. Does the backend prevent duplicate submissions?



> Note: Browser DevTools (right-click Inspect and shortcut keys) is intentionally disabled in the client application for now. The goal is to practice code forensics in your editor, symptom observation, and AI-assisted diagnosis rather than relying on browser console outputs.



## License

This project is open source and available under the [MIT License](LICENSE).
