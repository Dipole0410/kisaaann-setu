# Kisan Setu — Backend (Node.js + Express)

API for an AI-assisted agricultural advisory platform: farmer accounts, personalized advice, weather, IoT readings, information bulletins, and extension points for remote sensing and ML.

---

## Project root (server folder)

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts (`dev`, `start`, `seed`), and `"type": "module"` for ES modules. |
| `package-lock.json` | Locked dependency tree for reproducible installs. |
| `.env` | **Local secrets** (not committed): MongoDB URI, JWT secret, optional OpenAI key, CORS origin, port. Create from `.env.example`. |
| `.env.example` | Template listing every environment variable the server reads. |
| `.gitignore` | Ignores `node_modules/`, `.env`, and logs. |

---

## Entry and application shell

| File | Purpose |
|------|---------|
| `src/index.js` | Process entry: connects to MongoDB, starts the HTTP server on the configured port, exits on fatal errors. |
| `src/app.js` | Express application: security headers (`helmet`), CORS, JSON body parser, request logging (`morgan`), mounts `/api/v1` routes, 404 handler, global error handler. |

---

## Configuration (`src/config/`)

| File | Purpose |
|------|---------|
| `env.js` | Loads `dotenv`, exposes a single `env` object (port, `MONGODB_URI`, JWT settings, `CORS_ORIGIN`, `OPENAI_API_KEY`). In production, enforces required variables. |
| `db.js` | `connectDb()`: opens the Mongoose connection with a server selection timeout so missing MongoDB fails quickly. |
| `upDistricts.js` | **District → lat/lng** map for Uttar Pradesh–focused defaults (e.g. Siddharthnagar, Balrampur). Used when the client sends a district name instead of coordinates (weather, profile auto-location). |

---

## Data models (`src/models/`)

Mongoose schemas and models for persistence.

| File | Purpose |
|------|---------|
| `User.js` | Farmer/admin accounts: email, password hash, name, phone, role. `toJSON` strips the password hash from API responses. |
| `FarmerProfile.js` | One profile per user: state, district, village, land size/category, crops, soil, irrigation, language, optional GPS. |
| `AdvisoryLog.js` | Stores each advisory Q&A: question, optional context (crop, season, district), response text, source (`openai` or `rules`). |
| `SensorDevice.js` | IoT device registry: unique `deviceId`, owning user, plot name, optional location, active flag. |
| `SensorReading.js` | Time-series readings: temperature, humidity, soil moisture, pH, rainfall, battery, optional raw payload. |
| `AgriContent.js` | Curated content: schemes, tips, bulletins, market notes; optional `regionTags` and validity window. |
| `ClimateAlert.js` | District-scoped alerts with severity and optional `validUntil`. |

---

## Middleware (`src/middleware/`)

| File | Purpose |
|------|---------|
| `auth.js` | `requireAuth`: reads `Authorization: Bearer <JWT>`, verifies token, sets `req.userId` / `req.userRole`. `attachUser` loads the full `User` document. `requireAdmin` for future admin-only routes. |
| `validate.js` | `validateBody` / `validateQuery`: run Zod schemas and return 400 with flattened errors on failure; replace `req.body` / `req.query` with parsed values. |
| `errorHandler.js` | Central error middleware: HTTP status from `HttpError` or 500; includes stack in development. `notFoundHandler` for unknown paths. |

---

## Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `HttpError.js` | Small error class carrying `status` and optional `details` for consistent API errors. |
| `asyncHandler.js` | Wraps async route handlers so rejected promises reach `errorHandler` without manual `try/catch`. |

---

## Validation (`src/validators/`)

| File | Purpose |
|------|---------|
| `schemas.js` | Zod schemas for register/login, profile updates, advisory questions, weather query (district **or** lat+lng), IoT payloads, content/alerts listing, remote-sensing coordinates, recommendation query params. |

---

## Services (`src/services/`)

Business logic and external integrations. **This is where most “placeholder → real API” work happens.**

