import uuid

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from chat import ChatSession
from config import (
    COLLEGE_NAME,
    CREATOR_EMAIL,
    CREATOR_FIRST_NAME,
    CREATOR_LAST_NAME,
    CURATED_QUESTIONS,
)

app = FastAPI(title="College Inquiry Chatbot")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

sessions: dict[str, dict] = {}


class StartRequest(BaseModel):
    first_name: str
    last_name: str
    email: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


@app.get("/", response_class=HTMLResponse)
async def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        request,
        "index.html",
        {
            "college_name": COLLEGE_NAME,
            "questions": CURATED_QUESTIONS,
        },
    )


@app.post("/api/start")
async def start_session(body: StartRequest) -> dict[str, str]:
    session_id = str(uuid.uuid4())
    chat = ChatSession()
    sessions[session_id] = {
        "chat": chat,
        "first_name": body.first_name,
        "last_name": body.last_name,
        "email": body.email,
    }
    return {"session_id": session_id}


@app.post("/api/chat")
async def chat(body: ChatRequest) -> dict[str, str]:
    session = sessions.get(body.session_id)
    if not session:
        return {"error": "Session not found. Please start a new session."}
    reply = session["chat"].send(body.message)
    return {"response": reply}


@app.post("/api/conclusion/{session_id}")
async def conclusion(session_id: str) -> dict[str, str]:
    session = sessions.pop(session_id, None)
    if not session:
        return {"error": "Session not found."}
    summary = (
        f"Thank you, {session['first_name']} {session['last_name']} "
        f"({session['email']}), for using the {COLLEGE_NAME} chatbot!\n\n"
        f"Chatbot created by {CREATOR_FIRST_NAME} {CREATOR_LAST_NAME} "
        f"({CREATOR_EMAIL})."
    )
    chat = session["chat"]
    farewell = chat.send("Provide a brief farewell message to the student.")
    return {"summary": summary, "farewell": farewell}
