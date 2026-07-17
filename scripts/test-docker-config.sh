#!/bin/bash

set -e

echo "🧪 Testing Docker configuration injection..."
echo ""

# Test values
TEST_API_URL="http://test-api:8091"
TEST_AUTH_URL="http://test-auth:3000/login"

echo "📦 Building Docker image..."
docker build -t vpn-dashboard-test:latest . > /dev/null

echo "✅ Image built"
echo ""

echo "🚀 Starting test container..."
CONTAINER_ID=$(docker run -d \
  -e VITE_API_URL="$TEST_API_URL" \
  -e VITE_AUTH_UI_URL="$TEST_AUTH_URL" \
  -p 9999:8018 \
  vpn-dashboard-test:latest)

echo "✅ Container started: $CONTAINER_ID"
echo ""

# Wait for container to start
sleep 2

echo "🔍 Verifying env-config.js was substituted..."
SUBSTITUTED=$(docker exec "$CONTAINER_ID" cat /app/dist/env-config.js)

if echo "$SUBSTITUTED" | grep -q "$TEST_API_URL"; then
  echo "✅ VITE_API_URL correctly substituted"
else
  echo "❌ VITE_API_URL NOT substituted"
  echo "Content: $SUBSTITUTED"
fi

if echo "$SUBSTITUTED" | grep -q "$TEST_AUTH_URL"; then
  echo "✅ VITE_AUTH_UI_URL correctly substituted"
else
  echo "❌ VITE_AUTH_UI_URL NOT substituted"
  echo "Content: $SUBSTITUTED"
fi

echo ""
echo "📄 Full env-config.js content:"
echo "---"
docker exec "$CONTAINER_ID" cat /app/dist/env-config.js
echo "---"
echo ""

echo "🧹 Cleaning up..."
docker stop "$CONTAINER_ID" > /dev/null
docker rm "$CONTAINER_ID" > /dev/null
docker rmi vpn-dashboard-test:latest > /dev/null

echo "✅ Test complete!"
echo ""
echo "Next steps:"
echo "1. Verify the substituted values above match your test URLs"
echo "2. Deploy to VPS using docker-compose with .env file"
echo "3. Check window.__ENV__ in browser console to confirm"
