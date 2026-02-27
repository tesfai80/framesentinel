# Deployment Guide

## Production Checklist

### Backend

1. **Change API Key**
   ```python
   # src/config/settings.py
   API_KEY: str = os.getenv("FRAMESENTINEL_API_KEY")
   ```

2. **Use Production Database**
   ```python
   DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://...")
   ```

3. **Configure Storage**
   ```python
   STORAGE_PATH: str = os.getenv("STORAGE_PATH", "/var/framesentinel/videos")
   ```

4. **Set Environment Variables**
   ```bash
   export FRAMESENTINEL_API_KEY="your-production-key"
   export DATABASE_URL="postgresql://..."
   export STORAGE_PATH="/var/framesentinel/videos"
   ```

5. **Run with Gunicorn**
   ```bash
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### TypeScript SDK

1. **Build for Production**
   ```bash
   cd frontend/sdk
   npm run build
   ```

2. **Publish to npm** (optional)
   ```bash
   npm login
   npm publish --access public
   ```

3. **Or Use Locally**
   ```bash
   npm pack
   # Install in your project:
   npm install /path/to/framesentinel-sdk-1.0.0.tgz
   ```

## Docker Deployment

### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - FRAMESENTINEL_API_KEY=${API_KEY}
      - DATABASE_URL=postgresql://postgres:password@db:5432/framesentinel
    volumes:
      - ./storage:/app/storage
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=framesentinel
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Cloud Deployment

### AWS

```bash
# Install AWS CLI
pip install awscli

# Deploy to Elastic Beanstalk
eb init -p python-3.11 framesentinel
eb create framesentinel-prod
eb deploy
```

### Google Cloud

```bash
# Deploy to Cloud Run
gcloud run deploy framesentinel \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Heroku

```bash
# Create app
heroku create framesentinel

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main
```

## Security Best Practices

1. **Use HTTPS** in production
2. **Rotate API keys** regularly
3. **Enable rate limiting**
4. **Set up monitoring** (Sentry, DataDog)
5. **Configure CORS** properly
6. **Use secrets manager** for sensitive data
7. **Enable audit logging**
8. **Regular security updates**

## Monitoring

### Health Check Endpoint

```bash
curl https://api.framesentinel.com/health
```

### Metrics to Monitor

- API response time
- Video processing time
- Error rate
- Storage usage
- Database connections
- Queue length

## Scaling

### Horizontal Scaling

- Run multiple API instances behind load balancer
- Use Redis for session caching
- Separate video processing workers

### Vertical Scaling

- Increase CPU for video processing
- Add more RAM for frame analysis
- Use SSD for faster storage

## Backup

```bash
# Database backup
pg_dump framesentinel > backup.sql

# Storage backup
aws s3 sync /var/framesentinel/videos s3://framesentinel-backups/
```

## Troubleshooting

### High Memory Usage
- Reduce frame sampling rate
- Process videos in batches
- Clear old sessions regularly

### Slow Processing
- Add more workers
- Optimize detection algorithms
- Use GPU for ML models

### Storage Issues
- Implement retention policy
- Compress old videos
- Use object storage (S3, GCS)
