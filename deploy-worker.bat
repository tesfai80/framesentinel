@echo off
echo Deploying FrameSentinel Worker to Cloud Run...
echo.

gcloud run deploy framesentinel-worker ^
  --source . ^
  --dockerfile Dockerfile.worker ^
  --region europe-west3 ^
  --project framesentinel ^
  --no-allow-unauthenticated ^
  --set-env-vars DATABASE_URL="postgresql://postgres.bmokazkenejpzzrptxpw:K3O5vM2StlGLAetI@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

echo.
echo Worker deployment complete!
pause
