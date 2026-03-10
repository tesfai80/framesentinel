# Production Environment Variables

Complete guide for deploying FrameSentinel services to production.

---

## 1. FrameSentinel API (Google Cloud Run)

**Service:** Main API Gateway  
**Deploy Command:** `gcloud run deploy framesentinel --source . --region europe-west3`

### Required Environment Variables

```bash
DATABASE_URL=postgresql://postgres.bmokazkenejpzzrptxpw:K3O5vM2StlGLAetI@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
API_KEY=d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84
REDIS_URL=rediss://default:AWr1AAIncDEyNTY0MmQ0ZTdhZmU0ZGFkYjVhOWEwNzg2NzQ2YWMwZHAxMjczODE@trusted-lionfish-27381.upstash.io:6379
STORAGE_PATH=/tmp/videos
MAX_VIDEO_SIZE_MB=100
ADMIN_DASHBOARD_URL=https://admin.framesentinel.com
GCP_PROJECT=framesentinel
GCP_LOCATION=europe-west3
TASK_QUEUE_NAME=video-processing
WORKER_URL=https://framesentinel-worker-XXXXX.run.app/process
```

**Set via Cloud Run Console or CLI:**
```bash
gcloud run services update framesentinel \
  --set-env-vars DATABASE_URL="postgresql://..." \
  --set-env-vars API_KEY="d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84" \
  --set-env-vars REDIS_URL="rediss://..." \
  --set-env-vars STORAGE_PATH="/tmp/videos" \
  --set-env-vars MAX_VIDEO_SIZE_MB="100" \
  --set-env-vars ADMIN_DASHBOARD_URL="https://admin.framesentinel.com" \
  --set-env-vars GCP_PROJECT="framesentinel" \
  --set-env-vars GCP_LOCATION="europe-west3" \
  --set-env-vars TASK_QUEUE_NAME="video-processing" \
  --set-env-vars WORKER_URL="https://framesentinel-worker-XXXXX.run.app/process" \
  --region europe-west3
```

**Notes:**
- Update `WORKER_URL` after deploying the worker service
- `STORAGE_PATH=/tmp/videos` is ephemeral storage on Cloud Run
- Consider moving database to `eu-central-1` for better latency

---

## 2. FrameSentinel Worker (Google Cloud Run)

**Service:** Background Video Processing Worker  
**Deploy Command:** `gcloud run deploy framesentinel-worker --source . --region europe-west3`

### Required Environment Variables

```bash
DATABASE_URL=postgresql://postgres.bmokazkenejpzzrptxpw:K3O5vM2StlGLAetI@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
API_KEY=d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84
REDIS_URL=rediss://default:AWr1AAIncDEyNTY0MmQ0ZTdhZmU0ZGFkYjVhOWEwNzg2NzQ2YWMwZHAxMjczODE@trusted-lionfish-27381.upstash.io:6379
STORAGE_PATH=/tmp/videos
MAX_VIDEO_SIZE_MB=100
```

**Set via Cloud Run Console or CLI:**
```bash
gcloud run services update framesentinel-worker \
  --set-env-vars DATABASE_URL="postgresql://..." \
  --set-env-vars API_KEY="d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84" \
  --set-env-vars REDIS_URL="rediss://..." \
  --set-env-vars STORAGE_PATH="/tmp/videos" \
  --set-env-vars MAX_VIDEO_SIZE_MB="100" \
  --region europe-west3
```

**Notes:**
- Worker processes videos from Cloud Tasks queue
- Requires same database and Redis access as API
- No CORS or webhook configuration needed

---

## 3. Admin Dashboard (Vercel)

**Service:** Admin Dashboard (Next.js)  
**Deploy:** Connect GitHub repo to Vercel, select `admin-dashboard` folder

### Required Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://framesentinel-XXXXX.run.app
NEXT_PUBLIC_API_KEY=d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84
```

**Set in Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development

**Notes:**
- Update `NEXT_PUBLIC_API_URL` with actual Cloud Run API URL after deployment
- Variables prefixed with `NEXT_PUBLIC_` are exposed to browser
- API key is safe here as dashboard is admin-only (add authentication in production)

---

## 4. Marketing Site (Vercel)

**Service:** Public Marketing Website (Next.js)  
**Deploy:** Connect GitHub repo to Vercel, select `marketing-site` folder

### Optional Environment Variables

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Set in Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add Google Analytics ID (optional)

**Notes:**
- Marketing site is static/public - no sensitive data
- Google Analytics is optional for tracking visitors
- No API connection needed

---

## Deployment Order

1. **Deploy Worker First:**
   ```bash
   gcloud run deploy framesentinel-worker --source . --region europe-west3
   ```
   Copy the worker URL from output

2. **Deploy API:**
   ```bash
   gcloud run deploy framesentinel --source . --region europe-west3
   ```
   Update `WORKER_URL` environment variable with worker URL from step 1

3. **Deploy Admin Dashboard:**
   - Push to GitHub
   - Connect to Vercel
   - Set `NEXT_PUBLIC_API_URL` with API URL from step 2

4. **Deploy Marketing Site:**
   - Push to GitHub
   - Connect to Vercel
   - Optionally set Google Analytics ID

---

## Security Checklist

- [ ] Never commit `.env` files to Git
- [ ] Rotate API keys before production
- [ ] Enable authentication on Admin Dashboard
- [ ] Set up CORS properly in API
- [ ] Use secrets manager for sensitive values
- [ ] Enable Cloud Run authentication
- [ ] Set up monitoring and alerts
- [ ] Configure rate limiting
- [ ] Review database security rules
- [ ] Enable HTTPS only

---

## Quick Reference

| Service | Platform | Region | URL Pattern |
|---------|----------|--------|-------------|
| API | Cloud Run | europe-west3 | `framesentinel-XXXXX.run.app` |
| Worker | Cloud Run | europe-west3 | `framesentinel-worker-XXXXX.run.app` |
| Admin | Vercel | Global CDN | `admin.framesentinel.com` |
| Marketing | Vercel | Global CDN | `framesentinel.com` |

---

## Support

For deployment issues:
- Check Cloud Run logs: `gcloud run logs read framesentinel --region europe-west3`
- Check Vercel deployment logs in dashboard
- Verify all environment variables are set correctly
- Test API endpoints with curl or Postman
