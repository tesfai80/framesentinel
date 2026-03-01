# Use an official Python slim image
FROM python:3.10-slim

# Install system dependencies required for OpenCV and psycopg2
# libgl1-mesa-glx and libglib2.0-0 are necessary for opencv-python to run in Docker
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Set the default port for Cloud Run
ENV PORT 8080

# Run the FastAPI app directly with uvicorn
# --host 0.0.0.0 is mandatory for Cloud Run
# --port $PORT uses the dynamic port assigned by Google Cloud
CMD uvicorn main:app --host 0.0.0.0 --port $PORT