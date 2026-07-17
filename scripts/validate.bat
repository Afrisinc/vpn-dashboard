@echo off
setlocal enabledelayedexpansion

echo 🔍 Running full validation...
echo.

echo 📝 Formatting code...
call pnpm format
if errorlevel 1 exit /b 1
echo ✅ Formatting complete
echo.

echo 🚨 Linting...
call pnpm lint
if errorlevel 1 exit /b 1
echo ✅ Linting complete
echo.

echo 🔤 Type checking...
call pnpm type-check
if errorlevel 1 exit /b 1
echo ✅ Type checking complete
echo.

echo 🏗️  Building...
call pnpm build
if errorlevel 1 exit /b 1
echo ✅ Build complete
echo.

echo ✨ All validations passed!
