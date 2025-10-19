# Testing Instructions - Progressive-Disclosure Implementation

## Setup Complete ✅

All code has been implemented with debug logging added:
- **Backend**: Detailed parsing and event emission logs
- **Frontend**: Console logs + visual debug banner showing headlines count

## Test Procedure

### Step 1: Start the Backend

```bash
cd /Users/ankit/Documents/dev/hacks/stumbler
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Step 2: Start the Frontend

In a **new terminal**:
```bash
cd /Users/ankit/Documents/dev/hacks/stumbler/frontend
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 3: Test with Browser

1. **Open browser** to http://localhost:5173
2. **Open DevTools Console** (F12 or Cmd+Option+I)
3. **Enter a query** like: "artificial intelligence breakthroughs"
4. **Click "Discover"** button
5. **Navigate** to the `/rabbit` page

### Step 4: What to Look For

#### In the Browser (Frontend)

**Visual Indicators:**
- ✅ Yellow debug banner at top showing: `Headlines count: X`
- ✅ Loading skeleton appears first
- ✅ Headlines start appearing one by one
- ✅ Hero section displays first headline with title + caption
- ✅ Sidebars populate with more headlines
- ✅ Scrolling carousel shows headlines

**Console Logs:**
```
[Rabbit] Received event: {type: "headline", title: "...", caption: "..."}
[Rabbit] Adding headline: ... ...
[Rabbit] Updated headlines count: 1
[Rabbit] Updated headlines count: 2
...
[Rabbit] Done event received
```

#### In Backend Terminal

**Expected logs:**
```
Main agent response: ...
Calling subagent with: ...
Subagent result: ...
Final response: ...
[parse_headlines] Parsing text (first 300 chars): ...
[parse_headlines] Found fenced code block (first 200 chars): ...
[parse_headlines] Successfully parsed JSON from fenced block: 10 headlines
```

### Step 5: Optional - Test WebSocket Directly

If you want to test the backend without the UI:

```bash
cd /Users/ankit/Documents/dev/hacks/stumbler
python3 test_websocket_simple.py
```

This will:
1. Connect to WebSocket
2. Send a test query
3. Print all headlines received
4. Report success/failure

**Expected output:**
```
📰 HEADLINE #1
   Title: AI Breakthrough in Natural Language
   Caption: New model achieves human-level understanding
   
📰 HEADLINE #2
   Title: ...
   Caption: ...
   
✅ DONE - Received 10 headlines total
🎉 TEST PASSED!
```

## Troubleshooting

### Problem: No headlines appear in UI

**Check:**
1. Browser console - Are headline events being received?
   - If NO → WebSocket connection issue
   - If YES → React state update issue

2. Backend logs - Is parsing successful?
   - Look for: `[parse_headlines] Successfully parsed JSON`
   - If not found → Model response issue

3. Network tab - Is WebSocket connected?
   - Should see `ws://localhost:8000/ws/search` with status 101

### Problem: WebSocket won't connect

**Check:**
1. Is backend running? Visit http://localhost:8000/health
2. CORS settings - should allow `http://localhost:5173`
3. Port conflicts - something else on 8000?

### Problem: Headlines parsing fails

**Check backend logs for:**
```
[parse_headlines] Parsing text (first 300 chars): ...
```

This shows what the model returned. Should see markdown code fences with JSON.

**Common issues:**
- Model didn't follow format → Adjust prompt
- JSON syntax error → Parser should fix trailing commas
- No fenced code block → Fallback to raw JSON extraction

### Problem: UI updates but shows wrong data

**Check:**
1. Debug banner - Does count match expectations?
2. Browser console - Are title/caption fields correct?
3. React DevTools - Check `headlines` state

## Success Criteria

✅ **Backend:**
- Connects to WebSocket
- Calls subagent for research
- Model returns JSON in markdown fences
- Parser extracts 8-12 headlines
- Emits headline events
- Sends done event

✅ **Frontend:**
- Receives all events
- Updates headlines state
- Displays headlines in UI:
  - Hero section (first headline)
  - Left sidebar (headlines 2-4)
  - Right sidebar (headlines 5-6)
  - Scrolling carousel (all headlines)

## Debug Output Examples

### Good Backend Output
```
[parse_headlines] Parsing text (first 300 chars): ```json
{
  "headlines": [
    {"title": "AI Revolution Accelerates", "caption": "..."}
[parse_headlines] Found fenced code block (first 200 chars): {
  "headlines": [
[parse_headlines] Successfully parsed JSON from fenced block: 10 headlines
```

### Good Frontend Output
```
[Rabbit] Received event: {type: "headline", title: "AI Revolution Accelerates", caption: "Major breakthroughs in machine learning"}
[Rabbit] Adding headline: AI Revolution Accelerates Major breakthroughs in machine learning
[Rabbit] Updated headlines count: 1
```

## Next Steps

1. **Run the test** following steps above
2. **Copy paste** the debug output from both backend and frontend
3. **Share** what you see - we'll debug from there!

The debug logging is comprehensive, so any issues will be visible in the output.
