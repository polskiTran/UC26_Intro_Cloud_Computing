import json
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

CREATOR_FIRST_NAME: str = "Tiep"
CREATOR_LAST_NAME: str = "Tran"
CREATOR_EMAIL: str = "TiepTran@mail.uc.edu"

_knowledge_path = Path(__file__).parent / "knowledge.json"
with open(_knowledge_path) as _f:
    KNOWLEDGE: dict = json.load(_f)

COLLEGE_NAME: str = KNOWLEDGE["institution"]

CURATED_QUESTIONS: list[str] = [
    "Does the college have a football team?",
    "Does it offer a Computer Science major?",
    "What is the in-state tuition?",
    "Does it provide on-campus housing?",
]

SYSTEM_PROMPT: str = (
    f"You are a helpful college inquiry chatbot for {COLLEGE_NAME}. "
    "Answer student questions clearly and concisely using the following "
    "institutional data as your source of truth:\n\n"
    f"{json.dumps(KNOWLEDGE, indent=2)}\n\n"
    "If asked about something not in the data, say you don't have that or point to the most relevant data source link."
    "Keep responses under 3 sentences unless more detail is specifically requested."
    "End the response with a 'Find more at' link unless more detail is specifically requested."
)
