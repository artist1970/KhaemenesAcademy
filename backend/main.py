from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal, Grade
from pydantic import BaseModel fastapi import FastAPI

app = FastAPI(
    title="Khaemenes Academy Backend",
    description="API backend for Khaemenes Academy platform",
    version="0.1.0"
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Khaemenes Academy API!"}

class GradeCreate(BaseModel):
    name: str
    description: str | None = None

# Example: Add a grade endpoint
@app.get("/grades/{grade_name}")
def get_grade_info(grade_name: str):
    # In a real app, fetch from database or file!
    return {
        "grade": grade_name,
        "curriculum": f"Curriculum info for {grade_name} will go here."
    }

@app.post("/grades/", response_model=dict)
def create_grade(grade: GradeCreate, db: Session = Depends(get_db)):
    # Check if grade with this name already exists
    existing = db.query(Grade).filter(Grade.name == grade.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Grade already exists")
    new_grade = Grade(name=grade.name, description=grade.description)
    db.add(new_grade)
    db.commit()
    db.refresh(new_grade)
    return {"id": new_grade.id, "name": new_grade.name, "description": new_grade.description}

# Example: Add more endpoints as you build out features!
