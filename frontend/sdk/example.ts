import { FrameSentinelClient } from '@framesentinel/sdk';

// Initialize client
const client = new FrameSentinelClient({
  apiUrl: 'https://framesentinel-341068003893.europe-west3.run.app',
  apiKey: 'your-api-key-here',
  onProgress: (percent) => {
    console.log(`Upload progress: ${percent}%`);
  },
  onStatusChange: (state) => {
    console.log(`Processing state: ${state}`);
  }
});

// Example: Verify user with video
async function verifyUser(userId: string, videoFile: File) {
  try {
    // Step 1: Create verification session
    console.log('Creating session...');
    const session = await client.createSession(userId);
    console.log('Session created:', session.session_id);

    // Step 2: Upload video
    console.log('Uploading video...');
    await client.uploadVideo(session.session_id, videoFile);
    console.log('Video uploaded successfully');

    // Step 3: Wait for processing and get result
    console.log('Processing video...');
    const result = await client.pollUntilComplete(session.session_id);

    // Step 4: Handle result
    console.log('Verification complete!');
    console.log('Risk Level:', result.risk_level);
    console.log('Authenticity Score:', result.authenticity_score);
    console.log('Detection Flags:', result.detection_flags);

    if (result.risk_level === 'VERIFIED') {
      console.log('✓ User verified successfully');
      return true;
    } else {
      console.log('✗ Verification failed');
      return false;
    }
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}

// Example usage in browser
const fileInput = document.getElementById('video-input') as HTMLInputElement;
fileInput?.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    await verifyUser('user-123', file);
  }
});