| File | Purpose |
|------|---------|
| `weatherService.js` | Fetches **live** weather from [Open-Meteo](https://open-meteo.com/) (`api.open-meteo.com`): current conditions and a short daily forecast. No API key required. |
| `advisoryService.js` | If `OPENAI_API_KEY` is set, calls OpenAI (`gpt-4o-mini`) with a Kisan Setu system prompt; otherwise returns **rule-based** Hindi/English guidance from keywords and context. |
| `remoteSensingService.js` | **Placeholder**: deterministic fake NDVI/NDMI-style indices from coordinates. Intended to be replaced by Earth Engine, Sentinel Hub, Bhuvan, etc. |
| `recommendationService.js` | **Placeholder / heuristic**: simple soil-type → suggested crop lists and generic resilience tips. Intended to be replaced or backed by a trained model or external agronomy API. |

---

## Controllers (`src/controllers/`)

Thin layer: read `req`, call services/models, send `res.json` / status codes.

| File | Purpose |
|------|---------|
| `authController.js` | Register (hash password, create user + empty profile), login (issue JWT), `me` (current user JSON). |
| `farmerController.js` | `GET/PUT /farmers/me`: load or update `FarmerProfile`; can fill `location` from district using `upDistricts.js`. |
| `advisoryController.js` | Runs `generateAdvisory`, persists `AdvisoryLog`, returns response; lists recent history for the authenticated user. |
| `weatherController.js` | Resolves district to coordinates or uses lat/lng, calls `fetchWeatherSnapshot`. |
| `iotController.js` | Register/update devices, ingest readings, list devices and readings (scoped to the logged-in user). |
| `contentController.js` | Lists `AgriContent` filtered by type, district tags, and date validity. |
| `alertController.js` | Lists active `ClimateAlert` rows for a district. |
| `remoteSensingController.js` | Exposes `stubVegetationIndices` as JSON. |
| `recommendationController.js` | Exposes `soilCropRecommendations` as JSON. |

---

## Routes (`src/routes/`)

| File | Purpose |
|------|---------|
| `index.js` | Mounts all routers under `/api/v1` and exposes `GET /api/v1/health`. |
| `auth.routes.js` | `/auth/register`, `/auth/login`, `/auth/me`. |
| `farmers.routes.js` | `/farmers/me` (protected). |
| `advisory.routes.js` | `/advisory/query`, `/advisory/history` (protected). |
| `weather.routes.js` | `/weather/current` (public). |
| `iot.routes.js` | `/iot/devices`, `/iot/devices/:deviceId/readings` (protected). |
| `content.routes.js` | `/content` (public). |
| `alerts.routes.js` | `/alerts` (public). |
| `remoteSensing.routes.js` | `/remote-sensing/indices` (public). |
| `recommendations.routes.js` | `/recommendations/soil-crop` (public). |

---

## Scripts (`src/scripts/`)

| File | Purpose |
|------|---------|
| `seed.js` | One-time-style seed: if collections are empty, inserts sample `AgriContent` and `ClimateAlert` documents for demos. Run with `npm run seed`. |

---

## Where to change links and URLs (summary)

| Location | What to change |
|----------|----------------|
| **`client/vite.config.js`** | `server.proxy['/api'].target` |
| **`server/.env`** | `CORS_ORIGIN`, `MONGODB_URI`, `PORT`, `OPENAI_API_KEY`, `JWT_SECRET` |
| **`server/src/services/weatherService.js`** | Weather API base URL and query parameters |
| **`server/src/services/advisoryService.js`** | LLM provider, model name, API usage |
| **`server/src/services/remoteSensingService.js`** | Satellite / vegetation-index provider URLs |
| **`server/src/config/upDistricts.js`** | District names and centroid coordinates (not HTTP links, but affects location defaults) |
| **Frontend (when you add `fetch`)** | Use `/api/v1/...` in dev (proxy), or full `https://your-api-domain/...` in production |

The sections below explain **each of these in detailed steps**.

---

