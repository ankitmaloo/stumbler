# Testing Guide - Source Tag Implementation

## Quick Summary
✅ **COMPLETE** - The same API endpoint is used by both Home and Stumber pages with proper source tagging.

---

## What Was Implemented

### 1. Source Tags
- **Home Page** → sends `source: "home"`
- **Stumber Page** → sends `source: "stumber"`
- Backend receives and processes the tag differently

### 2. API Flow Diagram

```
┌─────────────────┐                    ┌──────────────────┐
│   Home Page     │                    │  Stumber Page    │
│                 │                    │                  │
│ MultimodalInput │                    │ MultimodalInput  │
│ source="home"   │                    │ source="stumber" │
└────────┬────────┘                    └────────┬─────────┘
         │                                      │
         │ POST /api/multimodal-search         │
         │ FormData: source="home"              │ FormData: source="stumber"
         │                                      │
         └──────────────┬───────────────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │   Backend API           │
            │   (FastAPI)             │
            │                         │
            │  @app.post("/api/       │
            │   multimodal-search")   │
            │                         │
            │  Receives: source param │
            └────────────┬────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Process Based on    │
              │  Source Tag          │
              │                      │
              │  if source=="home":  │
              │    → Home logic      │
              │  elif source=="stumber":│
              │    → Stumber logic   │
              └──────────────────────┘
```

---

## How to Test

### Test 1: Home Page Search

**Steps:**
1. Open browser to `http://localhost:5173/`
2. Open DevTools (F12) → Network tab
3. Enter a search query in the MultimodalInputBox
4. Click "Discover"

**Expected Result:**
```
POST http://localhost:8000/api/multimodal-search

Request Payload (FormData):
  text: "your search query"
  is_live: false
  source: "home"  ← Should see "home"
```

**Backend Console Output:**
```
INFO:     127.0.0.1:xxxxx - "POST /api/multimodal-search HTTP/1.1" 200 OK
Message: "Processing from home page"
```

---

### Test 2: Stumber Page Search

**Steps:**
1. Navigate to `http://localhost:5173/stumber/1` (or any ID)
2. Open DevTools (F12) → Network tab
3. Scroll down to "Discover More" section (right sidebar)
4. Enter a search query in the MultimodalInputBox
5. Click "Discover"

**Expected Result:**
```
POST http://localhost:8000/api/multimodal-search

Request Payload (FormData):
  text: "your search query"
  is_live: false
  source: "stumber"  ← Should see "stumber"
```

**Backend Console Output:**
```
INFO:     127.0.0.1:xxxxx - "POST /api/multimodal-search HTTP/1.1" 200 OK
Message: "Processing from stumber page"
```

---

### Test 3: Verify Response

**Expected Response Structure:**
```json
{
  "success": true,
  "query": {
    "text": "your search query",
    "has_image": false,
    "is_live": false,
    "source": "stumber"  ← Source is echoed back
  },
  "message": "Processing from stumber page",  ← Different based on source
  "articles": [...]
}
```

---

## Visual Testing Checklist

### ✅ Home Page
- [ ] Navigate to home page
- [ ] Find the large MultimodalInputBox
- [ ] Enter text query
- [ ] Check Network tab → Request has `source: "home"`
- [ ] Check Response → Message says "Processing from home page"

### ✅ Stumber Page  
- [ ] Navigate to stumber page
- [ ] Find "Discover More" section (right sidebar)
- [ ] Find the smaller MultimodalInputBox (with 90% scale)
- [ ] Enter text query
- [ ] Check Network tab → Request has `source: "stumber"`
- [ ] Check Response → Message says "Processing from stumber page"

---

## Troubleshooting

### Services Not Running?

**Check Backend:**
```bash
# Terminal 1
cd backend
source .venv/bin/activate
python main.py
# Should see: Uvicorn running on http://0.0.0.0:8000
```

**Check Frontend:**
```bash
# Terminal 2
cd frontend
npm run dev
# Should see: Local: http://localhost:5173/
```

### Can't See Network Requests?

1. Open DevTools (F12)
2. Go to Network tab
3. Clear the log
4. Submit a search
5. Look for `multimodal-search` request
6. Click on it → Preview/Payload tabs

### Source Tag Not Appearing?

**Check in DevTools Console:**
```javascript
// Should NOT see any errors in console
// If you see CORS errors, backend needs to be running
```

---

## Implementation Summary

| File | Line | What It Does |
|------|------|--------------|
| `frontend/src/components/MultimodalInputBox.tsx` | 62 | Sends source tag in FormData |
| `frontend/src/pages/HomePage.tsx` | ~200 | Uses `source="home"` |
| `frontend/src/pages/stumber.tsx` | 177 | Uses `source="stumber"` |
| `backend/main.py` | 245 | Receives source parameter |
| `backend/main.py` | 270-275 | Processes based on source |

---

## Next Steps for Backend Logic

Currently, the backend echoes the source back. You can now implement custom logic:

```python
@app.post("/api/multimodal-search")
async def multimodal_search(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    is_live: Optional[bool] = Form(False),
    source: Optional[str] = Form("home")
):
    if source == "stumber":
        # Context-aware search based on current article
        # Filter by current category
        # Prioritize related content
        articles = get_related_articles(text, current_context)
        
    elif source == "home":
        # Broader search
        # Show trending content
        # Include featured articles
        articles = get_trending_articles(text)
    
    return {
        "success": True,
        "articles": articles,
        "source": source
    }
```

---

## ✅ READY FOR YOUR TESTING

Both services are running:
- **Backend:** http://localhost:8000 (health check: OK)
- **Frontend:** http://localhost:5173

Follow the testing steps above to verify the implementation!
