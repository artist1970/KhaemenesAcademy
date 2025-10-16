from fastapi import FastAPI

app = FastAPI(
    title="Khaemenes Academy Backend",
    description="API backend for Khaemenes Academy platform",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Khaemenes Academy API!"}

# Example: Add a grade endpoint
@app.get("/grades/{grade_name}")
def get_grade_info(grade_name: str):
    # In a real app, fetch from database or file!
    return {
        "grade": grade_name,
        "curriculum": f"Curriculum info for {grade_name} will go here."
    }

# Example: Add more endpoints as you build out features!
