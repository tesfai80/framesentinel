# FrameSentinel

AI Video KYC Fraud Detection Platform - TypeScript SDK & Backend API

## Architecture

```
FrameSentinel
├── Backend (Python/FastAPI)
│   ├── API Gateway
│   ├── Session Management
│   ├── Video Processing
│   ├── Fraud Detection Pipeline
│   └── Risk Scoring
│
└── Frontend (TypeScript SDK)
    └── Client SDK for integration
```

## Features

- **Session Management**: Create and track verification sessions
- **Video Upload**: Secure video upload with progress tracking
- **Frame Analysis**: Extract and analyze video frames (max 15 frames)
- **Fraud Detection**: 5 detection modules running in parallel
  - Deepfake Detection
  - Replay Attack Detection
  - Injection Detection
  - Face Swap Detection
  - Metadata Integrity Check
- **Risk Scoring**: Calculate authenticity scores
- **TypeScript SDK**: Type-safe client library
- **Performance**: 2-4 seconds processing time (70-80% faster with parallel execution)
- **Caching**: Redis-based result caching for identical videos

## Installation

### Backend

```bash
pip install -r requirements.txt
python main.py
```

API available at `http://localhost:8000`

### TypeScript SDK

```bash
cd frontend/sdk
npm install
npm run build
```

## Quick Start

```typescript
import { FrameSentinelClient } from '@framesentinel/sdk';

const client = new FrameSentinelClient({
  apiUrl: 'http://localhost:8000',
  apiKey: 'dev-api-key-12345'
});

// Create session
const session = await client.createSession('user123');

// Upload video
await client.uploadVideo(session.session_id, videoFile);

// Get result
const result = await client.pollUntilComplete(session.session_id);

console.log('Risk Level:', result.risk_level);
console.log('Score:', result.authenticity_score);
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/sessions` | Create session |
| GET | `/api/v1/sessions` | List sessions |
| POST | `/api/v1/sessions/{id}/upload` | Upload video |
| GET | `/api/v1/sessions/{id}/status` | Get status |
| GET | `/api/v1/sessions/{id}/result` | Get result |

## Response Format

```json
{
  "session_id": "uuid",
  "state": "COMPLETED",
  "authenticity_score": 0.85,
  "risk_level": "VERIFIED",
  "detection_flags": {
    "deepfake_detected": false,
    "replay_detected": false,
    "injection_detected": false,
    "face_swap_detected": false,
    "metadata_anomaly": false
  },
  "frame_timeline": [
    {
      "frame_number": 10,
      "timestamp": 0.333,
      "flags": ["deepfake"],
      "confidence": 0.75
    }
  ]
}
```

## Configuration

Edit `src/config/settings.py`:
- API Key
- Storage path
- Video size limits
- Allowed formats

## Documentation

- [TypeScript SDK](frontend/sdk/README.md) - Complete SDK documentation
- [API Docs](http://localhost:8000/docs) - Interactive API documentation
- [Performance Guide](PERFORMANCE.md) - Production optimization and deployment
- [Security Policy](SECURITY.md) - Security best practices

## Security

- API Key authentication
- File validation
- Secure storage
- Session isolation
- **Automatic Video Deletion**: Videos are automatically deleted immediately after processing. No permanent storage of user videos.

## License

MIT
