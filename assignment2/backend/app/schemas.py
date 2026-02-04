import re
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator


# Base schema (shared properties)
class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    file_word_count: Optional[int] = None

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        if not v:
            raise ValueError("Username cannot be empty")
        # Only allow alphanumeric characters, underscore, hyphen, and dot
        if not re.match(r"^[a-zA-Z0-9_.\-]+$", v):
            raise ValueError(
                "Username can only contain letters, numbers, underscores (_), hyphens (-), and dots (.)"
            )
        return v

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        # Only allow letters and spaces (no special characters)
        if not re.match(r"^[a-zA-Z\s]+$", v):
            raise ValueError(
                "Name can only contain letters and spaces (no special characters)"
            )
        return v


# INPUT: What the user sends to register
class UserCreate(UserBase):
    password: str


# INPUT: What the user sends to login
class UserLogin(BaseModel):
    username: str
    password: str


# INPUT: What the user sends to update
class UserUpdate(BaseModel):
    # don't allow updating username/email
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        # Only allow letters and spaces (no special characters)
        if not re.match(r"^[a-zA-Z\s]+$", v):
            raise ValueError(
                "Name can only contain letters and spaces (no special characters)"
            )
        return v


# OUTPUT: What server sends back (No Password!!!)
class UserResponse(UserBase):
    id: int
    original_filename: Optional[str] = None

    class Config:
        from_attributes = True
