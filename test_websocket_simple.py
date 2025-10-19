#!/usr/bin/env python3
"""
Simple WebSocket test - connects to /ws/search and prints all events
Run this AFTER starting the backend server
"""

import asyncio
import websockets
import json

async def test_websocket():
    uri = "ws://localhost:8000/ws/search"
    
    print("=" * 80)
    print("WEBSOCKET TEST - Connecting to backend")
    print("=" * 80)
    print(f"URI: {uri}")
    print()
    
    try:
        async with websockets.connect(uri) as websocket:
            print("✅ Connected!")
            
            # Send test query
            query = {
                "text": "artificial intelligence breakthroughs",
                "image": None,
                "source": "home"
            }
            
            print(f"\n📤 Sending query: {query['text']}")
            await websocket.send(json.dumps(query))
            print("✅ Query sent, waiting for responses...")
            print("-" * 80)
            
            headline_count = 0
            
            # Receive messages
            async for message in websocket:
                try:
                    data = json.loads(message)
                    event_type = data.get('type', 'unknown')
                    
                    if event_type == 'headline':
                        headline_count += 1
                        print(f"\n📰 HEADLINE #{headline_count}")
                        print(f"   Title: {data.get('title', 'N/A')}")
                        print(f"   Caption: {data.get('caption', 'N/A')}")
                    elif event_type == 'done':
                        print(f"\n✅ DONE - Received {headline_count} headlines total")
                        break
                    else:
                        print(f"\n📨 Event: {event_type}")
                        if len(str(data)) < 200:
                            print(f"   Data: {data}")
                        
                except json.JSONDecodeError:
                    print(f"⚠️  Non-JSON message: {message[:100]}")
            
            print("\n" + "=" * 80)
            print("TEST COMPLETE")
            print("=" * 80)
            print(f"Total headlines received: {headline_count}")
            
            if headline_count >= 8:
                print("✅ SUCCESS - Got expected number of headlines (8-12)")
                return True
            else:
                print(f"⚠️  WARNING - Expected 8-12 headlines, got {headline_count}")
                return False
                
    except ConnectionRefusedError:
        print("\n❌ ERROR: Could not connect to backend")
        print("Make sure the backend is running:")
        print("  uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload")
        return False
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("\n🚀 Starting WebSocket test...")
    print("(Make sure backend is running on port 8000)\n")
    
    success = asyncio.run(test_websocket())
    
    if success:
        print("\n🎉 TEST PASSED!")
        exit(0)
    else:
        print("\n❌ TEST FAILED or INCOMPLETE")
        exit(1)
