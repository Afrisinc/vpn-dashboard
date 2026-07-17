#!/bin/sh
set -e

# Substitute environment variables in env-config.js
ENV_FILE="./dist/env-config.js"
if [ -f "$ENV_FILE" ]; then
  sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" "$ENV_FILE"
  sed -i "s|__VITE_AUTH_UI_URL__|${VITE_AUTH_UI_URL:-}|g" "$ENV_FILE"
fi

# Substitute environment variables in config.json
CONFIG_FILE="./dist/config.json"
if [ -f "$CONFIG_FILE" ]; then
  sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" "$CONFIG_FILE"
  sed -i "s|__VITE_AUTH_UI_URL__|${VITE_AUTH_UI_URL:-}|g" "$CONFIG_FILE"
fi

exec "$@"
