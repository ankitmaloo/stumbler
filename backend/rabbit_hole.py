"""
Rabbit hole search endpoint with Gemini Search grounding.
Generates headlines with captions from user queries.
"""
import os
import re
import json
import xml.etree.ElementTree as ET
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.0-flash-exp")

# Google Search grounding tool
grounding_tool = types.Tool(google_search=types.GoogleSearch())


class Headline(BaseModel):
    """A single headline with caption"""
    title: str
    caption: str


class RabbitHoleResponse(BaseModel):
    """Response from rabbit hole search"""
    query: str
    headlines: List[Headline]
    citations: Optional[List[Dict[str, Any]]] = None


def subagent(query: str) -> str:
    """
    Subagent which searches using Google Search and returns everything to main agent.
    This is called as a tool by the main agent.
    
    Args:
        query: Research query from main agent
    
    Returns:
        Research findings as text
    """
    client = genai.Client(api_key=API_KEY)
    
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=query)],
        ),
    ]
    
    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=-1),
        tools=[grounding_tool]
    )
    
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=generate_content_config
    )
    
    return response.text


def extract_citations(response) -> List[Dict[str, Any]]:
    """Extract citations from grounding metadata"""
    citations = []
    
    if not hasattr(response, 'candidates') or not response.candidates:
        return citations
    
    candidate = response.candidates[0]
    if not hasattr(candidate, 'grounding_metadata') or not candidate.grounding_metadata:
        return citations
    
    metadata = candidate.grounding_metadata
    
    # Extract grounding chunks (sources)
    if hasattr(metadata, 'grounding_chunks') and metadata.grounding_chunks:
        for chunk in metadata.grounding_chunks:
            if hasattr(chunk, 'web') and chunk.web:
                citations.append({
                    'url': chunk.web.uri if hasattr(chunk.web, 'uri') else '',
                    'title': chunk.web.title if hasattr(chunk.web, 'title') else ''
                })
    
    return citations


def parse_headlines_from_text(text: str) -> dict:
    """
    Parse headlines from model response.
    Expects markdown code block with JSON, strips it and parses.
    Tries: 1) Fenced JSON code block, 2) Fenced XML, 3) Raw JSON fallback
    """
    print(f"[parse_headlines] Parsing text (first 300 chars): {text[:300]}")
    
    # Step 1: Look for markdown fenced code block with json
    m = re.search(r"```(?:json)?\s*\n([\s\S]*?)\n```", text)
    if m:
        fenced = m.group(1).strip()
        print(f"[parse_headlines] Found fenced code block (first 200 chars): {fenced[:200]}")
        
        # Try to parse as JSON
        if fenced.lstrip().startswith('{'):
            try:
                parsed = json.loads(fenced)
                print(f"[parse_headlines] Successfully parsed JSON from fenced block: {len(parsed.get('headlines', []))} headlines")
                return parsed
            except json.JSONDecodeError as e:
                print(f"[parse_headlines] JSON parse error: {e}, trying to fix trailing commas...")
                # Fix common issues like trailing commas
                fixed = re.sub(r",(\s*[}\]])", r"\1", fenced)
                try:
                    parsed = json.loads(fixed)
                    print(f"[parse_headlines] Successfully parsed fixed JSON: {len(parsed.get('headlines', []))} headlines")
                    return parsed
                except Exception as e2:
                    print(f"[parse_headlines] Fixed JSON also failed: {e2}")
        
        # Try XML if it looks like XML
        if fenced.lstrip().startswith('<'):
            print(f"[parse_headlines] Attempting XML parse...")
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
                print(f"[parse_headlines] Successfully parsed XML: {len(items)} headlines")
                return {"headlines": items}
            except Exception as e:
                print(f"[parse_headlines] XML parse failed: {e}")
    
    # Step 2: Raw JSON fallback - look for JSON anywhere in text
    print(f"[parse_headlines] No fenced block found, trying raw JSON extraction...")
    j = re.search(r"\{[\s\S]*?\"headlines\"[\s\S]*?\][\s\S]*?\}", text)
    if j:
        js = j.group(0)
        print(f"[parse_headlines] Found raw JSON (first 200 chars): {js[:200]}")
        try:
            parsed = json.loads(js)
            print(f"[parse_headlines] Successfully parsed raw JSON: {len(parsed.get('headlines', []))} headlines")
            return parsed
        except json.JSONDecodeError:
            fixed = re.sub(r",(\s*[}\]])", r"\1", js)
            try:
                parsed = json.loads(fixed)
                print(f"[parse_headlines] Successfully parsed fixed raw JSON: {len(parsed.get('headlines', []))} headlines")
                return parsed
            except Exception as e:
                print(f"[parse_headlines] Raw JSON parse failed: {e}")
    
    print(f"[parse_headlines] No valid JSON found, returning empty headlines")
    return {"headlines": []}


