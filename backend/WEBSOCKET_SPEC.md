# WebSocket Endpoint Specification

## Endpoint: `/ws/search`

### Connection
- **Protocol**: WebSocket (ws://)
- **URL**: `ws://localhost:8000/ws/search`
- **Method**: Upgrade HTTP to WebSocket

### Message Format

#### Client to Server (Request)
```json
{
  "text": "string (optional)",
  "image": "base64-encoded-string (optional)",
  "source": "home | stumber (default: home)"
}
```

Example:
```json
{
  "text": "AI and machine learning",
  "image": null,
  "source": "home"
}
```

#### Server to Client (Streaming Response)
Multiple JSON objects streamed as they're generated, one per line.

**Response Types:**

1. **Articles Batch**
```json
{
  "type": "articles_batch",
  "items": [
    {
      "id": "1",
      "title": "...",
      "author": "...",
      "date": "...",
      "type": "article|simple",
      "description": "...",
      "image": "...",
      "comments": 0,
      "likes": 0,
      "emojis": [],
      "hasVideo": false
    }
  ]
}
```

2. **Summary Chunk** (streaming)
```json
{
  "type": "summary_chunk",
  "text": "chunk of text..."
}
```

3. **Summary Done**
```json
{
  "type": "summary_done"
}
```

4. **Image**
```json
{
  "type": "image",
  "path": "/path/to/generated/image_0.png",
  "mime_type": "image/png"
}
```

5. **Image Text**
```json
{
  "type": "image_text",
  "text": "generated image caption..."
}
```

6. **Image Error**
```json
{
  "type": "image_error"
}
```

7. **Completion**
```json
{
  "type": "done"
}
```

### Flow

1. Client connects to `/ws/search`
2. Client sends JSON message with text/image/source
3. Server orchestrates parallel agents:
   - **Articles Agent**: Batches articles in chunks
   - **Summary Agent**: Streams Gemini summary
   - **Image Agent**: Generates images with Gemini
4. Server streams results to client in real-time
5. Server sends `"type": "done"` when finished
6. Client can send another message or disconnect

### Advantages Over HTTP
- Real-time bidirectional streaming
- Lower latency for multiple events
- Single persistent connection
- Natural fit for orchestrated multi-agent results
