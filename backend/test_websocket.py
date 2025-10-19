#!/usr/bin/env python3
import asyncio
import json
import websockets
import base64
import sys

async def test_websocket():
    """Test the /ws/search WebSocket endpoint"""
    uri = "ws://localhost:8000/ws/search"
    
    try:
        print(f"Connecting to {uri}...")
        async with websockets.connect(uri) as websocket:
            # Test message 1: Just text
            test_msg_1 = {
                "text": "AI and machine learning",
                "source": "home"
            }
            print(f"\n--- Test 1: Text only ---")
            print(f"Sending: {test_msg_1}")
            await websocket.send(json.dumps(test_msg_1))
            
            # Receive results
            result_count = 0
            while True:
                response = await asyncio.wait_for(websocket.recv(), timeout=30)
                data = json.loads(response)
                result_type = data.get("type")
                print(f"[{result_type}] {data.keys()}")
                result_count += 1
                
                if result_type == "done":
                    print(f"✓ Test 1 completed with {result_count} messages")
                    break
                    
                if result_count > 100:
                    print("⚠ Too many messages, stopping...")
                    break
            
            # Test message 2: Text with placeholder image
            test_msg_2 = {
                "text": "web discovery",
                "image": None,  # No image in this test
                "source": "home"
            }
            print(f"\n--- Test 2: Another query ---")
            print(f"Sending: {test_msg_2}")
            await websocket.send(json.dumps(test_msg_2))
            
            # Receive results
            result_count = 0
            while True:
                response = await asyncio.wait_for(websocket.recv(), timeout=30)
                data = json.loads(response)
                result_type = data.get("type")
                print(f"[{result_type}] {data.keys()}")
                result_count += 1
                
                if result_type == "done":
                    print(f"✓ Test 2 completed with {result_count} messages")
                    break
                    
                if result_count > 100:
                    print("⚠ Too many messages, stopping...")
                    break
            
            print("\n✓ WebSocket tests completed successfully!")
            
    except asyncio.TimeoutError:
        print("✗ Timeout waiting for response")
        sys.exit(1)
    except ConnectionRefusedError:
        print("✗ Connection refused. Is the backend running on localhost:8000?")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_websocket())
