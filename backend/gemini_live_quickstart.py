"""
Minimal Live API client aligned with the Google Gemini LiveAPI quickstart.

Text-only bidirectional stream: reads user input from stdin and prints model
responses as they stream in. Quit with 'q'.

Env:
- GEMINI_API_KEY
- GEMINI_LIVE_MODEL (optional) default: models/gemini-2.5-flash
"""

import os
import asyncio
from google import genai
from google.genai import types


MODEL = os.environ.get("GEMINI_LIVE_MODEL", "models/gemini-2.5-flash")


async def run_quickstart() -> None:
  client = genai.Client(
      http_options={"api_version": "v1beta"},
      api_key=os.environ.get("GEMINI_API_KEY"),
  )

  config = types.LiveConnectConfig(
      response_modalities=["TEXT"],
      media_resolution="MEDIA_RESOLUTION_MEDIUM",
  )

  async with client.aio.live.connect(model=MODEL, config=config) as session:
    async def recv_loop():
      while True:
        turn = session.receive()
        async for response in turn:
          if response.text:
            print(response.text, end="", flush=True)

    async def send_loop():
      while True:
        msg = await asyncio.to_thread(input, "message > ")
        if msg.strip().lower() == "q":
          break
        await session.send(input=msg or ".", end_of_turn=True)

    async with asyncio.TaskGroup() as tg:
      s = tg.create_task(send_loop())
      tg.create_task(recv_loop())
      await s
      raise asyncio.CancelledError()


if __name__ == "__main__":
  try:
    asyncio.run(run_quickstart())
  except KeyboardInterrupt:
    pass
