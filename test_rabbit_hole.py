#!/usr/bin/env python3
"""
Test script for rabbit_hole.py
Tests the headline generation and parsing
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from rabbit_hole import generate_rabbit_hole
import json


def test_rabbit_hole():
    """Test the rabbit hole generation with a simple query"""
    
    print("=" * 80)
    print("TESTING RABBIT HOLE HEADLINE GENERATION")
    print("=" * 80)
    
    test_query = "artificial intelligence breakthroughs 2025"
    
    print(f"\n📝 Query: {test_query}")
    print("\n🔄 Calling generate_rabbit_hole()...")
    print("-" * 80)
    
    try:
        result = generate_rabbit_hole(test_query)
        
        print("\n✅ SUCCESS! Got result from generate_rabbit_hole()")
        print("-" * 80)
        
        print("\n📊 RESULT STRUCTURE:")
        print(f"Type: {type(result)}")
        print(f"Keys: {result.keys() if isinstance(result, dict) else 'N/A'}")
        
        print("\n📰 HEADLINES:")
        headlines = result.get('headlines', [])
        print(f"Total headlines: {len(headlines)}")
        print("-" * 80)
        
        if headlines:
            for i, headline in enumerate(headlines, 1):
                print(f"\n{i}. Title: {headline.get('title', 'N/A')}")
                print(f"   Caption: {headline.get('caption', 'N/A')}")
        else:
            print("\n⚠️  WARNING: No headlines found!")
            print("\nFull result:")
            print(json.dumps(result, indent=2))
        
        print("\n" + "=" * 80)
        print("📋 FULL JSON OUTPUT:")
        print("=" * 80)
        print(json.dumps(result, indent=2))
        
        # Validation
        print("\n" + "=" * 80)
        print("✓ VALIDATION:")
        print("=" * 80)
        
        checks = [
            ("Result is a dict", isinstance(result, dict)),
            ("Has 'headlines' key", 'headlines' in result),
            ("Headlines is a list", isinstance(result.get('headlines'), list)),
            (f"Has 8-12 headlines", 8 <= len(headlines) <= 12),
            ("All headlines have 'title'", all(h.get('title') for h in headlines)),
            ("All headlines have 'caption'", all(h.get('caption') for h in headlines)),
        ]
        
        for check_name, passed in checks:
            status = "✅" if passed else "❌"
            print(f"{status} {check_name}")
        
        all_passed = all(passed for _, passed in checks)
        
        if all_passed:
            print("\n🎉 ALL CHECKS PASSED!")
            return True
        else:
            print("\n⚠️  SOME CHECKS FAILED - Review above")
            return False
            
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        print("\n📍 TRACEBACK:")
        traceback.print_exc()
        return False


if __name__ == "__main__":
    print("\n🚀 Starting test...")
    success = test_rabbit_hole()
    print("\n" + "=" * 80)
    if success:
        print("✅ TEST PASSED!")
        sys.exit(0)
    else:
        print("❌ TEST FAILED!")
        sys.exit(1)
