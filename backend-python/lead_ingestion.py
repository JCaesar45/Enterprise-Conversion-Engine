from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
import asyncio

app = FastAPI(title="Lead Ingestion Microservice", version="1.0.0")

class LeadPayload(BaseModel):
    email: EmailStr
    timestamp: int
    tier: str
    metadata: Optional[dict] = None

class LeadProcessor:
    def __init__(self):
        self.db_mock = []

    async def validate_and_store(self, lead: LeadPayload):
        await asyncio.sleep(0.1) # Simulate DB I/O
        if lead.tier not in ["enterprise", "mid-market"]:
            raise HTTPException(status_code=400, detail="Invalid tier classification")
        
        record = {
            "id": len(self.db_mock) + 1,
            "email": lead.email,
            "captured_at": datetime.fromtimestamp(lead.timestamp / 1000).isoformat(),
            "status": "qualified"
        }
        self.db_mock.append(record)
        return record

processor = LeadProcessor()

@app.post("/api/v1/leads", status_code=201)
async def ingest_lead(lead: LeadPayload, proc: LeadProcessor = Depends(lambda: processor)):
    return await proc.validate_and_store(lead)
