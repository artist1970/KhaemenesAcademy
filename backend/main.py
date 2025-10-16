from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Khaemenes Academy API")

# Allow Wix + localhost connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Khaemenes Academy API active"}

@app.post("/submit_form")
async def submit_form(data: dict):
    print("Received data:", data)
    return {"status": "ok", "received": data}
