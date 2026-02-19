from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import users

# Create Database Tables on Startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Info Store")

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4321",  # Astro dev server default
        "http://localhost:3000",  # Alternative dev port
        "http://127.0.0.1:4321",
        "http://127.0.0.1:3000",
        # "http://localhost:5173",  # Vite default
        # "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)


@app.get("/")
def read_root():
    return {"message": "System Operational"}
