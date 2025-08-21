from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

messages = []

class Message(BaseModel):
    username: str
    content: str

@app.get("/api/messages", response_model=List[Message])
def get_messages():
    return messages

@app.post("/api/messages")
def post_message(msg: Message):
    messages.append(msg)
    return {"status": "ok"}
