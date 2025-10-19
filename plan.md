# Plan: Progressive-Disclosure “Rabbit Hole” via WebSocket (JSON-or-XML-in-Markdown)

## Goal
- For any user query (text and/or image), the backend researches using a subagent and returns related headline/caption pairs.
- The model must output ONLY a single fenced Markdown code block containing either:
  - JSON: `{"headlines":[{"title":"...","caption":"..."}]}`
  - OR XML: `<headlines><item><title>...</title><caption>...</caption></item>...</headlines>`
- Backend parses that code block (JSON first; XML fallback) and emits each item over WebSocket as `{ "type":"headline", "title":"...", "caption":"..." }`.
- UI renders exactly what it receives; no default items, no client-side JSON parsing.

## Data Contracts

### Client → Server (WebSocket)
- URL: `ws://localhost:8000/ws/search`
- On open, send a single JSON message:

```json
{
  "text": "user query",
  "image": "<base64 string or null>",
  "source": "home"
}
```

### Server → Client (Streamed Events)
- headline: `{"type":"headline","title":"...","caption":"..."}`
- summary chunk (optional): `{"type":"summary_chunk","text":"..."}`
- image (optional): `{"type":"image","path":"<file path>","mime_type":"image/png"}`
- done: `{"type":"done"}`

## Exact Prompt (copy/paste verbatim)

Use this prompt inside the backend when constructing the model request (with or without image). If an image is present, change the first line to “User query (with image): "{QUERY_HERE}"”.

```
You are a curiosity-driven research assistant using progressive disclosure: first research, then surface related angles as concise headline/caption pairs.

User query: "{QUERY_HERE}"

Instructions:
- Use the subagent tool to search and gather key facts and perspectives related to the query (via Google Search).
- Then synthesize EXACTLY 8–12 related items as concise, compelling headline/caption pairs.
- Schema (strict): title (<=10 words), caption (<=20 words). Use keys exactly: "title", "caption".

Output (critical):
1) Preferred: Return ONLY a single fenced Markdown code block with language `json` containing:
```json
{
  "headlines": [
    {"title": "...", "caption": "..."}
  ]
}
```
2) If valid JSON is difficult, return ONLY a single fenced Markdown code block with language `xml` containing:
```xml
<headlines>
  <item>
    <title>...</title>
    <caption>...</caption>
  </item>
</headlines>
```

No explanations or extra text outside the code block.
```

## Backend Changes

1) Update prompt in `backend/rabbit_hole.py` (inside `generate_rabbit_hole`):
- Replace the existing prompt strings with “Exact Prompt” above for both text-only and image cases.
- Keep using the declared subagent tool (Google Search via genai) and function-call flow.

2) Add robust code-block extraction and parsing in `generate_rabbit_hole` after `final_text` is received:

```python
import re, json
import xml.etree.ElementTree as ET

def parse_headlines_from_text(text: str) -> dict:
    # Prefer fenced code block (json or xml)
    m = re.search(r"```(?:json|xml)?\s*\n([\s\S]*?)\n```", text)
    if m:
        fenced = m.group(1).strip()
        # Try JSON
        if fenced.lstrip().startswith('{'):
            try:
                return json.loads(fenced)
            except json.JSONDecodeError:
                fixed = re.sub(r",(\s*[}\]])", r"\1", fenced)
                try:
                    return json.loads(fixed)
                except Exception:
                    pass
        # Try XML
        if fenced.lstrip().startswith('<'):
            try:
                root = ET.fromstring(fenced)
                items = []
                for node in root.findall('.//item'):
                    t = (node.findtext('title') or '').strip()
                    c = (node.findtext('caption') or '').strip()
                    if t and c:
                        items.append({"title": t, "caption": c})
                if not items:
                    for node in root.findall('.//headline'):
                        t = (node.findtext('title') or '').strip()
                        c = (node.findtext('caption') or '').strip()
                        if t and c:
                            items.append({"title": t, "caption": c})
                return {"headlines": items}
            except Exception:
                pass
    # Raw JSON fallback anywhere in text
    j = re.search(r"\{[\s\S]*?\"headlines\"[\s\S]*?\][\s\S]*?\}", text)
    if j:
        js = j.group(0)
        try:
            return json.loads(js)
        except json.JSONDecodeError:
            fixed = re.sub(r",(\s*[}\]])", r"\1", js)
            try:
                return json.loads(fixed)
            except Exception:
                pass
    return {"headlines": []}
```

- Use the parser result to build the function return value:
  - `{"query": query, "headlines": result.get("headlines", []), "citations": citations}`

3) WebSocket `/ws/search` (in `backend/main.py`):
- Always run `rabbit_hole_agent()` regardless of query text.
- For each parsed item, emit:
  - `await q.put({"type": "headline", "title": item["title"], "caption": item["caption"]})`
- When all tasks finish, emit `{"type": "done"}`.

4) Optional: Align HTTP streaming `/api/search/start` to always start `rabbit_hole_agent()` as well (remove any conditional “is_rabbit_hole” gating), for parity.

5) Keep `summary_agent` for natural-language text (no JSON expected); client should not parse JSON from summary.

## Frontend Changes

1) `frontend/src/pages/rabbit.tsx`:
- Use only `webSocketSearch` to receive streamed events.
- Do not parse JSON from `summary`; just append `summary_chunk` text.
- Render headlines solely from incoming `headline` events; no defaults.

2) `HeroSection` and `ScrollingCarousel`:
- Render nothing if `headlines.length === 0`.

3) `MultimodalInputBox`:
- Navigate to `/rabbit` with `searchParams` in state; do not embed prompt logic on the client.

## Testing

1) Run services:
- Backend: `uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload`
- Frontend: `cd frontend && npm run dev`

2) Manual test:
- Open `http://localhost:5173`
- Enter any query; click Discover.
- Verify: WebSocket connects to `ws://localhost:8000/ws/search`, UI streams and renders only backend `headline` events, then `done`.

3) Programmatic test:
- `python3 backend/test_websocket.py` to verify multiple `headline` frames and final `done`.

## Acceptance Criteria
- Any query yields 8–12 headline/caption items produced via subagent research.
- Model outputs a single Markdown code block (JSON preferred; XML fallback) with the specified schema.
- Backend parses JSON first, then XML; converts to `headline` events.
- UI displays only backend-delivered headlines; no defaults; no client-side JSON parsing.
- Works via WebSocket without HTTP fallback paths.
