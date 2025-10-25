# Deployment Health Dashboard (Mini Project)

A compact, resume-friendly full-stack sample to practice Implementation Engineer skills: Python API + React TS UI + Azure + GitHub Actions.

## Folder Structure
```
deployment-health-dashboard/
  backend/
  frontend/
  .github/workflows/
    backend-deploy.yml
    frontend-deploy.yml
```

## Quickstart

### 1) Backend locally
```
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Test: http://localhost:8000/status

### 2) Frontend locally
```
cd ../frontend
npm install
npm run dev
```
Open the printed URL (typically http://localhost:5173).

Create a `.env` file in `frontend` if needed:
```
VITE_API_BASE=http://localhost:8000
```

### 3) Azure (one-time)
- Create an **Azure Web App** for the backend and get its **Publish Profile** (save as GitHub secret `AZURE_WEBAPP_PUBLISH_PROFILE`).
- Create an **Azure Static Web App** for the frontend and get its **deployment token** (save as GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`).

### 4) GitHub Actions
- Push this repo to GitHub (default branch `main`).
- Edit `.github/workflows/backend-deploy.yml` and set `AZURE_WEBAPP_NAME` to your web app name.
- Commit & push. Workflows will build and deploy both apps on push.

### 5) Production env
- Set `VITE_API_BASE` in Static Web Apps configuration if your API is at a different URL than local.
- Optionally add Azure Application Insights to your Web App for basic telemetry.

## Notes
- This is intentionally minimal. Extend with auth, more endpoints, or real metrics later.
- Use this as a live demo in interviews to show end-to-end implementation and release skills.
