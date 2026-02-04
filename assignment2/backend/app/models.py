from sqlalchemy import Column, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    # primary key
    id = Column(Integer, primary_key=True, index=True)

    # login/signup info
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)  # TODO: pwd encryption

    # user info
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    address = Column(String, nullable=True)

    # file upload. txt only
    file_path = Column(String, nullable=True)  # [username]+[file_name].txt
    original_filename = Column(String, nullable=True)
