from fastapi import FastAPI, File, UploadFile, Form, Body, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from typing import List, Optional, Dict
import base64
import io
import os
import mimetypes
import asyncio
import json
import uuid

from google import genai
from google.genai import types

from gemini import stream_generate

app = FastAPI()

# Add CORS middleware to allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Article model
class Article:
    def __init__(
        self,
        id: str,
        title: str,
        author: str,
        date: str,
        type: str = "article",
        description: Optional[str] = None,
        image: Optional[str] = None,
        comments: Optional[int] = None,
        likes: Optional[int] = None,
        emojis: Optional[List[str]] = None,
        hasVideo: bool = False,
    ):
        self.id = id
        self.title = title
        self.author = author
        self.date = date
        self.type = type
        self.description = description
        self.image = image
        self.comments = comments
        self.likes = likes
        self.emojis = emojis or []
        self.hasVideo = hasVideo

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "date": self.date,
            "type": self.type,
            "description": self.description,
            "image": self.image,
            "comments": self.comments,
            "likes": self.likes,
            "emojis": self.emojis,
            "hasVideo": self.hasVideo,
        }


# Sample articles data
ARTICLES = [
    # LEFT SIDEBAR
    Article(
        id="1",
        type="simple",
        title="Gemini 3.0 Pro: The Next Leap in AI Reasoning",
        author="TECH INNOVATORS",
        date="10.18.25",
        comments=13,
        likes=74,
    ),
    Article(
        id="2",
        type="article",
        title="How Gemini Transformed Our Development Workflow",
        author="SARAH CHEN",
        date="10.13.25",
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
        comments=123,
        likes=13,
        emojis=["🔥", "🙏"],
    ),
    Article(
        id="3",
        type="simple",
        title="Breaking Down Gemini Pro's Context Window",
        description="A deep dive into how the expanded context window changes everything for long-form reasoning.",
        author="ALEX MARTINEZ",
        date="10.14.25",
        comments=23,
        likes=74,
    ),
    # RIGHT SIDEBAR
    Article(
        id="4",
        type="article",
        title="Gemini 3.0's Multimodal Capabilities Explained",
        description="From text to image to video, Gemini 3.0 Pro processes it all. Here's how developers are leveraging this power in production.",
        author="JORDAN WILLIAMS",
        date="10.18.25",
        image="https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&h=200&fit=crop",
        comments=5,
        likes=34,
    ),
    Article(
        id="5",
        type="article",
        title="The Future of AI: Gemini Pro vs GPT-4 Comparison",
        description="We tested both models on reasoning, speed, and accuracy. The results surprised us in unexpected ways.",
        author="MAYA PATEL",
        date="10.18.25",
        image="https://images.unsplash.com/photo-1676277791608-ac54525aa07e?w=400&h=200&fit=crop",
        comments=18,
        likes=27,
        hasVideo=True,
    ),
    # CAROUSEL
    Article(
        id="6",
        type="article",
        title="Building Scalable AI Apps with Gemini 3.0",
        author="DEV WEEKLY",
        date="10.20.25",
    ),
    Article(
        id="7",
        type="article",
        title="AI Safety and Ethics in the Gemini Era",
        author="ETHICS IN AI",
        date="10.10.25",
    ),
    Article(
        id="8",
        type="article",
        title="Gemini Pro API: Best Practices Guide",
        author="CODE MASTERS",
        date="10.18.25",
    ),
    Article(
        id="9",
        type="article",
        title="Real-World Use Cases: Gemini in Production",
        author="TECH INSIGHTS",
        date="10.17.25",
    ),
    Article(
        id="10",
        type="article",
        title="The Cost of AI: Gemini vs Alternatives",
        author="AI ECONOMICS",
        date="10.16.25",
    ),
    # BOTTOM GRID
    Article(
        id="11",
        type="article",
        title="How AI Models Think: Inside Gemini's Neural Architecture",
        description="A visual journey through the layers and mechanisms powering Google's most advanced AI.",
        author="NEURAL NETWORKS TODAY",
        date="10.16.25",
        image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
        hasVideo=True,
    ),
    Article(
        id="12",
        type="article",
        title="Gemini's Code Generation: Better Than Copilot?",
        author="DEV TOOLS WEEKLY",
        date="10.16.25",
    ),
    Article(
        id="13",
        type="article",
        title="AI Weekly Roundup: Latest Gemini Updates",
        author="AI DIGEST",
        date="10.12.25",
    ),
    Article(
        id="14",
        type="article",
        title="Fine-Tuning Gemini: A Complete Guide",
        author="ML ENGINEERS",
        date="10.18.25",
    ),
    Article(
        id="15",
        type="article",
        title="From Prototype to Production: Gemini Success Stories",
        description="Companies share how they scaled from MVP to millions of users using Gemini 3.0 Pro API.",
        author="STARTUP STORIES",
        date="10.18.25",
        image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        comments=84,
        likes=71,
    ),
    Article(
        id="16",
        type="simple",
        title="The AI Bubble: Is Gemini Overhyped?",
        description="Critics argue the latest AI models promise more than they deliver. We investigate the claims.",
        author="TECH SKEPTICS",
        date="10.15.25",
        comments=179,
        likes=85,
    ),
    # BOTTOM LARGE SECTION
    Article(
        id="17",
        type="article",
        title="Inside Google's Gemini: The AI Revolution",
        description="From research lab to global deployment, how Google built the most powerful AI model yet and what it means for the future.",
        author="TECH DEEP DIVE",
        date="10.18.25",
        image="https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=600&h=300&fit=crop",
        comments=375,
        likes=377,
    ),
    Article(
        id="18",
        type="simple",
        title="Prompt Engineering: Advanced Techniques for Gemini",
        description="Master the art of crafting prompts that get the best results from Gemini 3.0 Pro.",
        author="PROMPT ACADEMY",
        date="10.15.25",
    ),
    Article(
        id="19",
        type="simple",
        title="The Future is Multimodal: AI Beyond Text",
        description="How Gemini's ability to understand images, video, and code is changing everything.",
        author="AI FUTURES",
        date="10.14.25",
    ),
]


