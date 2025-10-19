# Demo-Focused Orchestration Plan

## Overview
Simple, working demo of the rabbit hole search. Focus: get it working first, optimize later. No databases, no caching, just pure orchestration with Gemini's native search capabilities.

---

## 1. Core Architecture (Demo)

### Single Endpoint: `/api/rabbit-hole`

**Flow:**
```
User Query → POST /api/rabbit-hole
    ↓
Single Gemini Agent with Google Search grounding
    ↓
Returns structured JSON:
    {
      "headlines": [...],      // 7-10 different angles
      "summary": "...",         // Overall context
      "citations": [...]        // Source URLs with snippets
    }
```

**Key Features:**
- Gemini with search grounding enabled (built-in web search)
- Structured JSON output (schema-based)
- Single API call, direct response (no streaming for MVP)
- Each headline is independently clickable for drill-down

---

## 2. Structured Output Schema

### JSON Response Format
```json
{
  "query": "what's the deal with karpathy and sutton's agi",
  "summary": "2-3 sentence overview of the topic landscape",
  "headlines": [
    {
      "id": "h1",
      "title": "Karpathy's Vision: AGI Through Scaling",
      "caption": "Former OpenAI scientist believes raw compute and data are the path forward",
      "category": "Factual",
      "relevance_score": 0.95,
      "image_prompt": "Abstract visualization of neural networks scaling upward",
      "sources": ["url1", "url2"]
    },
    {
      "id": "h2", 
      "title": "Sutton's Bitter Lesson Applied to AGI",
      "caption": "Rich Sutton's famous essay suggests simple methods with compute win",
      "category": "Historical",
      "relevance_score": 0.88,
      "image_prompt": "Timeline showing compute growth over decades",
      "sources": ["url3"]
    }
  ],
  "citations": [
    {
      "url": "https://example.com/article",
      "title": "Article Title",
      "snippet": "Relevant excerpt from the source...",
      "used_in_headlines": ["h1", "h2"]
    }
  ],
  "related_queries": [
    "What is the bitter lesson in AI?",
    "Karpathy's work at OpenAI",
    "AGI timelines debate"
  ]
}
```

### Headline Categories
- **Factual**: Direct information and facts
- **Opinion**: Expert perspectives and debates
- **Historical**: Background and context
- **Future**: Predictions and implications
- **Contrarian**: Alternative viewpoints
- **Technical**: Deep technical details

---

## 3. Frontend UX (Simple Demo)

**Loading States:**
- "Searching the web..." (0-2s)
- "Organizing perspectives..." (2-5s)
- Show results with fade-in animation

**Interactivity:**
- Click headline → Expand inline with more detail
- Hover → Show source count and category
- Click citation → Open in new tab

---

## 4. Backend Implementation

### Gemini Search Grounding Setup

```python
# Enable Google Search grounding
tools = [types.Tool(google_search=types.GoogleSearch())]

config = types.GenerateContentConfig(
    tools=tools,
    response_mime_type="application/json",
    response_schema=HeadlinesSchema
)
```

### Prompt Engineering

**System Prompt:**
```
You are a curiosity-driven research assistant that creates "rabbit hole" 
explorations. Given a user query, use Google Search to find diverse 
perspectives and organize them into 7-10 compelling headlines.

Each headline should:
1. Represent a unique angle or perspective
2. Be intriguing but accurate
3. Include a 2-line caption
4. Be categorized appropriately
5. Reference specific sources

Output a structured response with headlines, summary, and citations.
```

### Error Handling
- Timeout after 15 seconds
- Return partial results if available
- Log failures for debugging
- Friendly error messages to user

---

## 5. Article Drill-Down (Second Endpoint)

### `/api/rabbit-hole/expand`

**When user clicks a headline:**
```
POST /api/rabbit-hole/expand
Body: { "headline_id": "h1", "query": "original query" }

Returns:
{
  "article": {
    "sections": [
      {
        "type": "intro",
        "content": "Hook paragraph..."
      },
      {
        "type": "body", 
        "content": "Main content..."
      },
      {
        "type": "analysis",
        "content": "Deeper dive..."
      }
    ],
    "key_points": ["point 1", "point 2", "point 3"],
    "related_headlines": ["headline 1", "headline 2"]
  },
  "citations": [...]
}
```

**Features:**
- Deeper search on specific headline topic
- Generate cohesive article with sections
- Provide new rabbit hole directions
- Include more detailed citations

---

## 6. Visual Design Notes

**Headline Card Layout:**
```
┌─────────────────────────────────────┐
│ 🔵 Category Badge                   │
│                                     │
│ Headline Title (Bold, Large)       │
│                                     │
│ Caption text that provides context  │
│ and makes you want to click...     │
│                                     │
│ 🔗 3 sources • Relevance: 95%      │
└─────────────────────────────────────┘
```

**Color Coding by Category:**
- Factual: Blue
- Opinion: Purple  
- Historical: Brown
- Future: Green
- Contrarian: Red
- Technical: Gray

**Loading Animation:**
- Shimmer effect on empty cards
- Headline cards appear one-by-one (staggered)
- Smooth expand/collapse for drill-down

---

## 7. Implementation Steps (Priority Order)

### Step 1: Basic Endpoint ✓
```python
@app.post("/api/rabbit-hole")
async def rabbit_hole(query: str = Body(..., embed=True)):
    # Call Gemini with search grounding
    # Return structured JSON
    pass
```

### Step 2: Structured Output Schema
```python
class Headline(BaseModel):
    id: str
    title: str
    caption: str
    category: str
    relevance_score: float
    image_prompt: str
    sources: List[str]

class RabbitHoleResponse(BaseModel):
    query: str
    summary: str
    headlines: List[Headline]
    citations: List[Citation]
    related_queries: List[str]
```

### Step 3: Gemini Integration
- Enable Google Search tool
- Set JSON response mode with schema
- Handle timeout/errors
- Parse and return response

### Step 4: Frontend Integration
- Create UI components for headline cards
- Implement loading states
- Add click handlers for expansion
- Style with category colors

### Step 5: Article Expansion
- Create `/api/rabbit-hole/expand` endpoint
- Deeper search on clicked headline
- Generate full article content
- Return structured sections

---

## 8. Testing the Endpoint

### Manual Testing with cURL

```bash
# Test the rabbit hole endpoint
curl -X POST http://localhost:8000/api/rabbit-hole \
  -H "Content-Type: application/json" \
  -d '{"query": "what is the deal with karpathy and sutton agi"}'

# Expected response: Full JSON with headlines, summary, citations
```

### Frontend Integration

```javascript
const response = await fetch('/api/rabbit-hole', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userQuery })
});

const data = await response.json();
// data.headlines - array of headline objects
// data.summary - overview text
// data.citations - source references
```

---

## 9. Demo Focus Checklist

**Must Have:**
- [ ] `/api/rabbit-hole` endpoint working
- [ ] Gemini with Google Search enabled
- [ ] Structured JSON response
- [ ] 7-10 headlines with different angles
- [ ] Citations with URLs
- [ ] Frontend displaying headlines in grid
- [ ] Loading state while API is working

**Nice to Have:**
- [ ] Article expansion on click
- [ ] Image generation for headlines
- [ ] Category color coding
- [ ] Related queries suggestions
- [ ] Error handling UI

**Later:**
- [ ] Caching layer
- [ ] Streaming responses
- [ ] Depth visualization
- [ ] User history tracking
