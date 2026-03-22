# How to Connect Figma to Cursor AI

## Step-by-Step Connection Guide

### **Step 1: Start the WebSocket Server**

You need to run the server in a **separate terminal window** (not in the background).

**Option A: Using the script I created**
```bash
cd /Users/seancheng/Desktop/cursor01
./start-figma-server.sh
```

**Option B: Manual command**
```bash
cursor-talk-to-figma-socket
```

**Option C: Using npx (if needed)**
```bash
npx cursor-talk-to-figma-socket
```

### **Step 2: Keep Terminal Open**

⚠️ **Important**: Keep the terminal window open while using the Figma plugin. The server needs to stay running.

You should see output like:
```
Figma MCP Server running on port 3055
Waiting for connections...
```

### **Step 3: Connect in Figma**

1. **Open Figma** with your design file
2. **Open the Plugin**: "Talk To Figma MCP Plugin"
3. **Check Settings**:
   - WebSocket Server Port: **3055** (should be default)
4. **Click "Connect"** button
5. The status should change from "Disconnected" to "Connected"

### **Step 4: Verify Connection**

Once connected, you should see:
- ✅ Green status indicator
- ✅ "Connected to server" message
- ✅ Ability to send messages/commands

---

## 🔧 Troubleshooting

### **If connection fails:**

1. **Check if server is running:**
   ```bash
   lsof -i:3055
   ```
   Should show the process running

2. **Check for port conflicts:**
   ```bash
   lsof -i:3055 | grep LISTEN
   ```

3. **Try different port:**
   - Change port in Figma plugin settings
   - Run server with: `cursor-talk-to-figma-socket --port 3056`
   - Update plugin port to match

4. **Restart both:**
   - Close Figma plugin
   - Stop server (Ctrl+C)
   - Start server again
   - Reopen plugin and connect

### **Common Issues:**

**"Disconnected from server"**
- Server isn't running → Start it in terminal
- Wrong port → Check port number matches
- Firewall blocking → Check macOS firewall settings

**"Cannot connect"**
- Server crashed → Restart it
- Port in use → Try different port
- Network issue → Check localhost connection

---

## 📝 Quick Reference

**Server Command:**
```bash
cursor-talk-to-figma-socket
```

**Default Port:**
```
3055
```

**Server Location:**
```
/opt/homebrew/bin/cursor-talk-to-figma-socket
```

**Script Location:**
```
/Users/seancheng/Desktop/cursor01/start-figma-server.sh
```

---

## 🎯 What You Can Do Once Connected

Once connected, you can:
- Send design elements from Figma to me
- Get code suggestions based on your designs
- Convert Figma designs to HTML/CSS
- Get design feedback and improvements
- Sync design changes with code

---

## 💡 Pro Tips

1. **Keep server running**: Don't close the terminal while using the plugin
2. **Use separate terminal**: Run server in its own terminal window for easier monitoring
3. **Check logs**: Server output shows connection status and errors
4. **Auto-start**: You can add the server to startup if you use it frequently

---

Try running the server now in a new terminal window, then click "Connect" in the Figma plugin!
