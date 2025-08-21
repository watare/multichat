from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from src.core.llm_interface import UnderstandTechLLM

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

# Endpoint pour tester le connecteur IA
class ChatRequest(BaseModel):
    prompt: str
    model: str = "gpt-4"
    temperature: float = 0.7

@app.post("/api/llm_chat")
def llm_chat(req: ChatRequest):
    llm = UnderstandTechLLM()
    result = llm.chat(req.prompt, model=req.model, temperature=req.temperature)
    return result

# Endpoint de debug pour tester la clé et la réponse IA
@app.get("/api/llm_test")
def llm_test():
    key = os.getenv("UNDERSTAND_API_KEY")
    llm = UnderstandTechLLM()
    try:
        result = llm.chat("Bonjour, qui es-tu ?")
    except Exception as e:
        return {"error": str(e), "key": key}
    return {"result": result, "key": key}
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from src.core.llm_interface import UnderstandTechLLM

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

# Endpoint pour tester le connecteur IA
class ChatRequest(BaseModel):
    prompt: str
    model: str = "gpt-4"
    temperature: float = 0.7

@app.post("/api/llm_chat")
def llm_chat(req: ChatRequest):
    llm = UnderstandTechLLM()
    result = llm.chat(req.prompt, model=req.model, temperature=req.temperature)
    return result
