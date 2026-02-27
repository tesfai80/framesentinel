# FrameSentinel Admin Dashboard

Professional Next.js + TypeScript admin dashboard for FrameSentinel AI Video KYC Fraud Detection Platform.

## Features

✅ **Authentication & Multi-Tenancy**
- Login with tenant selection
- Role-based access control (ADMIN, ANALYST, VIEWER)

✅ **Dashboard Overview**
- Real-time KPIs (Total Sessions, Verified, Suspicious, High Risk)
- Average authenticity score
- Processing time metrics
- Recent sessions table

✅ **Sessions Management**
- Advanced filtering (State, Risk Level)
- Detailed session view with frame timeline
- Detection flags visualization
- Risk assessment display

✅ **Review Queue**
- Suspicious sessions requiring manual review
- Quick access to session details

✅ **Webhook Management**
- View webhook delivery logs
- Retry failed webhooks
- Status tracking

✅ **Audit Logs**
- Complete audit trail
- Filter by action type
- User activity tracking

✅ **Settings**
- Webhook URL configuration
- Detection threshold adjustment
- Per-tenant customization

✅ **User Management**
- User list with roles
- Role permissions overview
- RBAC implementation

## Tech Stack

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **React** - UI components
- **Inline CSS** - Minimal styling

## Installation

```bash
cd admin-dashboard
npm install
```

## Configuration

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=dev-api-key-12345
```

## Run Development Server

```bash
npm run dev
```

Dashboard available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Login**: Navigate to `/login`, enter username and select tenant
2. **Dashboard**: View overview with KPIs and recent sessions
3. **Sessions**: Browse all sessions with filters
4. **Review Queue**: Check suspicious sessions
5. **Webhooks**: Monitor webhook delivery
6. **Audit Logs**: Track all system activities
7. **Settings**: Configure thresholds and webhooks
8. **Users**: Manage users and roles

## Default Credentials

- Username: `admin`
- Tenant: `default`
- Role: `ADMIN`

## API Integration

The dashboard connects to the FastAPI backend at `http://localhost:8000`.

Ensure the backend is running:

```bash
cd ..
python main.py
```

## Project Structure

```
admin-dashboard/
├── app/
│   ├── login/page.tsx          # Login page
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── page.tsx            # Overview dashboard
│   │   ├── sessions/           # Sessions management
│   │   ├── review/             # Review queue
│   │   ├── webhooks/           # Webhook logs
│   │   ├── audit/              # Audit logs
│   │   ├── settings/           # Settings page
│   │   └── users/              # User management
├── lib/
│   └── api.ts                  # API client
├── types/
│   └── index.ts                # TypeScript types
└── styles/
    └── globals.css             # Global styles
```

## License

MIT
