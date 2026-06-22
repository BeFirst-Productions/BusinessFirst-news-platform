#!/bin/bash

echo "========================================="
echo "Starting BusinessFirst News Platform"
echo "========================================="
echo ""

# Kill any existing processes on our ports
echo "Ì∑π Cleaning up existing processes..."
taskkill //F //IM node.exe 2>/dev/null || true
sleep 2

# Start API Server
echo "Ì∫Ä Starting API Server on port 8083..."
cd apps/api
start "BusinessFirst-API" cmd //k "npx tsx src/server.ts"
cd ../..
sleep 3

# Start Web App
echo "Ìºê Starting Web App on port 3000..."
cd apps/web
start "BusinessFirst-Web" cmd //k "npx next dev -p 3000"
cd ../..
sleep 2

# Start Admin Panel
echo "‚öôÔ∏è  Starting Admin Panel on port 3001..."
cd apps/admin
start "BusinessFirst-Admin" cmd //k "npx next dev -p 3001"
cd ../..

echo ""
echo "========================================="
echo "‚úÖ All services started!"
echo ""
echo "Ì≥° API:    http://localhost:8083"
echo "Ìø† Web:    http://localhost:3000"
echo "‚öôÔ∏è  Admin:  http://localhost:3001"
echo ""
echo "Ì≥ã Health Check: http://localhost:8083/health"
echo "========================================="
echo ""
echo "To stop all services, close the terminal windows"
echo "or run: taskkill //F //IM node.exe"
