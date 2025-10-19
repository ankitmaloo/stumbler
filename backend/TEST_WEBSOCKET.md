# Testing the WebSocket Endpoint

## Prerequisites
1. Backend running: `cd backend && .venv/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload`
2. Node.js installed (for testing from frontend)

## Test 1: Simple curl-based WebSocket test (requires websocat)
```bash
# Install websocat: brew install websocat

# Test simple text query
echo '{"text": "AI and machine learning", "source": "home"}' | websocat ws://localhost:8000/ws/search

# Test with empty query
echo '{"text": "", "source": "home"}' | websocat ws://localhost:8000/ws/search
```

## Test 2: Python WebSocket client
```bash
cd backend
python3 -m pip install websockets
python3 test_websocket.py
```

## Test 3: Browser JavaScript test
Open browser console and run:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/search');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  ws.send(JSON.stringify({
    text: "web discovery and AI",
    source: "home"
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data.type, data);
  if (data.type === 'done') {
    console.log('Stream complete');
    ws.close();
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

## Expected Output Sequence
1. `articles_batch` - First batch of articles
2. `articles_batch` - More articles (multiple batches)
3. `summary_chunk` - Streamed summary chunks
4. `summary_done` - Summary complete
5. `image` - Generated image (if Gemini image generation works)
6. `image_text` - Caption for image
7. `done` - All streams complete

## Backend Verification Checklist
- [x] WebSocket endpoint created at `/ws/search`
- [x] Accepts JSON with text, image (base64), and source
- [x] Handles base64 image decoding
- [x] Runs orchestration: articles_agent, summary_agent, image_agent in parallel
- [x] Sends JSON events as they complete
- [x] Handles disconnections gracefully
- [x] Returns "done" event on completion

## What the Backend Does
1. Accepts WebSocket connection
2. Waits for JSON message with query
3. Launches 3 concurrent agents:
   - Articles agent: Streams article batches
   - Summary agent: Uses stream_generate() to create summary
   - Image agent: Uses generate_images() to create visuals
4. Sends all events through WebSocket as they occur
5. Ready for next query after "done"