def generate_rabbit_hole(query: str, image_data: Optional[bytes] = None, api_key: Optional[str] = None) -> dict:
    """
    Main agent that orchestrates the rabbit hole generation.
    Uses subagent as a tool for research.
    
    Args:
        query: User's search query
        api_key: Optional API key (defaults to env var)
    
    Returns:
        Dictionary with headlines and citations
    """
    client = genai.Client(api_key=api_key or API_KEY)
    
    # Define subagent as a callable tool for main agent
    subagent_declaration = types.FunctionDeclaration(
        name="subagent",
        description="Research subagent that uses Google Search to find information. Call this to research the user's query and gather diverse perspectives.",
        parameters={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The research query to search for"
                }
            },
            "required": ["query"]
        }
    )
    
    subagent_tool = types.Tool(function_declarations=[subagent_declaration])
    
    # Build prompt content with text and optional image
    prompt_parts = []
    
    if image_data:
        # Add image as inline data
        import base64
        image_b64 = base64.b64encode(image_data).decode('utf-8')
        prompt_parts.append(types.Part(inline_data=types.Blob(
            mime_type="image/jpeg",
            data=image_b64
        )))
        prompt_parts.append(types.Part.from_text(text=f"""You are a curiosity-driven research assistant. First use the subagent tool to research, then create headline/caption pairs.

User query (with image): "{query}"

INSTRUCTIONS:
1. Use the subagent tool to search and gather key facts (via Google Search)
2. Create EXACTLY 8-12 headline/caption pairs based on your research
3. Each headline: max 10 words, compelling and specific
4. Each caption: max 20 words, provides context

OUTPUT FORMAT (CRITICAL - FOLLOW EXACTLY):
Return your response as a JSON object wrapped in markdown code fences like this:

```json
{{
  "headlines": [
    {{"title": "First Headline Here", "caption": "First caption providing context here"}},
    {{"title": "Second Headline Here", "caption": "Second caption providing context here"}},
    {{"title": "Third Headline Here", "caption": "Third caption providing context here"}}
  ]
}}
```

IMPORTANT: 
- Return ONLY the markdown code block with json
- Use "title" and "caption" as the exact key names
- No explanations before or after the code block
- The JSON must be valid and parseable"""))
    else:
        prompt_parts.append(types.Part.from_text(text=f"""You are a curiosity-driven research assistant. First use the subagent tool to research, then create headline/caption pairs.

User query: "{query}"

INSTRUCTIONS:
1. Use the subagent tool to search and gather key facts (via Google Search)
2. Create EXACTLY 8-12 headline/caption pairs based on your research
3. Each headline: max 10 words, compelling and specific
4. Each caption: max 20 words, provides context

OUTPUT FORMAT (CRITICAL - FOLLOW EXACTLY):
Return your response as a JSON object wrapped in markdown code fences like this:

```json
{{
  "headlines": [
    {{"title": "First Headline Here", "caption": "First caption providing context here"}},
    {{"title": "Second Headline Here", "caption": "Second caption providing context here"}},
    {{"title": "Third Headline Here", "caption": "Third caption providing context here"}}
  ]
}}
```

IMPORTANT: 
- Return ONLY the markdown code block with json
- Use "title" and "caption" as the exact key names
- No explanations before or after the code block
- The JSON must be valid and parseable"""))
    
    prompt_content = types.Content(role="user", parts=prompt_parts)

    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=-1),
        tools=[subagent_tool],
    )
    
    # Initial call to main agent
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt_content,
        config=generate_content_config
    )
    
    # Handle function calls (tool use)
    citations = []
    final_text = response.text if response.text else ""
    
    if response.text:
        print(f"Main agent response: {response.text[:200]}")
    else:
        print("Main agent response: No text (likely calling function)")
    
    # Check if agent wants to call subagent
    if hasattr(response.candidates[0], 'content') and hasattr(response.candidates[0].content, 'parts'):
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'function_call') and part.function_call:
                fc = part.function_call
                if fc.name == "subagent":
                    # Execute subagent
                    research_query = fc.args.get('query', query)
                    print(f"Calling subagent with: {research_query}")
                    
                    # Call subagent
                    subagent_result = subagent(research_query)
                    print(f"Subagent result: {subagent_result[:200]}")
                    
                    # Continue conversation with function result
                    contents = [
                        prompt_content,
                        response.candidates[0].content,
                        types.Content(
                            role="user",
                            parts=[types.Part(
                                function_response=types.FunctionResponse(
                                    name="subagent",
                                    response={"result": subagent_result}
                                )
                            )]
                        )
                    ]
                    
                    # Get final response
                    final_response = client.models.generate_content(
                        model=GEMINI_MODEL,
                        contents=contents,
                        config=generate_content_config
                    )
                    
                    final_text = final_response.text
                    print(f"Final response: {final_text[:200]}")
    
    # Parse headlines using robust parser
    result = parse_headlines_from_text(final_text)
    
    return {
        "query": query,
        "headlines": result.get("headlines", []),
        "citations": citations
    }
