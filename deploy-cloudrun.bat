@echo off
echo Deploying FrameSentinel Backend to Cloud Run...
echo.

gcloud run deploy framesentinel ^
  --source . ^
  --region europe-west3 ^
  --project framesentinel ^
  --allow-unauthenticated ^
  --set-env-vars DATABASE_URL="postgresql://postgres.bmokazkenejpzzrptxpw:K3O5vM2StlGLAetI@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",API_KEY="d0b293dbf55cf7aa5c7beab48ed622378695fee513d315dea45e9eee378f7f84"

echo.
echo Deployment complete!
pause
