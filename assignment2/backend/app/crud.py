import os

from pwdlib import PasswordHash
from sqlalchemy.orm import Session

from . import models, schemas

# Initialize password hasher using Argon2 - recommended
password_hash = PasswordHash.recommended()


# ======== HELPER FUNCTIONS =========
def authenticate_user(db: Session, username: str, password_plain: str):
    """
    Authenticate a user by their username and password.

    Args:
        db (Session): The database session.
        username (str): The username of the user to authenticate.
        password_plain (str): The plain text password to verify.

    Returns:
        User: The authenticated user object if successful, otherwise None.
    """
    user = get_user_by_username(db, username)
    if not user:
        return False
    # Verify password hash
    if not password_hash.verify(password_plain, user.hashed_password):
        return False
    return user


def get_user_by_username(db: Session, username: str):
    """
    Retrieve a user by their username.

    Args:
        db (Session): The database session.
        username (str): The username of the user to retrieve.

    Returns:
        User: The user object if found, otherwise None.
    """
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    """
    Retrieve a user by their email.

    Args:
        db (Session): The database session.
        email (str): The email of the user to retrieve.

    Returns:
        User: The user object if found, otherwise None.
    """
    return db.query(models.User).filter(models.User.email == email).first()


# ======== USER CRUD ==============
def create_user(db: Session, user: schemas.UserCreate):
    # hash the password
    hashed_pw = password_hash.hash(user.password)

    # create DB Object
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
        first_name=user.first_name,
        last_name=user.last_name,
        address=user.address,
    )

    # save to db
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, db_user: models.User, updates: schemas.UserUpdate):
    """
    Update a user's information.

    Args:
        db (Session): The database session.
        db_user (User): The user object to update.
        updates (UserUpdate): The updated user information.

    Returns:
        User: The updated user object if successful, otherwise None.
    """
    update_data = updates.model_dump(exclude_unset=True)

    # If updating password, hash it first
    if "password" in update_data:
        update_data["hashed_password"] = password_hash.hash(update_data.pop("password"))

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, username: str):
    """
    Delete a user by their username.

    Args:
        db (Session): The database session.
        username (str): The username of the user to delete.

    Returns:
        bool: True if the user was deleted successfully, otherwise False.
    """
    user = get_user_by_username(db, username)
    if not user:
        return False

    # 1. Delete physical file if exists
    if user.file_path and os.path.exists(user.file_path):
        os.remove(user.file_path)

    # 2. Delete DB record
    db.delete(user)
    db.commit()
    return True


# ======== FILE CRUD ==============
def update_user_file(db: Session, user_id: int, file_path: str, original_name: str):
    """
    Update the file path and original filename for a user.

    Args:
        db (Session): The database session.
        user_id (int): The ID of the user to update.
        file_path (str): The new file path.
        original_name (str): The new original filename.

    Returns:
        User: The updated user object.
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()

    # If a file already exists, delete the old physical file first
    if user.file_path and os.path.exists(user.file_path):
        os.remove(user.file_path)

    user.file_path = file_path
    user.original_filename = original_name

    # get word count in .txt file
    if file_path.endswith(".txt"):
        with open(file_path, "r") as f:
            content = f.read()
            user.file_word_count = len(content.split())
    else:
        user.file_word_count = None

    db.commit()
    db.refresh(user)
    return user


def delete_user_file(db: Session, user_id: int):
    """
    Delete the file path and original filename for a user.

    Args:
        db (Session): The database session.
        user_id (int): The ID of the user to update.

    Returns:
        User: The updated user object.
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()

    # Delete physical file
    if user.file_path and os.path.exists(user.file_path):
        os.remove(user.file_path)

    # clear DB columns
    user.file_path = None
    user.original_filename = None
    user.file_word_count = None
    db.commit()
    db.refresh(user)
    return user
