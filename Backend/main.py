from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import User, TodoItem
import crud
import schemas
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Create database tables
Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def fake_hash_password(password: str):
    return "fakehashed" + password


def authenticate_user(db: Session, email: str, password: str):
    user = crud.get_user(db, email)
    if user and user.hashed_password == "fakehashed" + password:
        return email
    return None


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_email = authenticate_user(db, form_data.username, form_data.password)
    if not user_email:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return {"access_token": user_email, "token_type": "bearer"}

@app.post("/users/")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    crud.create_user(db, user)
    return {"msg": "User created successfully"}

@app.post("/todos/")
async def create_todo(todo: schemas.TodoCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if not crud.get_user(db, token):
        raise HTTPException(status_code=401, detail="Invalid token")
    return crud.create_todo(db, todo, token)

@app.get("/todos/")
async def read_todos(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    todos = crud.get_todos(db, token)
    if not todos:
        raise HTTPException(status_code=404, detail="No todos found")
    return todos

@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, update: schemas.TodoUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    todo = crud.update_todo(db, todo_id, update)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    todo = crud.delete_todo(db, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"msg": "Todo deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
