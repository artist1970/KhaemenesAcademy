# ============================
# 🌸 KHEMAENES ACADEMY — DOCKERFILE
# Backend: FastAPI + Uvicorn + Python 3.11
# ============================

# --- 1️⃣ Base Image ---
FROM python:3.11-slim

# --- 2️⃣ Metadata ---
LABEL maintainer="Headmaster Luminarch <KhemaenesAcademy@protonmail.com>"
LABEL project="Khemaenes Academy"
LABEL version="1.0.0"
LABEL description="Sovereign educational platform — FastAPI backend"

# --- 3️⃣ Environment Setup ---
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# --- 4️⃣ System Dependencies ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# --- 5️⃣ Working Directory ---
WORKDIR /app

# --- 6️⃣ Copy Project Files ---
# (Make sure .dockerignore excludes node_modules, logs, etc.)
COPY . /app

# --- 7️⃣ Install Python Dependencies ---
RUN pip install --upgrade pip
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# --- 8️⃣ Expose Port ---
EXPOSE 8000

# --- 9️⃣ Startup Command ---
# Uses Uvicorn to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# --- 10️⃣ Optional Healthcheck ---
HEALTHCHECK CMD curl --fail http://localhost:8000/health || exit 1

# ============================
# END OF DOCKERFILE
# ============================
