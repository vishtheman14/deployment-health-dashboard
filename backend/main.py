from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="Deployment Health API")

@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat() + "Z"}

@app.get("/status")
def status():
    return [
        {"service": "payments-api", "status": "healthy", "version": "v1.2.3", "last_deploy": "2025-10-20"},
        {"service": "auth-api", "status": "healthy", "version": "v1.0.9", "last_deploy": "2025-10-18"},
    ]
