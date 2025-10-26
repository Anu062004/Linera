#!/bin/bash

# MiniChain Studio Startup Script
echo "🚀 Starting MiniChain Studio..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install

# Build smart contracts (if Rust is available)
if command -v cargo &> /dev/null; then
    echo "🦀 Building smart contracts..."
    cd ../contracts/counter_app
    cargo build --target wasm32-unknown-unknown --release 2>/dev/null || echo "⚠️  Counter app build failed (Rust target not configured)"
    
    cd ../poll_app
    cargo build --target wasm32-unknown-unknown --release 2>/dev/null || echo "⚠️  Poll app build failed (Rust target not configured)"
    
    cd ../tip_jar_app
    cargo build --target wasm32-unknown-unknown --release 2>/dev/null || echo "⚠️  Tip Jar app build failed (Rust target not configured)"
else
    echo "⚠️  Rust not found. Smart contracts will use demo mode."
fi

# Start backend
echo "🔧 Starting backend server..."
cd ../../backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ MiniChain Studio is running!"
echo "📊 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
