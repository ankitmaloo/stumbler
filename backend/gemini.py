import os
from typing import Iterator, Optional
from google import genai
from google.genai import types


def stream_generate(
    prompt: str,
    model: Optional[str] = None,
    thinking_budget: int = -1,
    api_key: Optional[str] = None,
) -> Iterator[str]:
    client = genai.Client(api_key=api_key or os.environ.get("GEMINI_API_KEY"))
    selected_model = model or os.environ.get("GEMINI_MODEL", "gemini-2.5-pro")

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)],
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=thinking_budget)
    )

    for chunk in client.models.generate_content_stream(
        model=selected_model, contents=contents, config=generate_content_config
    ):
        if getattr(chunk, "text", None):
            yield chunk.text
