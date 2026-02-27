import {
  FrameSentinelConfig,
  CreateSessionRequest,
  CreateSessionResponse,
  VerificationResult,
  SessionStatus,
  SessionState,
  DeviceMetadata,
  FrameSentinelError
} from './types';

export class FrameSentinelClient {
  private apiUrl: string;
  private apiKey: string;
  private onProgress?: (percent: number) => void;
  private onStatusChange?: (state: SessionState) => void;

  constructor(config: FrameSentinelConfig) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.onProgress = config.onProgress;
    this.onStatusChange = config.onStatusChange;
  }

  async createSession(userId: string, deviceMetadata?: DeviceMetadata): Promise<CreateSessionResponse> {
    const response = await fetch(`${this.apiUrl}/api/v1/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({
        user_id: userId,
        device_metadata: deviceMetadata || this.getDeviceMetadata()
      } as CreateSessionRequest)
    });

    if (!response.ok) {
      throw new FrameSentinelError(
        'Failed to create session',
        'SESSION_CREATE_FAILED',
        response.status >= 500
      );
    }

    return response.json();
  }

  async uploadVideo(sessionId: string, videoFile: File): Promise<void> {
    const formData = new FormData();
    formData.append('video', videoFile);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && this.onProgress) {
          this.onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new FrameSentinelError(
            'Upload failed',
            'UPLOAD_FAILED',
            xhr.status >= 500
          ));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new FrameSentinelError(
          'Network error during upload',
          'NETWORK_ERROR',
          true
        ));
      });

      xhr.open('POST', `${this.apiUrl}/api/v1/sessions/${sessionId}/upload`);
      xhr.setRequestHeader('X-API-Key', this.apiKey);
      xhr.send(formData);
    });
  }

  async getStatus(sessionId: string): Promise<SessionStatus> {
    const response = await fetch(`${this.apiUrl}/api/v1/sessions/${sessionId}/status`, {
      headers: { 'X-API-Key': this.apiKey }
    });

    if (!response.ok) {
      throw new FrameSentinelError(
        'Failed to get status',
        'STATUS_FAILED',
        response.status >= 500
      );
    }

    return response.json();
  }

  async getResult(sessionId: string): Promise<VerificationResult> {
    const response = await fetch(`${this.apiUrl}/api/v1/sessions/${sessionId}/result`, {
      headers: { 'X-API-Key': this.apiKey }
    });

    if (!response.ok) {
      throw new FrameSentinelError(
        'Failed to get result',
        'RESULT_FAILED',
        response.status >= 500
      );
    }

    return response.json();
  }

  async pollUntilComplete(
    sessionId: string,
    maxAttempts: number = 30,
    interval: number = 2000
  ): Promise<VerificationResult> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.getStatus(sessionId);
      
      if (this.onStatusChange) {
        this.onStatusChange(status.state);
      }

      if (status.state === 'COMPLETED' || status.state === 'FAILED') {
        return await this.getResult(sessionId);
      }

      await this.sleep(interval);
    }

    throw new FrameSentinelError(
      'Polling timeout',
      'POLLING_TIMEOUT',
      false
    );
  }

  getDeviceMetadata(): DeviceMetadata {
    if (typeof window === 'undefined') {
      return { timestamp: new Date().toISOString() };
    }

    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString()
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
