# @framesentinel/sdk

TypeScript SDK for FrameSentinel Video KYC Verification Platform.

## Installation

```bash
npm install @framesentinel/sdk
```

## Quick Start

```typescript
import { FrameSentinelClient } from '@framesentinel/sdk';

const client = new FrameSentinelClient({
  apiUrl: 'https://api.framesentinel.com',
  apiKey: 'your-api-key',
  onProgress: (percent) => console.log(`Upload: ${percent}%`),
  onStatusChange: (state) => console.log(`Status: ${state}`)
});

// Create session
const session = await client.createSession('user123');

// Upload video
await client.uploadVideo(session.session_id, videoFile);

// Wait for result
const result = await client.pollUntilComplete(session.session_id);

console.log('Risk Level:', result.risk_level);
console.log('Score:', result.authenticity_score);
```

## API Reference

### Constructor

```typescript
new FrameSentinelClient(config: FrameSentinelConfig)
```

**Config Options:**
- `apiUrl` (string, required): API endpoint URL
- `apiKey` (string, required): Your API key
- `onProgress` (function, optional): Upload progress callback
- `onStatusChange` (function, optional): Processing status callback

### Methods

#### createSession()

```typescript
createSession(userId: string, deviceMetadata?: DeviceMetadata): Promise<CreateSessionResponse>
```

Creates a new verification session.

**Parameters:**
- `userId`: External user reference
- `deviceMetadata`: Optional device information

**Returns:**
```typescript
{
  session_id: string;
  state: SessionState;
  created_at: string;
}
```

#### uploadVideo()

```typescript
uploadVideo(sessionId: string, videoFile: File): Promise<void>
```

Uploads video for verification. Triggers `onProgress` callback.

**Parameters:**
- `sessionId`: Session ID from createSession
- `videoFile`: Video file to upload

#### getStatus()

```typescript
getStatus(sessionId: string): Promise<SessionStatus>
```

Gets current session status.

**Returns:**
```typescript
{
  session_id: string;
  state: SessionState;
  updated_at: string;
}
```

#### getResult()

```typescript
getResult(sessionId: string): Promise<VerificationResult>
```

Gets verification result.

**Returns:**
```typescript
{
  session_id: string;
  state: SessionState;
  authenticity_score?: number;
  risk_level?: RiskLevel;
  detection_flags?: DetectionFlags;
  frame_timeline?: FrameEvent[];
  processed_at?: string;
}
```

#### pollUntilComplete()

```typescript
pollUntilComplete(
  sessionId: string,
  maxAttempts?: number,
  interval?: number
): Promise<VerificationResult>
```

Polls until processing completes. Triggers `onStatusChange` callback.

**Parameters:**
- `sessionId`: Session ID
- `maxAttempts`: Max polling attempts (default: 30)
- `interval`: Polling interval in ms (default: 2000)

#### getDeviceMetadata()

```typescript
getDeviceMetadata(): DeviceMetadata
```

Collects device metadata automatically.

## Types

### SessionState
```typescript
type SessionState = 'CREATED' | 'UPLOADED' | 'PROCESSING' | 'ANALYZED' | 'COMPLETED' | 'FAILED';
```

### RiskLevel
```typescript
type RiskLevel = 'VERIFIED' | 'SUSPICIOUS' | 'HIGH_RISK';
```

### DetectionFlags
```typescript
interface DetectionFlags {
  deepfake_detected: boolean;
  replay_detected: boolean;
  injection_detected: boolean;
  face_swap_detected: boolean;
  metadata_anomaly: boolean;
}
```

### FrameEvent
```typescript
interface FrameEvent {
  frame_number: number;
  timestamp: number;
  flags: string[];
  confidence: number;
}
```

## Error Handling

```typescript
import { FrameSentinelError } from '@framesentinel/sdk';

try {
  const result = await client.pollUntilComplete(sessionId);
} catch (error) {
  if (error instanceof FrameSentinelError) {
    console.error('Code:', error.code);
    console.error('Retryable:', error.retryable);
    
    if (error.retryable) {
      // Retry logic
    }
  }
}
```

**Error Codes:**
- `SESSION_CREATE_FAILED`: Failed to create session
- `UPLOAD_FAILED`: Video upload failed
- `NETWORK_ERROR`: Network connectivity issue
- `STATUS_FAILED`: Failed to get status
- `RESULT_FAILED`: Failed to get result
- `POLLING_TIMEOUT`: Processing timeout

