# NBA Stats Library

NBA Stats Library is a lightweight React (Vite) frontend paired with an Express backend that surfaces NBA player and game information through simple, cache-friendly API endpoints. It supports browsing active players, viewing box scores and player game stats, viewing up to date standings, the ability to compare players, and saving favorites (client-side cookies). Data is sourced from public NBA endpoints (https://github.com/swar/nba_api/tree/master); additional information about the project can be found in the about tab. 

## Website
The demo of the react frontend is hosted on Render and can be found at this [link][https://nba-stats-library-o2e9.onrender.com/]. The website lacks functionality due to the lack of backend. The backend unfortunately could not be hosted because the NBA API blocks requests from cloud hosting services such as AWS (which render and a bunch of other services uses). More information about the issue is found [here][https://github.com/bttmly/nba/issues/41] and [here][https://github.com/seemethere/nba_py/issues/88].

## Prerequisites
- Node.js 18+ (recommended)
- npm
- Git

## Quick overview
- Frontend: Vite React app in `src/`
- Backend: Express server `server.js` (API endpoints used by the frontend)

# How to run

## Install
From project root:
```bash
npm ci
```

## Environment (local)
Create a `.env` in the repo root (do NOT commit):
```env
# filepath: .env (example)
VITE_API_URL=http://localhost:4000
```

## Run locally
1. Start backend (terminal 1)
```bash
# start Express backend
node server.js
# open http://localhost:4000
# or if package.json provides a start script:
# npm start
```

2. Start frontend (terminal 2)
```bash
npm run dev
# open http://localhost:5173
```

3. Go to http://localhost:5173 and enjoy the website!

## Helpful git settings
Add to `.gitignore`:
```
node_modules/
dist/
.env
.env.local
```

