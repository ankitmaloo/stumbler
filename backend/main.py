from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
