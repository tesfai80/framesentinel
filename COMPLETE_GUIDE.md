# FrameSentinel - Complete Deployment Guide

## 🎯 Overview

FrameSentinel is a complete AI Video KYC Fraud Detection Platform with:
- **Backend API** (Python/FastAPI)
- **TypeScript SDK** (Client library)
- **Admin Dashboard** (Next.js)

## 📦 What You Deliver to Customers

### For Integration (Customer Side):
1. 🔑 **API Key** - Unique tenant API key
2. 📦 **TypeScript SDK** - `npm install @framesentinel/sdk`
3. 📤 **API Endpoints** - Video verification API
4. 🔔 **Webhook URL** - Configure to receive results

### For Internal Use (framesentinel.com):
1. 🌐 **Admin Dashboard** - Web console for fraud/compliance teams
2. 🔐 **Customer Login Portal** - Tenant-specific access
3. 📊 **Sessions Review UI** - View all verification sessions
4. 🕒 **Tamper Timeline Viewer** - Frame-by-frame analysis
5. 🚩 **Risk Score & Detection Flags** - Visual fraud indicators
6. 🔔 **Webhook Logs** - Delivery status and retry
7. ⚙️ **Tenant Settings** - Policies and thresholds
8. 👥 **Users & Roles** - ADMIN, ANALYST, VIEWER
9. 📑 **Audit Logs** - Compliance and regulation
10. 📘 **API Documentation** - Interactive docs at `/docs`

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run database migration
python migrate_db.py

# Start backend
python main.py
```

Backend runs at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### 2. Admin Dashboard Setup

```bash
cd admin-dashboard

# Install dependencies
npm install

# Start dashboard
npm run dev
```

Dashboard runs at: `http://localhost:3001`

### 3. TypeScript SDK

```bash
cd frontend/sdk

# Install dependencies
npm install

# Build SDK
npm run build
```

---

## 🔧 Configuration

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# API
API_KEY=your-api-key-here

# Storage
STORAGE_PATH=storage/videos
MAX_VIDEO_SIZE_MB=100
```

### Dashboard (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=your-api-key-here
```

---

## 📊 Features Checklist

### ✅ Backend API
- [x] Session Management
- [x] Video Upload & Processing
- [x] Fraud Detection Pipeline (5 modules)
- [x] Risk Scoring
- [x] Webhook Delivery with Retry
- [x] Multi-Tenancy Support
- [x] Audit Logging
- [x] API Key Authentication

### ✅ Admin Dashboard
- [x] Login with Tenant Selection
- [x] Dashboard Overview (KPIs)
- [x] Sessions List with Filters
- [x] Session Detail with Timeline
- [x] Webhook Logs & Retry
- [x] Audit Logs
- [x] Tenant Settings
- [x] Users & Roles Management

### ✅ TypeScript SDK
- [x] Type-safe Client
- [x] Session Creation
- [x] Video Upload
- [x] Status Polling
- [x] Result Retrieval

---

## 🔐 User Roles

### ADMIN
- Full system access
- Manage users & roles
- Configure settings
- View all sessions
- Manage webhooks

### ANALYST
- View sessions
- Review queue access
- View audit logs
- Export reports

### VIEWER
- View sessions (read-only)
- View dashboard
- Basic reporting

---

## 🔔 Webhook Integration

Configure webhook in Tenant Settings:

```json
POST https://customer-domain.com/webhook
{
  "session_id": "uuid",
  "user_id": "user123",
  "authenticity_score": 0.85,
  "risk_level": "VERIFIED",
  "detection_flags": {
    "deepfake_detected": false,
    "replay_detected": false,
    "injection_detected": false,
    "face_swap_detected": false,
    "metadata_anomaly": false
  },
  "processed_at": "2024-01-01T00:00:00Z"
}
```

---

## 📈 Detection Modules

1. **Deepfake Detection** - AI-generated face detection
2. **Replay Attack** - Screen recording detection
3. **Injection Attack** - Video manipulation detection
4. **Face Swap** - Identity swap detection
5. **Metadata Integrity** - File tampering detection

---

## 🌐 Deployment

### Backend (API + SDK)
Deploy as backend services (Docker, AWS ECS, etc.)

### Dashboard + Docs
Deploy to `framesentinel.com`:
- Admin Dashboard: `https://framesentinel.com/dashboard`
- API Docs: `https://framesentinel.com/docs`
- Customer Portal: `https://framesentinel.com/login`

---

## 📝 API Endpoints

### Public API (Customer Integration)
```
POST   /api/v1/sessions              # Create session
GET    /api/v1/sessions              # List sessions
POST   /api/v1/sessions/{id}/upload  # Upload video
GET    /api/v1/sessions/{id}/status  # Get status
GET    /api/v1/sessions/{id}/result  # Get result
```

### Admin API (Internal)
```
GET    /api/v1/admin/stats           # Dashboard stats
GET    /api/v1/admin/sessions        # Admin sessions
GET    /api/v1/webhooks/logs         # Webhook logs
POST   /api/v1/sessions/{id}/webhook/redeliver  # Retry webhook
GET    /api/v1/audit/logs            # Audit logs
GET    /api/v1/tenant/settings       # Get settings
PUT    /api/v1/tenant/settings       # Update settings
```

---

## 🔒 Security

- API Key authentication
- Tenant isolation
- File validation
- Secure storage
- Session isolation
- Audit logging

---

## 📞 Support

For issues or questions:
- API Documentation: `/docs`
- Admin Dashboard: `/dashboard`
- Audit Logs: `/dashboard/audit`

---

## 📄 License

MIT
