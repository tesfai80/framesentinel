@echo off
echo Setting up Cloud Tasks queue...
echo.

gcloud tasks queues create video-processing ^
  --location=europe-west3 ^
  --project=framesentinel ^
  --max-attempts=3 ^
  --max-retry-duration=1800s

echo.
echo Queue created successfully!
pause
