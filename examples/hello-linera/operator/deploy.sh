#!/bin/bash
set -e

echo "🚀 Linera Deployment Script"
echo "=========================="

# Check if linera CLI is installed
if ! command -v linera &> /dev/null; then
    echo "❌ Error: linera CLI not found. Please install it first."
    echo "   Visit: https://linera.io/docs/getting-started"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "../contract/Cargo.toml" ]; then
    echo "❌ Error: Contract directory not found. Please run this script from the operator directory."
    exit 1
fi

echo "📦 Building contract for release..."
cd ../contract
cargo build --release --target wasm32-unknown-unknown --manifest-path Cargo.toml

if [ $? -ne 0 ]; then
    echo "❌ Contract build failed!"
    exit 1
fi

echo "✅ Contract built successfully!"

# Find the WASM file
WASM_FILE=$(find target/wasm32-unknown-unknown/release -name "*.wasm" | head -1)

if [ -z "$WASM_FILE" ]; then
    echo "❌ Error: No WASM file found in target/wasm32-unknown-unknown/release/"
    exit 1
fi

echo "📄 Found WASM file: $WASM_FILE"

# Deploy to Linera testnet
echo "🚀 Deploying to Linera testnet..."
cd ../operator

linera publish \
    --application "../contract/$WASM_FILE" \
    --json > deploy-log.json

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "📋 Deployment log saved to deploy-log.json"
    
    # Extract application ID if possible
    if [ -f "deploy-log.json" ]; then
        APP_ID=$(grep -o '"application_id":"[^"]*"' deploy-log.json | head -1 | cut -d'"' -f4)
        if [ ! -z "$APP_ID" ]; then
            echo "🆔 Application ID: $APP_ID"
        fi
    fi
    
    echo ""
    echo "🎉 Your Linera app is now live on the testnet!"
    echo "   Use the application ID to interact with your contract."
else
    echo "❌ Deployment failed!"
    echo "📋 Check deploy-log.json for error details"
    exit 1
fi
