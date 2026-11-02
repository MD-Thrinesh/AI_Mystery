# AI Mystery Room

AI Mystery Room is a web app for creating and solving fictional mystery cases. A case contains a suspect board, evidence, a timeline, and an accusation step followed by a solution that explains how the clues connect.

## Requirements

- Node.js and npm
- MongoDB is optional for local demo mode
- A Google Gemini API key is optional for the current local demo

## Run locally

Install dependencies and start the API in one terminal:

```powershell
cd server
npm install
npm run dev
```

Start the frontend in a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open <http://localhost:5173/>. The Vite development server proxies `/api` requests to the API at `http://localhost:5000`.

## Server configuration

Create `server/.env` and add the settings you need. The API has defaults for the port, local MongoDB URI, Gemini model, and session secret. The current create route returns a sample case, so a Gemini key is not required to run the demo.

```dotenv
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/ai-mystery-room
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
SESSION_SECRET=replace-with-a-local-secret
```

Keep `.env` files private. The repository ignores the root `.env` and `server/.env` files.

## Project structure

- `client/` — React frontend built with Vite
- `server/` — Express API, mystery and session routes, and data models
- `spec.md` — product and technical specification

## Main user flow

1. Open **Create a Mystery** and enter a fictional scenario.
2. Review the suspects, evidence, and case timeline.
3. Select a suspect and submit an accusation.
4. Read the solution, including the motive, method, and how each evidence item supports the conclusion.

## API

The API is served under `/api/v1`. The root endpoint (`http://localhost:5000/`) reports that the API is running. The Vite proxy forwards frontend API calls to this server.

## Local demo data

The current mystery and investigation session stores are in memory. Restarting the API clears active cases and sessions, so create a new case after a restart. MongoDB connection settings are present for the project, but the current demo case flow does not persist its records there.

