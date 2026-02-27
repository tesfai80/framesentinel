# FrameSentinel Usage Examples

## TypeScript/JavaScript

### Basic Usage

```typescript
import { FrameSentinelClient } from '@framesentinel/sdk';

const client = new FrameSentinelClient({
  apiUrl: 'http://localhost:8000',
  apiKey: 'dev-api-key-12345'
});

async function verifyVideo(userId: string, videoFile: File) {
  // Create session
  const session = await client.createSession(userId);
  
  // Upload video
  await client.uploadVideo(session.session_id, videoFile);
  
  // Get result
  const result = await client.pollUntilComplete(session.session_id);
  
  return result;
}
```

### With Progress Tracking

```typescript
const client = new FrameSentinelClient({
  apiUrl: 'http://localhost:8000',
  apiKey: 'dev-api-key-12345',
  onProgress: (percent) => {
    console.log(`Upload: ${percent}%`);
  },
  onStatusChange: (state) => {
    console.log(`Status: ${state}`);
  }
});
```

### Error Handling

```typescript
import { FrameSentinelClient, FrameSentinelError } from '@framesentinel/sdk';

try {
  const result = await client.pollUntilComplete(sessionId);
  
  if (result.risk_level === 'VERIFIED') {
    console.log('✓ Verified');
  } else {
    console.log('✗ Failed verification');
  }
} catch (error) {
  if (error instanceof FrameSentinelError) {
    console.error('Code:', error.code);
    
    if (error.retryable) {
      // Retry logic
    }
  }
}
```

## React

```tsx
import { useState } from 'react';
import { FrameSentinelClient, VerificationResult } from '@framesentinel/sdk';

function VideoVerification() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);

  const client = new FrameSentinelClient({
    apiUrl: 'http://localhost:8000',
    apiKey: 'your-api-key',
    onProgress: setProgress,
    onStatusChange: setStatus
  });

  const handleVerify = async (file: File) => {
    const session = await client.createSession('user123');
    await client.uploadVideo(session.session_id, file);
    const result = await client.pollUntilComplete(session.session_id);
    setResult(result);
  };

  return (
    <div>
      <input type="file" accept="video/*" 
        onChange={(e) => e.target.files?.[0] && handleVerify(e.target.files[0])} 
      />
      <p>Progress: {progress}%</p>
      <p>Status: {status}</p>
      {result && (
        <div>
          <h3>Risk: {result.risk_level}</h3>
          <p>Score: {result.authenticity_score}</p>
        </div>
      )}
    </div>
  );
}
```

## Python

```python
import requests

API_URL = "http://localhost:8000"
API_KEY = "dev-api-key-12345"

def verify_video(user_id: str, video_path: str):
    headers = {"X-API-Key": API_KEY}
    
    # Create session
    response = requests.post(
        f"{API_URL}/api/v1/sessions",
        headers=headers,
        json={"user_id": user_id}
    )
    session_id = response.json()["session_id"]
    
    # Upload video
    with open(video_path, 'rb') as f:
        files = {"video": f}
        requests.post(
            f"{API_URL}/api/v1/sessions/{session_id}/upload",
            headers=headers,
            files=files
        )
    
    # Poll for result
    import time
    for _ in range(30):
        response = requests.get(
            f"{API_URL}/api/v1/sessions/{session_id}/result",
            headers=headers
        )
        result = response.json()
        if result["state"] == "COMPLETED":
            return result
        time.sleep(2)
    
    return None

# Usage
result = verify_video("user123", "video.mp4")
print(f"Risk Level: {result['risk_level']}")
print(f"Score: {result['authenticity_score']}")
```

## cURL

```bash
# Create session
SESSION_ID=$(curl -X POST "http://localhost:8000/api/v1/sessions" \
  -H "X-API-Key: dev-api-key-12345" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user123"}' | jq -r '.session_id')

# Upload video
curl -X POST "http://localhost:8000/api/v1/sessions/$SESSION_ID/upload" \
  -H "X-API-Key: dev-api-key-12345" \
  -F "video=@video.mp4"

# Get result
curl "http://localhost:8000/api/v1/sessions/$SESSION_ID/result" \
  -H "X-API-Key: dev-api-key-12345"
```

## Node.js

```javascript
const { FrameSentinelClient } = require('@framesentinel/sdk');
const fs = require('fs');

async function main() {
  const client = new FrameSentinelClient({
    apiUrl: 'http://localhost:8000',
    apiKey: 'dev-api-key-12345'
  });

  // Read video file
  const buffer = fs.readFileSync('video.mp4');
  const file = new File([buffer], 'video.mp4', { type: 'video/mp4' });

  // Verify
  const session = await client.createSession('user123');
  await client.uploadVideo(session.session_id, file);
  const result = await client.pollUntilComplete(session.session_id);

  console.log('Risk Level:', result.risk_level);
  console.log('Score:', result.authenticity_score);
}

main();
```
