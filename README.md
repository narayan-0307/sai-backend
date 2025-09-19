## SAI Software - Development and Build Guide

This repository contains:
- Backend: Express + MongoDB API in `backend/server`
- Frontend: Electron + React + TypeScript app in `frontend`

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance/connection string
- Windows for building Windows installer; macOS for DMG; Linux for AppImage (build targets generally require host OS)

---

## 1) Backend (API)
Location: `backend/server`

### Environment
Create `backend/server/.env` with:
```
MONGODB_URI=<your_mongodb_connection_string>
# Optional: override the dev fallback used in code
USER_SECRET=<a_long_random_secret>
```

### Install and Run
```
cd backend/server
npm install
npm run dev   # auto-reload with nodemon
# or
npm start     # plain node
```
The server listens on `http://localhost:4000` by default.

### Health Check
```
GET http://localhost:4000/api/hello
```

---

## 2) Frontend (Electron + React)
Location: `frontend`

### Environment
Create `frontend/.env` (or `.env.local`) with the API URL (defaults to localhost if omitted):
```
VITE_API_URL=http://localhost:4000
```

### Install
```
cd frontend
npm install
```

### Development
Runs Electron with Vite dev server:
```
npm run dev
```

### Type Checking & Linting
```
npm run typecheck
npm run lint
npm run format
```

### Build (bundle only)
Produces production bundles for Electron (but not installers):
```
npm run build
```
Artifacts land in `frontend/out`.

### Package Installers
- Windows (generate `.exe`/installer):
```
npm run build:win
```
- macOS (generate `.dmg`/`.pkg` as configured):
```
npm run build:mac
```
- Linux (generate `.AppImage`/`.deb` as configured):
```
npm run build:linux
```

Note: Packaging requires platform-specific toolchains. For example, build Windows installers on Windows, macOS installers on macOS, etc.

---

## 3) App Flow Notes
- Frontend reads `VITE_API_URL` and sends requests to `${VITE_API_URL}/api/...`.
- On login success, the token is stored in localStorage via Zustand store and attached in Axios `Authorization: Bearer <token>` header automatically.
- Backend validates JWT using `USER_SECRET`.

---

## 4) Troubleshooting
- Cannot login:
  - Verify backend is running and reachable: `http://localhost:4000/api/hello`.
  - Ensure user exists or sign up via `POST /api/auth/signup`.
  - Confirm `VITE_API_URL` matches the backend URL.
  - Ensure `USER_SECRET` is set (optional in dev due to fallback) and consistent across auth and middleware.
- MongoDB connection fails:
  - Check `MONGODB_URI` in `backend/server/.env`.
- Packaging errors:
  - Run `npm run build` first, then `build:win|mac|linux`.
  - Build on the target OS for best results.

---

## 5) Useful Scripts Reference
Backend (`backend/server/package.json`):
- `npm run dev` → nodemon dev server on port 4000
- `npm start` → production start

Frontend (`frontend/package.json`):
- `npm run dev` → Electron dev with Vite
- `npm run build` → Typecheck + build bundles
- `npm run build:win|mac|linux` → Build installers for OS
- `npm run lint` / `npm run format` / `npm run typecheck` → quality checks

---

## 6) Directory Structure
- `backend/server` → Express API, routes, controllers, models, middleware
- `frontend/src` → Electron app code (main, preload) and React renderer in `renderer/src`
- `frontend/resources` → static assets used for packaging

---

## 7) Deployment
- Host the backend on your server (ensure `MONGODB_URI` and `USER_SECRET` are set).
- Build and distribute platform-specific installers from `frontend`.
- Set `VITE_API_URL` to your server URL for production builds before packaging.
