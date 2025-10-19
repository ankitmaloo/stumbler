# API Endpoints Spec (for UI)

Base URL: http://localhost:8000

Auth: None (server reads GEMINI_API_KEY from env)

## 1) Streamed Text Generation
- Method: POST
- URL: /api/gemini/text-stream
- Request headers: Content-Type: application/json
- Body:
```json
{ "text": "Your prompt here" }
```
- Response: text/plain (chunked streaming). Read with a ReadableStream (not SSE).
- Minimal client example (browser):
```js
const res = await fetch(`${BASE}/api/gemini/text-stream`, {
  method: 'POST', headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ text })
});
const reader = res.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value, { stream: true });
  onChunk(chunk); // append to UI
}
```

## 2) Image Generation (returns saved file paths)
- Method: POST
- URL: /api/gemini/image-generate
- Request headers: Content-Type: application/json
- Body:
```json
{ "text": "Describe the image(s) you want" }
```
- Response: application/json
```json
{
  "text": "Optional accompanying text",
  "images": [
    { "path": "backend/generated/image_0.jpeg", "mime_type": "image/jpeg" }
  ]
}
```
Note: paths are on the backend filesystem; not publicly served.

## 3) Live (WebSocket) – text relay
- URL: ws://localhost:8000/ws/gemini/live
- Protocol: standard WebSocket; send plain text messages, receive plain text messages.
- Minimal client example (browser):
```js
const ws = new WebSocket('ws://localhost:8000/ws/gemini/live');
ws.onmessage = (e) => onChunk(e.data);
ws.onopen = () => ws.send('Hello Gemini');
// ws.close() to end
```

## Legacy: Multimodal search (placeholder data)
- Method: POST
- URL: /api/multimodal-search
- Form fields (multipart/form-data):
  - text: string (optional)
  - image: file (optional)
  - is_live: boolean (optional)
  - source: string ("home" | "stumber")
- Response: application/json with echo of query and list of sample articles.
