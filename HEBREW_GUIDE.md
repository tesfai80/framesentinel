# FrameSentinel - מדריך מלא בעברית

## ✅ מה שמוכן ומיושם

### 🔧 Backend (Python/FastAPI)

#### 1. API Routes
- ✅ יצירת session
- ✅ העלאת וידאו
- ✅ בדיקת סטטוס
- ✅ קבלת תוצאות
- ✅ רשימת sessions

#### 2. Fraud Detection Pipeline
- ✅ Deepfake Detection
- ✅ Replay Attack Detection
- ✅ Injection Detection
- ✅ Face Swap Detection
- ✅ Metadata Integrity Check

#### 3. Services
- ✅ **Video Processor** - עיבוד וידאו + שליחת webhook
- ✅ **Webhook Service** - משלוח webhooks עם retries
- ✅ **Tenant Service** - ניהול הגדרות tenant
- ✅ **Audit Service** - רישום פעולות
- ✅ **Risk Scorer** - חישוב ציון סיכון

#### 4. Database Models
- ✅ VerificationSession
- ✅ VerificationResult
- ✅ User (ADMIN, ANALYST, VIEWER)
- ✅ WebhookLog
- ✅ AuditLog
- ✅ TenantSettings (כולל detection thresholds)

#### 5. Admin Routes
- ✅ סטטיסטיקות dashboard
- ✅ ניהול sessions
- ✅ webhook logs
- ✅ audit logs
- ✅ tenant settings

---

### 🎨 Admin Dashboard (Next.js)

#### 1. דפים מיושמים
- ✅ **Login Page** - כניסה עם בחירת tenant
- ✅ **Dashboard** - KPIs וסטטיסטיקות
- ✅ **Sessions Page** - רשימת sessions עם פילטרים
- ✅ **Session Detail** - פרטי session + timeline
- ✅ **Webhooks Page** - לוגים של webhooks + retry
- ✅ **Audit Logs** - רישום פעולות
- ✅ **Settings** - הגדרות webhook ו-thresholds
- ✅ **Users Management** - ניהול משתמשים ותפקידים

#### 2. תכונות
- ✅ פילטרים לפי state ו-risk level
- ✅ תצוגת timeline של frames חשודים
- ✅ retry webhook
- ✅ עדכון הגדרות tenant
- ✅ ניהול משתמשים (הוספה, עריכה, מחיקה)
- ✅ הצגת הרשאות לפי תפקיד

---

### 📦 TypeScript SDK

- ✅ Type-safe client
- ✅ יצירת session
- ✅ העלאת וידאו
- ✅ polling לתוצאות
- ✅ קבלת תוצאות

---

## 🎯 מה שמגיע ללקוח

### לאינטגרציה (צד הלקוח):
1. 🔑 **API Key** - מפתח ייחודי לטננט
2. 📦 **TypeScript SDK** - ספרייה להטמעה
3. 📤 **API Endpoints** - endpoints לאימות וידאו
4. 🔔 **Webhook** - קבלת תוצאות אוטומטית

### לשימוש פנימי (framesentinel.com):
1. 🌐 **Admin Dashboard** - קונסולת ניהול
2. 🔐 **Customer Login** - כניסה לטננט
3. 📊 **Sessions Review** - סקירת כל ה-sessions
4. 🕒 **Timeline Viewer** - ניתוח frame-by-frame
5. 🚩 **Risk Score UI** - אינדיקטורים ויזואליים
6. 🔔 **Webhook Logs** - סטטוס משלוח + retry
7. ⚙️ **Tenant Settings** - מדיניות ו-thresholds
8. 👥 **Users & Roles** - ניהול משתמשים
9. 📑 **Audit Logs** - לצורכי רגולציה
10. 📘 **API Docs** - דוקומנטציה אינטראקטיבית

---

## 🚀 הפעלה

### 1. Backend

```bash
# התקנת תלויות
pip install -r requirements.txt

# הרצת migration
python migrate_db.py

# הפעלת שרת
python main.py
```

**Backend רץ ב:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

### 2. Admin Dashboard

```bash
cd admin-dashboard

# התקנת תלויות
npm install

# הפעלת dashboard
npm run dev
```

**Dashboard רץ ב:** `http://localhost:3001`

### 3. TypeScript SDK

```bash
cd frontend/sdk

# התקנת תלויות
npm install

# build
npm run build
```

---

## 🔐 תפקידים

### ADMIN
- גישה מלאה למערכת
- ניהול משתמשים ותפקידים
- הגדרות מערכת
- צפייה בכל ה-sessions
- ניהול webhooks

### ANALYST
- צפייה ב-sessions
- גישה לתור סקירה
- צפייה ב-audit logs
- ייצוא דוחות

### VIEWER
- צפייה ב-sessions (קריאה בלבד)
- צפייה ב-dashboard
- דוחות בסיסיים

---

## 🔔 Webhook Integration

הלקוח מקבל POST request עם התוצאות:

```json
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

## 📈 מודולי זיהוי

1. **Deepfake Detection** - זיהוי פנים מזויפות AI
2. **Replay Attack** - זיהוי הקלטת מסך
3. **Injection Attack** - זיהוי מניפולציה בוידאו
4. **Face Swap** - זיהוי החלפת זהות
5. **Metadata Integrity** - בדיקת שלמות קובץ

---

## 🌐 פריסה

### Backend + SDK
פריסה כ-backend services (Docker, AWS ECS, וכו')

### Dashboard + Docs
פריסה ב-framesentinel.com:
- Admin Dashboard: `https://framesentinel.com/dashboard`
- API Docs: `https://framesentinel.com/docs`
- Customer Portal: `https://framesentinel.com/login`

---

## 📝 סיכום

המערכת מוכנה ומלאה עם:
- ✅ Backend API מלא
- ✅ Admin Dashboard מלא
- ✅ TypeScript SDK
- ✅ Webhook Integration
- ✅ Multi-Tenancy
- ✅ User Management
- ✅ Audit Logging
- ✅ Detection Thresholds
- ✅ Timeline Viewer
- ✅ Risk Scoring

**הכל מיושם ומוכן לשימוש!** 🎉
