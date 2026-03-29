# Kisan Setu

Kisan Setu is a full-stack agricultural advisory platform built for farmers. It combines a React + Vite frontend with a Node.js + Express backend, and supports features like user authentication, weather updates, advisory responses, IoT sensor data, crop recommendations, pest detection, and curated agricultural content.

## Project overview

- `client/` — React frontend built with Vite.
- `server/` — Express backend API with MongoDB, authentication, validation, and AI/advisory services.

## Key features

- Farmer registration, login, and profile management.
- Personalized advisory responses based on user inputs.
- Weather forecast and district-based weather lookup.
- IoT device registration and sensor readings ingestion.
- Agricultural content, government schemes, and climate alerts.
- Crop recommendation and pest detection using embedded AI widgets.
- Remote sensing placeholder endpoints for future satellite/index integration.

## Architecture

- Frontend: React, React Router, Axios, Tailwind CSS, Redux Toolkit.
- Backend: Express, Mongoose, JWT authentication, Zod validation, CORS, Helmet.
- Database: MongoDB for user profiles, content, alerts, IoT devices, readings, and advisory logs.
- External services: OpenAI for advisory generation (optional), Open-Meteo for weather, Streamlit embeds for crop recommendation and pest detection.

## Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or Atlas)

### Install dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

### Configure backend environment

Copy the server example environment file and update values:

```bash
cd server
copy .env.example .env
```

Then edit `server/.env` with your configuration:

- `MONGODB_URI` — MongoDB connection string
- `PORT` — backend port (usually `4000`)
- `JWT_SECRET` — secret used for authentication tokens
- `CORS_ORIGIN` — allowed frontend origin, e.g. `http://localhost:5173`
- `OPENAI_API_KEY` — optional OpenAI key for AI advisory responses

### Seed demo data (optional)

```bash
cd server
npm run seed
```

### Start development servers

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open the app in your browser at `http://localhost:5173`.

## Frontend notes

- The `client/vite.config.js` file configures a development proxy for `/api` to forward requests to the backend.
- API calls from React should use the `/api/v1/...` path.
- In development, the frontend runs on Vite and the backend runs separately; the proxy allows both to work together.

## Backend notes

- API routes are mounted under `/api/v1/`.
- `server/src/app.js` configures middleware, CORS, request parsing, routes, and error handling.
- `server/src/index.js` connects to MongoDB and starts the server.
- Zod schemas in `server/src/validators/schemas.js` validate incoming requests.
- `server/src/services/` contains business logic for weather, advisory, recommendations, remote sensing, and alerts.

## Folder structure

- `client/`
  - `src/` — React source code
  - `src/Components/` — UI components for features like advisory, crop recommendation, pest detection, schemes, weather, and authentication
  - `src/configs/api.js` — Axios configuration for API calls
  - `src/pages/` — application pages and routable views

- `server/`
  - `src/config/` — configuration, DB connection, environment loading, district metadata
  - `src/controllers/` — route handler logic
  - `src/middleware/` — auth, validation, error handling
  - `src/models/` — Mongoose data models
  - `src/routes/` — Express route definitions
  - `src/services/` — core business/service functions
  - `src/utils/` — error and async helper utilities
  - `src/validators/` — request validation schemas

## Common commands

- `cd server && npm run dev` — start backend in watch mode
- `cd client && npm run dev` — start frontend development server
- `cd client && npm run build` — build the frontend for production
- `cd server && npm start` — run production-ready backend
- `cd server && npm run seed` — seed demo content and alerts

## Troubleshooting

- If the frontend cannot reach the backend, check `client/vite.config.js` proxy target and `server/.env` `CORS_ORIGIN`.
- If MongoDB connection fails, verify `MONGODB_URI` and database accessibility.
- If authentication fails, confirm `JWT_SECRET` is set and the token is being sent correctly.
- If Streamlit embeds do not render, verify the external widget URLs and browser iframe permissions.

## License

This repository does not include a license file. Add a `LICENSE` if you want to specify usage terms.
