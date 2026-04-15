from google import genai
from google.genai import types

from config import GEMINI_API_KEY, SYSTEM_PROMPT


class ChatSession:
    def __init__(self) -> None:
        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model = "gemini-2.5-flash"
        self.contents: list[types.Content] = []

    def send(self, message: str) -> str:
        self.contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=message)],
            )
        )
        response = self.client.models.generate_content(
            model=self.model,
            contents=self.contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
            ),
        )
        reply = response.text or "I'm sorry, I couldn't generate a response."
        self.contents.append(
            types.Content(
                role="model",
                parts=[types.Part.from_text(text=reply)],
            )
        )
        return reply
