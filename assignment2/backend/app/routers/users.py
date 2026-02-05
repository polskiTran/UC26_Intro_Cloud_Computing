import os
import re
import shutil
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/users", tags=["users"])
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# --- Create ---
@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.

    Args:
        user (schemas.UserCreate): The user data to create.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The created user.
    """
    if crud.get_user_by_email(db, email=user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if crud.get_user_by_username(db, username=user.username):
        raise HTTPException(status_code=400, detail="Username taken")
    return crud.create_user(db=db, user=user)


# --- Login ---
@router.post("/login", response_model=schemas.UserResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user.

    Args:
        credentials (schemas.UserLogin): The user credentials.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The authenticated user.
    """
    user = crud.authenticate_user(db, credentials.username, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user


# --- Update Info (PATCH) ---
@router.patch("/{username}", response_model=schemas.UserResponse)
def update_user_info(
    username: str, updates: schemas.UserUpdate, db: Session = Depends(get_db)
):
    """
    Update a user's information.

    Args:
        username (str): The username of the user to update.
        updates (schemas.UserUpdate): The updated user information.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The updated user.
    """
    db_user = crud.get_user_by_username(db, username)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return crud.update_user(db, db_user, updates)


# --- Delete User ---
@router.delete("/{username}")
def delete_user(username: str, db: Session = Depends(get_db)):
    """
    Delete a user and their data.

    Args:
        username (str): The username of the user to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the success of the operation.
    """
    success = crud.delete_user(db, username)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"User {username} and their data deleted successfully"}


# --- Upload File ---
@router.post("/{username}/file", response_model=schemas.UserResponse)
def upload_file(
    username: str, file: UploadFile = File(...), db: Session = Depends(get_db)
):
    """
    Upload a file for a user.

    Args:
        username (str): The username of the user.
        file (UploadFile): The file to upload.
        db (Session): The database session.

    Returns:
        dict: A message indicating the success of the operation.
    """
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not file.filename:
        raise HTTPException(status_code=400, detail="File name cannot be empty")

    if not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only .txt files allowed")

    # Validate filename (excluding extension) - only allow alphanumeric, underscore, and hyphen
    filename_without_ext = file.filename.rsplit(".", 1)[0]
    if not re.match(r"^[a-zA-Z0-9_\-]+$", filename_without_ext):
        raise HTTPException(
            status_code=400,
            detail="Filename can only contain letters, numbers, underscores (_), and hyphens (-)",
        )

    unique_filename = f"{uuid.uuid4()}.txt"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception:
        raise HTTPException(status_code=500, detail="Could not save file")

    updated_user = crud.update_user_file(db, user.id, file_path, file.filename)
    return updated_user


# --- Download File ---
@router.get("/{username}/file")
def download_file(username: str, db: Session = Depends(get_db)):
    """
    Download a file for a user.

    Args:
        username (str): The username of the user.
        db (Session): The database session.

    Returns:
        FileResponse: The file to download.
    """
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.file_path or not os.path.exists(user.file_path):
        raise HTTPException(status_code=404, detail="No file found")

    return FileResponse(
        path=user.file_path,
        filename=user.original_filename,
        media_type="text/plain",
    )


# --- Delete File Only ---
@router.delete("/{username}/file")
def delete_file(username: str, db: Session = Depends(get_db)):
    """
    Delete a file for a user.

    Args:
        username (str): The username of the user.
        db (Session): The database session.

    Returns:
        dict: A message indicating the success of the operation.
    """
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.file_path:
        raise HTTPException(status_code=404, detail="User has no file to delete")

    crud.delete_user_file(db, user.id)
    return {"message": "File deleted successfully"}
