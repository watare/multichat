from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_KEY")
API_URL = os.getenv("UNDERSTANDTECH_API_URL", "https://api.understandtech.com/chat")

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

    try:
        headers = {"Authorization": f"Bearer {API_KEY}"} if API_KEY else {}
        response = requests.post(
            API_URL,
            json={"message": msg.content},
            headers=headers,
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()
        reply_text = data.get("response") or data.get("message") or ""
        bot_msg = Message(username="UnderstandTech", content=reply_text)
        messages.append(bot_msg)
        return {"status": "ok", "response": reply_text}
    except Exception as e:
        return {"status": "error", "error": str(e)}
