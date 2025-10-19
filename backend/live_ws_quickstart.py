import os
import asyncio
import base64
import json
import wave
from contextlib import contextmanager

from websockets.asyncio.client import connect


MODEL = os.environ.get("GEMINI_WS_MODEL", "models/gemini-2.0-flash-exp")
HOST = os.environ.get("GEMINI_WS_HOST", "generativelanguage.googleapis.com")
API_KEY = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("Set GOOGLE_API_KEY or GEMINI_API_KEY")

URI = f"wss://{HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key={API_KEY}"


@contextmanager
def wave_file(filename: str, channels: int = 1, rate: int = 24000, sample_width: int = 2):
    wf = wave.open(filename, "wb")
    wf.setnchannels(channels)
    wf.setsampwidth(sample_width)
    wf.setframerate(rate)
    try:
        yield wf
    finally:
        wf.close()


class AudioLoop:
    def __init__(self, tools=None):
        self.tools = tools or []
        self.ws = None
        self.index = 0

    async def run(self):
        print("Type 'q' to quit")
        async with connect(URI, additional_headers={"Content-Type": "application/json"}) as ws:
            self.ws = ws
            await self.setup()
            while True:
                if not await self.send():
                    break
                await self.recv()

    async def setup(self):
        await self.ws.send(json.dumps({
            "setup": {
                "model": MODEL,
                "tools": self.tools,
            }
        }))
        await self.ws.recv()

    async def send(self):
        text = await asyncio.to_thread(input, "message > ")
        if text.lower() == "q":
            return False
        msg = {
            "client_content": {
                "turns": [{
                    "role": "user",
                    "parts": [{"text": text}],
                }],
                "turn_complete": True,
            }
        }
        await self.ws.send(json.dumps(msg))
        return True

    async def recv(self):
        file_name = f"audio_{self.index}.wav"
        self.index += 1
        with wave_file(file_name) as wavf:
            async for raw in self.ws:
                try:
                    resp = json.loads(raw.decode())
                except Exception:
                    continue
                server_content = resp.get("serverContent")
                if not server_content:
                    break
                model_turn = server_content.get("modelTurn")
                if model_turn and model_turn.get("parts"):
                    part = model_turn["parts"][0]
                    inline = part.get("inlineData", {})
                    b64 = inline.get("data")
                    if b64:
                        pcm = base64.b64decode(b64)
                        wavf.writeframes(pcm)
                        print(".", end="", flush=True)
                if server_content.get("turnComplete"):
                    break
        print(f"\nSaved {file_name}")


async def main():
    await AudioLoop().run()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
