# Quick Start

## 1. Start Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

Server runs on: http://localhost:8000

## 2. Build TypeScript SDK

```bash
cd frontend/sdk
npm install
npm run build
```

## 3. Use SDK

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

console.log('Risk:', result.risk_level);
console.log('Score:', result.authenticity_score);
```

## API Documentation

Interactive docs: http://localhost:8000/docs

## More Examples

See [EXAMPLES.md](EXAMPLES.md) for complete usage examples.
