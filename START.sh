#!/bin/bash

# START.sh - Launch backend API server as a background process

# Set NODE_ENV to production if not already set
export NODE_ENV="${NODE_ENV:-production}"

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if server directory exists
if [ ! -d "server" ]; then
    echo "Error: server directory not found. Please ensure you're in the project root."
    exit 1
fi

# Check if server/index.js exists
if [ ! -f "server/index.js" ]; then
    echo "Error: server/index.js not found."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Warning: node_modules not found. Running npm install..."
    npm install
fi

# Kill any existing process on the backend port
if [ ! -z "$BACKEND_PORT" ]; then
    echo "Checking for existing processes on port $BACKEND_PORT..."
    EXISTING_PID=$(lsof -ti:$BACKEND_PORT)
    if [ ! -z "$EXISTING_PID" ]; then
        echo "Killing existing process $EXISTING_PID on port $BACKEND_PORT..."
        kill -9 $EXISTING_PID 2>/dev/null || true
        sleep 2
    fi
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the backend server in the background
echo "Starting backend API server..."
nohup node server/index.js > logs/backend.log 2>&1 &

# Store the PID
BACKEND_PID=$!
echo $BACKEND_PID > .backend.pid

# Wait a moment to check if the process started successfully
sleep 2

# Check if process is still running
if ps -p $BACKEND_PID > /dev/null; then
    echo "Backend API server started successfully with PID: $BACKEND_PID"
    echo "Log file: logs/backend.log"
    echo "To stop the server, run: kill $BACKEND_PID"
    echo "Or use: npm run stop-server (if script is configured)"
    exit 0
else
    echo "Error: Backend server failed to start. Check logs/backend.log for details."
    exit 1
fi