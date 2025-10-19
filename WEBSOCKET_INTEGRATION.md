# WebSocket Integration Summary

## What Changed

### Backend (`backend/main.py`)
- **Added**: New WebSocket endpoint `/ws/search` (lines 550-637)
- **Accepts**: JSON messages with `text`, `image` (base64), and `source` fields
- **Streams**: Real-time events for articles, summaries, and generated images
- **No breaking changes**: All existing HTTP endpoints remain untouched

### Frontend API Client (`frontend/src/lib/api.ts`)
- **Added**: `webSocketSearch()` function - establishes WebSocket connection and streams events
- **Added**: `fileToBase64()` helper - converts File objects to base64 for transmission
- **Kept**: Legacy `startSearch()` and `streamSearch()` for backward compatibility

### Frontend Components

#### MultimodalInputBox (`frontend/src/components/MultimodalInputBox.tsx`)
- **Changed**: Import removed `startSearch`, now just uses `multimodalSearch`
- **Changed**: `handleSubmit()` now directly navigates to rabbit page with search params in state
- **No async wait**: Immediate navigation with query data instead of waiting for job_id

#### Rabbit Page (`frontend/src/pages/rabbit.tsx`)
- **Changed**: Imports `webSocketSearch` instead of `streamSearch`
- **Changed**: Gets search params from `location.state.searchParams` instead of URL job param
- **Changed**: Establishes WebSocket connection directly with search params
- **Same flow**: Event handling remains identical

## Data Flow

```
1. HomePage
   ↓
2. User enters text/image in MultimodalInputBox
   ↓
3. handleSubmit() navigates to /rabbit with searchParams in state
   ↓
4. Rabbit page loads and calls webSocketSearch(searchParams)
   ↓
5. WebSocket connects to backend /ws/search
   ↓
6. Message sent with { text, image (base64), source }
   ↓
7. Backend orchestrates 3 agents in parallel
   ↓
8. Events stream back: articles_batch, summary_chunk, image, done
   ↓
9. Rabbit page receives events and updates state
   ↓
10. UI renders articles, summary, and images in real-time
```

## Key Features

✅ **Real-time streaming**: Results appear as they're generated, not in batches  
✅ **Persistent connection**: Single WebSocket per search, no polling  
✅ **Base64 image support**: Images encoded and sent through JSON  
✅ **Parallel processing**: Articles, summaries, images generated concurrently  
✅ **Type-safe**: Full TypeScript support throughout  
✅ **Backward compatible**: Old HTTP endpoints still available  

## Testing

### Prerequisites
```bash
# Terminal 1: Start backend
cd backend
.venv/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### Manual Testing
1. Open `http://localhost:5173`
2. Navigate to HomePage
3. Enter text query (e.g., "AI and machine learning")
4. Click "Discover"
5. Should navigate to rabbit page and stream results in real-time
6. Articles, summary, and images should populate as received

### Browser DevTools
Open Network tab → WS filter to see:
- Connection to `ws://localhost:8000/ws/search`
- Frames showing JSON messages (articles, summary, images)
- Connection close when stream completes

## Error Handling

- **WebSocket fails**: Component continues gracefully, falls back to empty state
- **Image conversion fails**: Sends null for image, text query still processes
- **Backend error**: Server closes connection with code 1011
- **Disconnection**: Component cleanup prevents memory leaks

## Performance Notes

- WebSocket reduces latency compared to polling HTTP
- Base64 encoding slightly increases message size (~33% overhead)
- Streaming allows progressive rendering vs waiting for all results
- Parallel agents on backend mean faster overall completion time
