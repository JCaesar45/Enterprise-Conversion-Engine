# Enterprise Conversion Engine

## Architecture Overview
This repository contains a polyglot microservices architecture designed for high-ticket digital sales funnels. The system prioritizes low-latency frontend rendering, real-time state synchronization, and secure financial transaction processing.

## Stack Specifications
- **Frontend:** HTML5, CSS3 (Grid/Flexbox), Vanilla ES6+ JavaScript.
- **Data Ingestion:** Python 3.10+, FastAPI, Pydantic.
- **Real-Time Sync:** Node.js 18+, TypeScript, Express, WebSocket (ws).
- **Transaction Processing:** Java 17, Spring Boot 3.0.

### Product Structure

```text
enterprise-conversion-engine/
├── frontend/
│   └── index.html          # Combined HTML5, CSS3, ES6+ JavaScript
├── backend-python/
│   └── lead_ingestion.py   # FastAPI asynchronous data processing
├── backend-ts/
│   └── realtime_sync.ts    # Express + WebSocket state management
├── backend-java/
│   └── TransactionAPI.java # Spring Boot secure payment controller
└── README.md               # Deployment and architecture documentation
```

## Deployment Instructions

### 1. Frontend
Serve `frontend/index.html` via any static file server (e.g., Nginx, Vercel, Netlify). No build step required.

### 2. Python Microservice
```bash
cd backend-python
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pydantic[email]
uvicorn lead_ingestion:app --host 0.0.0.0 --port 8000
```

### 3. TypeScript Microservice
```bash
cd backend-ts
npm install
npm run build
node dist/realtime_sync.js
```

### 4. Java Microservice
```bash
cd backend-java
mvn clean install
java -jar target/transaction-api-1.0.0.jar
```

## API Endpoints
- `POST /api/v1/leads` (Python) - Ingests and validates lead data.
- `WS /` (TypeScript) - Establishes persistent connection for dashboard state updates.
- `POST /api/v1/transactions/process` (Java) - Processes high-value financial transactions.
```
```
### References

Flanagan, D. (2020). *JavaScript: The definitive guide* (7th ed.). O'Reilly Media.

Krug, S. (2014). *Don't make me think, revisited: A common sense approach to web usability* (3rd ed.). New Riders.

Newman, S. (2015). *Building microservices: Designing fine-grained systems*. O'Reilly Media.

Nielsen, J. (1994). *Usability engineering*. Morgan Kaufmann.
