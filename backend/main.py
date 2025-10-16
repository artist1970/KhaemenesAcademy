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
Then run:

bash
Copy code
uvicorn main:app --reload
Your backend is now live on:

cpp
Copy code
http://127.0.0.1:8000
Step 2. Expose Localhost to Web (ngrok or Cloudflare Tunnel)
Use ngrok (quickest for development):

bash
Copy code
ngrok http 8000
You’ll get a temporary public URL like:

arduino
Copy code
https://abc123.ngrok.io
That’s what Wix will call.

Step 3. Connect Wix → FastAPI
In your Wix Velo code (Editor → Code Files → “Page Code”), use:

js
Copy code
import {fetch} from 'wix-fetch';

export function sendFormData() {
  const payload = {
    name: $w('#nameInput').value,
    grade: $w('#gradeDropdown').value,
  };

  fetch("https://abc123.ngrok.io/submit_form", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Server Response:", data);
    $w('#statusText').text = "Submitted successfully!";
  })
  .catch(err => {
    console.error("Error:", err);
    $w('#statusText').text = "Submission failed.";
  });
}
