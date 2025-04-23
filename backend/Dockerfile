# ---- Base image ----
    FROM python:3.11-slim

    # ---- Avoid .pyc files & enable unbuffered logs ----
    ENV PYTHONDONTWRITEBYTECODE=1
    ENV PYTHONUNBUFFERED=1
    
    # ---- Set work directory ----
    WORKDIR /app
    
    # ---- Install essential system dependencies ----
    RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
        && rm -rf /var/lib/apt/lists/*
    
    # ---- Copy and install Python dependencies ----
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    # ---- Copy application code ----
    COPY backend/ .
    
    # ---- Expose port & run ----
    EXPOSE 5000
    CMD ["python", "app.py"]
    