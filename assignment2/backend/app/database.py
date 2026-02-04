import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# load env
load_dotenv()

# data folder
os.makedirs("data", exist_ok=True)

# database url
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

# database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# database session, create new db session for every new request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# database model base class
Base = declarative_base()


# external dependency injection to get new db session for every new request
def get_db():
    """
    Dependency injection to get new db session for every new request.

    Returns:
        SessionLocal: A new database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
