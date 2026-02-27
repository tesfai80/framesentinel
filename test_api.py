import requests
import time
import os
import sys
from pathlib import Path

# Fix encoding for Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:8000"
API_KEY = "dev-api-key-12345"
HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

def test_health():
    """Test health endpoint"""
    print("\n=== Testing Health Endpoint ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    print("✓ Health check passed")

def test_create_session():
    """Test session creation"""
    print("\n=== Testing Session Creation ===")
    data = {
        "user_id": "test-user-123",
        "device_metadata": {
            "device_type": "mobile",
            "os": "iOS",
            "browser": "Safari"
        }
    }
    response = requests.post(f"{BASE_URL}/api/v1/sessions", json=data, headers=HEADERS)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    session_id = response.json()["session_id"]
    print(f"✓ Session created: {session_id}")
    return session_id

def test_list_sessions():
    """Test listing sessions"""
    print("\n=== Testing List Sessions ===")
    response = requests.get(f"{BASE_URL}/api/v1/sessions", headers=HEADERS)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    print("✓ Sessions listed successfully")

def test_get_session_status(session_id):
    """Test getting session status"""
    print("\n=== Testing Get Session Status ===")
    response = requests.get(f"{BASE_URL}/api/v1/sessions/{session_id}/status", headers=HEADERS)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    print("✓ Session status retrieved")

def test_upload_video(session_id):
    """Test video upload"""
    print("\n=== Testing Video Upload ===")
    
    # Check if test video exists
    video_path = Path("storage/videos")
    video_files = list(video_path.glob("*.mp4"))
    
    if not video_files:
        print("⚠ No test video found. Skipping upload test.")
        print("  To test upload, place a video file in storage/videos/")
        return False
    
    test_video = video_files[0]
    print(f"Using test video: {test_video}")
    
    with open(test_video, "rb") as f:
        files = {"video": (test_video.name, f, "video/mp4")}
        response = requests.post(
            f"{BASE_URL}/api/v1/sessions/{session_id}/upload",
            files=files,
            headers={"X-API-Key": API_KEY}
        )
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        print("✓ Video uploaded successfully")
        return True
    else:
        print("✗ Video upload failed")
        return False

def test_get_result(session_id):
    """Test getting verification result"""
    print("\n=== Testing Get Result ===")
    response = requests.get(f"{BASE_URL}/api/v1/sessions/{session_id}/result", headers=HEADERS)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"✓ Result retrieved")
        print(f"  - Authenticity Score: {result.get('authenticity_score', 'N/A')}")
        print(f"  - Risk Level: {result.get('risk_level', 'N/A')}")
        print(f"  - Detection Flags: {result.get('detection_flags', {})}")
    else:
        print("⚠ Result not ready yet (session may need video upload)")

def test_admin_endpoints():
    """Test admin endpoints"""
    print("\n=== Testing Admin Endpoints ===")
    
    # Test admin stats
    response = requests.get(f"{BASE_URL}/api/v1/admin/stats", headers=HEADERS)
    print(f"Admin Stats Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Stats: {response.json()}")
        print("✓ Admin stats working")
    
    # Test admin sessions
    response = requests.get(f"{BASE_URL}/api/v1/admin/sessions", headers=HEADERS)
    print(f"Admin Sessions Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Sessions count: {len(response.json())}")
        print("✓ Admin sessions working")

def test_database_connection():
    """Test database connection"""
    print("\n=== Testing Database Connection ===")
    try:
        from src.config.database import engine
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
            print("✓ Database connection successful")
            return True
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        return False

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("FrameSentinel API Functionality Tests")
    print("=" * 60)
    
    try:
        # Test 1: Health check
        test_health()
        
        # Test 2: Database connection
        test_database_connection()
        
        # Test 3: Create session
        session_id = test_create_session()
        
        # Test 4: List sessions
        test_list_sessions()
        
        # Test 5: Get session status
        test_get_session_status(session_id)
        
        # Test 6: Upload video (if available)
        video_uploaded = test_upload_video(session_id)
        
        # Test 7: Get result
        if video_uploaded:
            print("\nWaiting 2 seconds for processing...")
            time.sleep(2)
        test_get_result(session_id)
        
        # Test 8: Admin endpoints
        test_admin_endpoints()
        
        print("\n" + "=" * 60)
        print("✓ All tests completed!")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("\n✗ ERROR: Cannot connect to API server")
        print("Make sure the server is running: python main.py")
    except AssertionError as e:
        print(f"\n✗ Test failed: {e}")
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    run_all_tests()