## Complete Example

```typescript
import { FrameSentinelClient, FrameSentinelError } from '@framesentinel/sdk';

async function verifyUser(userId: string, videoFile: File) {
  const client = new FrameSentinelClient({
    apiUrl: 'https://api.framesentinel.com',
    apiKey: process.env.FRAMESENTINEL_API_KEY!,
    onProgress: (percent) => {
      console.log(`Upload progress: ${percent}%`);
    },
    onStatusChange: (state) => {
      console.log(`Processing state: ${state}`);
    }
  });

  try {
    // Create session
    const session = await client.createSession(userId, {
      app_version: '1.0.0',
      device_type: 'mobile'
    });

    console.log('Session created:', session.session_id);

    // Upload video
    await client.uploadVideo(session.session_id, videoFile);
    console.log('Video uploaded successfully');

    // Wait for result
    const result = await client.pollUntilComplete(session.session_id);

    // Handle result
    if (result.risk_level === 'VERIFIED') {
      console.log('✓ User verified');
      console.log('Score:', result.authenticity_score);
      return true;
    } else {
      console.log('✗ Verification failed');
      console.log('Risk:', result.risk_level);
      console.log('Flags:', result.detection_flags);
      return false;
    }
  } catch (error) {
    if (error instanceof FrameSentinelError) {
      console.error('Verification error:', error.message);
      console.error('Error code:', error.code);
      
      if (error.retryable) {
        console.log('Error is retryable, please try again');
      }
    }
    throw error;
  }
}
```

## React Example

```typescript
import { useState } from 'react';
import { FrameSentinelClient, VerificationResult } from '@framesentinel/sdk';

function VideoVerification() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);

  const client = new FrameSentinelClient({
    apiUrl: 'https://api.framesentinel.com',
    apiKey: 'your-api-key',
    onProgress: setProgress,
    onStatusChange: setStatus
  });

  const handleVerify = async (videoFile: File) => {
    try {
      const session = await client.createSession('user123');
      await client.uploadVideo(session.session_id, videoFile);
      const result = await client.pollUntilComplete(session.session_id);
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={(e) => {
        if (e.target.files?.[0]) handleVerify(e.target.files[0]);
      }} />
      <p>Progress: {progress}%</p>
      <p>Status: {status}</p>
      {result && (
        <div>
          <h3>Risk Level: {result.risk_level}</h3>
          <p>Score: {result.authenticity_score}</p>
        </div>
      )}
    </div>
  );
}
```

## Node.js Example

```typescript
import { FrameSentinelClient } from '@framesentinel/sdk';
import fs from 'fs';

async function verifyVideoFile(userId: string, videoPath: string) {
  const client = new FrameSentinelClient({
    apiUrl: 'https://api.framesentinel.com',
    apiKey: process.env.FRAMESENTINEL_API_KEY!
  });

  // Read file
  const buffer = fs.readFileSync(videoPath);
  const file = new File([buffer], 'video.mp4', { type: 'video/mp4' });

  // Verify
  const session = await client.createSession(userId);
  await client.uploadVideo(session.session_id, file);
  const result = await client.pollUntilComplete(session.session_id);

  return result;
}
```

## Best Practices

1. **Always handle errors**
   ```typescript
   try {
     await client.uploadVideo(sessionId, file);
   } catch (error) {
     if (error instanceof FrameSentinelError && error.retryable) {
       // Implement retry logic
     }
   }
   ```

2. **Provide user feedback**
   ```typescript
   const client = new FrameSentinelClient({
     apiUrl: '...',
     apiKey: '...',
     onProgress: (p) => updateProgressBar(p),
     onStatusChange: (s) => showStatus(s)
   });
   ```

3. **Validate video before upload**
   ```typescript
   if (file.size > 100 * 1024 * 1024) {
     throw new Error('Video too large');
   }
   if (!['video/mp4', 'video/webm'].includes(file.type)) {
     throw new Error('Invalid format');
   }
   ```

4. **Use environment variables for API keys**
   ```typescript
   const client = new FrameSentinelClient({
     apiUrl: process.env.FRAMESENTINEL_API_URL!,
     apiKey: process.env.FRAMESENTINEL_API_KEY!
   });
   ```

## License

MIT
