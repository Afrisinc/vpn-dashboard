@echo off
setlocal enabledelayedexpansion

echo 🧪 Testing Docker configuration injection...
echo.

set TEST_API_URL=http://test-api:8091
set TEST_AUTH_URL=http://test-auth:3000/login

echo 📦 Building Docker image...
docker build -t vpn-dashboard-test:latest . > nul

echo ✅ Image built
echo.

echo 🚀 Starting test container...
for /f %%i in ('docker run -d -e VITE_API_URL=%TEST_API_URL% -e VITE_AUTH_UI_URL=%TEST_AUTH_URL% -p 9999:8018 vpn-dashboard-test:latest') do set CONTAINER_ID=%%i

echo ✅ Container started: %CONTAINER_ID%
echo.

timeout /t 2 /nobreak > nul

echo 🔍 Verifying env-config.js was substituted...

for /f "delims=" %%a in ('docker exec %CONTAINER_ID% cat /app/dist/env-config.js') do set SUBSTITUTED=%%a

echo.
echo 📄 Full env-config.js content:
echo ---
docker exec %CONTAINER_ID% cat /app/dist/env-config.js
echo ---
echo.

echo 🧹 Cleaning up...
docker stop %CONTAINER_ID% > nul
docker rm %CONTAINER_ID% > nul
docker rmi vpn-dashboard-test:latest > nul

echo ✅ Test complete!
echo.
echo Next steps:
echo 1. Verify the substituted values above match your test URLs
echo 2. Deploy to VPS using docker-compose with .env file
echo 3. Check window.__ENV__ in browser console to confirm
