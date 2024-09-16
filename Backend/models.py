from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"  # Use double underscores
    email = Column(String, primary_key=True, index=True)
    hashed_password = Column(String)

class TodoItem(Base):
    __tablename__ = "todos"  # Use double underscores
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
    owner_email = Column(String, index=True)