@app.get("/")
def read_root():
    return {"message": "Welcome to Stumbler Backend"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/articles")
def get_articles():
    """Get all articles"""
    return [article.to_dict() for article in ARTICLES]


@app.post("/api/multimodal-search")
async def multimodal_search(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    is_live: Optional[bool] = Form(False),
    source: Optional[str] = Form("home")
):
    """
    Process multimodal input (text and/or image) and return articles
    
    Args:
        text: Text query input
        image: Image file upload
        is_live: Whether live mode is enabled
        source: Source of the request (e.g., "home", "stumber")
    """
    # Process the input (for now, just return the articles)
    # In a real implementation, you would process the image and text
    # to find relevant content
    
    result = {
        "success": True,
        "query": {
            "text": text,
            "has_image": image is not None,
            "is_live": is_live,
            "source": source
        },
        "articles": [article.to_dict() for article in ARTICLES]
    }
    
    # If image was uploaded, you could process it here
    if image:
        # Read image content (optional, for future processing)
        image_content = await image.read()
        result["query"]["image_size"] = len(image_content)
        result["query"]["image_type"] = image.content_type
    
    # Different logic based on source
    if source == "stumber":
        # In the future, you could filter or sort articles differently for stumber page
        result["message"] = "Processing from stumber page"
    elif source == "home":
        result["message"] = "Processing from home page"
    
    return result


# Gemini text streaming endpoint
@app.post("/api/gemini/text-stream")
def gemini_text_stream(text: str = Body(..., embed=True)):
    def generator():
        for chunk in stream_generate(text):
            yield chunk

    return StreamingResponse(generator(), media_type="text/plain")


# Helpers for image generation
GENERATED_DIR = os.path.join(os.path.dirname(__file__), "generated")


def save_binary_file(file_path: str, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    if isinstance(data, (bytes, bytearray)):
        buf = data
    elif isinstance(data, str):
        try:
            buf = base64.b64decode(data)
        except Exception:
            buf = data.encode()
    else:
        buf = bytes(data)
    with open(file_path, "wb") as f:
        f.write(buf)


def generate_images(prompt: str):
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    model = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
    contents = [
        types.Content(role="user", parts=[types.Part.from_text(text=prompt)]),
    ]
    cfg = types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"])

    out = {"text": "", "images": []}
    file_index = 0

    for chunk in client.models.generate_content_stream(
        model=model, contents=contents, config=cfg
    ):
        has_inline = False
        if (
            getattr(chunk, "candidates", None)
            and chunk.candidates[0].content
            and getattr(chunk.candidates[0].content, "parts", None)
        ):
            for part in chunk.candidates[0].content.parts:
                inline = getattr(part, "inline_data", None)
                if inline and getattr(inline, "data", None):
                    file_name = f"image_{file_index}"
                    file_index += 1
                    file_ext = mimetypes.guess_extension(inline.mime_type) or ".bin"
                    file_path = os.path.join(GENERATED_DIR, f"{file_name}{file_ext}")
                    save_binary_file(file_path, inline.data)
                    out["images"].append({
                        "path": file_path,
                        "mime_type": inline.mime_type,
                    })
                    has_inline = True
        if not has_inline and getattr(chunk, "text", None):
            out["text"] += chunk.text

    return out


# Gemini image generation endpoint (returns JSON with saved image paths and text)
@app.post("/api/gemini/image-generate")
def gemini_image_generate(text: str = Body(..., embed=True)):
    result = generate_images(text)
    return JSONResponse(result)


# Live websocket (basic text relay to Gemini Live API)
@app.websocket("/ws/gemini/live")
async def gemini_live_ws(websocket: WebSocket):
    await websocket.accept()
    client = genai.Client(
        http_options={"api_version": "v1beta"},
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    config = types.LiveConnectConfig(
        response_modalities=["TEXT"],
        media_resolution="MEDIA_RESOLUTION_MEDIUM",
    )

    model = os.environ.get(
        "GEMINI_LIVE_MODEL",
        "models/gemini-2.5-flash-native-audio-preview-09-2025",
    )

    async def ws_to_model(session):
        try:
            while True:
                msg = await websocket.receive_text()
                await session.send(input=msg or ".", end_of_turn=True)
        except WebSocketDisconnect:
            pass

    async def model_to_ws(session):
        try:
            while True:
                turn = session.receive()
                async for response in turn:
                    if text := response.text:
                        await websocket.send_text(text)
        except WebSocketDisconnect:
            pass

    try:
        async with (
            client.aio.live.connect(model=model, config=config) as session,
            asyncio.TaskGroup() as tg,
        ):
            tg.create_task(ws_to_model(session))
            tg.create_task(model_to_ws(session))
    except Exception:
        # On any error, ensure the websocket is closed
        try:
            await websocket.close()
        except Exception:
            pass


# Orchestrated search (subagents + streaming)
JOBS: Dict[str, asyncio.Queue] = {}


async def orchestrate_job(job_id: str, text: Optional[str], image: Optional[UploadFile], source: Optional[str], queue: asyncio.Queue):
    loop = asyncio.get_running_loop()

    async def articles_agent():
        items = [a.to_dict() for a in ARTICLES]
        step = 5
        for i in range(0, len(items), step):
            await asyncio.sleep(0.15)
            batch = items[i:i+step]
            await queue.put({"type": "articles_batch", "items": batch})

    async def summary_agent():
        prompt = text or "Discover something interesting"

        def run_summary():
            for chunk in stream_generate(prompt):
                loop.call_soon_threadsafe(queue.put_nowait, {"type": "summary_chunk", "text": chunk})

        await asyncio.to_thread(run_summary)
        await queue.put({"type": "summary_done"})

    async def image_agent():
        prompt = text or "Generate a fitting visual"
        try:
            result = await asyncio.to_thread(generate_images, prompt)
            for img in result.get("images", []):
                await queue.put({"type": "image", **img})
            if result.get("text"):
                await queue.put({"type": "image_text", "text": result["text"]})
        except Exception:
            await queue.put({"type": "image_error"})

    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(articles_agent())
            tg.create_task(summary_agent())
            tg.create_task(image_agent())
    finally:
        await queue.put({"type": "done"})


@app.post("/api/search/start")
async def search_start(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    is_live: Optional[bool] = Form(False),
    source: Optional[str] = Form("home"),
):
    job_id = uuid.uuid4().hex
    q: asyncio.Queue = asyncio.Queue()
    JOBS[job_id] = q
    asyncio.create_task(orchestrate_job(job_id, text, image, source, q))
    return {"job_id": job_id}


@app.get("/api/search/stream")
async def search_stream(job: str):
    q = JOBS.get(job)
    if not q:
        raise HTTPException(status_code=404, detail="job not found")

    async def gen():
        try:
            while True:
                evt = await q.get()
                yield json.dumps(evt) + "\n"
                if evt.get("type") == "done":
                    break
        finally:
            JOBS.pop(job, None)

    return StreamingResponse(gen(), media_type="text/plain")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
