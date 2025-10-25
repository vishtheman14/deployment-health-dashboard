# Backend (FastAPI)

## Local run
```
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Endpoints:
- `GET /health`
- `GET /status`
