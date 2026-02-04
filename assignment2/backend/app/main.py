from fastapi import FastAPI

from .database import Base, engine
from .routers import users

# Create Database Tables on Startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Info Store")

app.include_router(users.router)


@app.get("/")
def read_root():
    return {"message": "System Operational"}
