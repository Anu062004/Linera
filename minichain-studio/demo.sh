#!/bin/bash

# MiniChain Studio Demo Script
echo "🎬 MiniChain Studio Demo"
echo "========================"
echo ""

echo "This demo will show you how to:"
echo "1. Deploy micro-apps on Linera blockchain"
echo "2. Interact with Counter, Poll, and Tip Jar apps"
echo "3. Visualize microchains and cross-chain connections"
echo ""

echo "🚀 Starting the application..."
echo ""

# Start the application
npm run dev &

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

echo ""
echo "✅ MiniChain Studio is now running!"
echo ""
echo "📊 Backend API: http://localhost:3001"
echo "🎨 Frontend UI: http://localhost:3000"
echo ""
echo "🎯 Demo Steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Click 'Deploy App' to create your first micro-app"
echo "3. Choose Counter, Poll, or Tip Jar template"
echo "4. Interact with your deployed apps"
echo "5. Visit the Visualizer to see microchain connections"
echo ""
echo "💡 Tips:"
echo "- Counter apps can be incremented"
echo "- Poll apps collect votes on options"
echo "- Tip Jar apps can send tips across chains"
echo "- All apps run on their own microchains"
echo ""
echo "🛑 Press Ctrl+C to stop the demo"

# Wait for user interrupt
trap "echo '🛑 Stopping demo...'; pkill -f 'npm run dev'; exit" INT
wait
