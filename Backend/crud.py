from sqlalchemy.orm import Session
from models import User, TodoItem
from schemas import UserCreate, TodoCreate, TodoUpdate

def create_user(db: Session, user: UserCreate):
    db_user = User(email=user.email, hashed_password="fakehashed" + user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_todo(db: Session, todo: TodoCreate, owner_email: str):
    db_todo = TodoItem(title=todo.title, owner_email=owner_email)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos(db: Session, owner_email: str):
    return db.query(TodoItem).filter(TodoItem.owner_email == owner_email).all()

def update_todo(db: Session, todo_id: int, update: TodoUpdate):
    db_todo = db.query(TodoItem).filter(TodoItem.id == todo_id).first()
    if db_todo:
        db_todo.completed = update.completed
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int):
    db_todo = db.query(TodoItem).filter(TodoItem.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo
