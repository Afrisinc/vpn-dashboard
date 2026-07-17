#!/bin/sh
set -e

echo "🔍 Running full validation..."
echo ""

echo "📝 Formatting code..."
pnpm format
echo "✅ Formatting complete"
echo ""

echo "🚨 Linting..."
pnpm lint
echo "✅ Linting complete"
echo ""

echo "🔤 Type checking..."
pnpm type-check
echo "✅ Type checking complete"
echo ""

echo "🏗️  Building..."
pnpm build
echo "✅ Build complete"
echo ""

echo "✨ All validations passed!"
