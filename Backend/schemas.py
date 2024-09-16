from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    completed: bool

class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True
