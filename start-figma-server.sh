#!/bin/bash
# Script to start the Figma MCP server for Cursor AI connection

echo "Starting Figma MCP Server..."
echo "Port: 3055"
echo ""
echo "Keep this terminal open while using the Figma plugin."
echo "Press Ctrl+C to stop the server."
echo ""

# Add bun to PATH if not already there
export PATH="$HOME/.bun/bin:$PATH"

# Kill any existing instances
pkill -f cursor-talk-to-figma 2>/dev/null
sleep 1

# Start the server
/opt/homebrew/bin/cursor-talk-to-figma-socket
