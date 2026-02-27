# 🚀 Quick Start - FrameSentinel

## הפעלה מהירה (3 שלבים)

### שלב 1: Backend
```bash
# התקנת תלויות
pip install -r requirements.txt

# עדכון דאטאבייס (חובה!)
python migrate_db.py

# הפעלת שרת
python main.py
```

✅ Backend רץ ב: **http://localhost:8000**
📘 API Docs: **http://localhost:8000/docs**

---

### שלב 2: Admin Dashboard
```bash
# פתח terminal חדש
cd admin-dashboard

# התקנת תלויות (פעם ראשונה)
npm install

# הפעלת dashboard
npm run dev
```

✅ Dashboard רץ ב: **http://localhost:3001**

---

### שלב 3: התחברות

1. פתח דפדפן: **http://localhost:3001**
2. הזן username כלשהו (לדוגמה: `admin`)
3. בחר tenant: `default`
4. לחץ Login

---

## 🎯 מה לבדוק

### Dashboard
- ✅ Dashboard Overview - KPIs וסטטיסטיקות
- ✅ Sessions - רשימת sessions
- ✅ Session Detail - לחץ על "View" בכל session
- ✅ Webhooks - לוגים של webhooks
- ✅ Audit - לוגים של פעולות
- ✅ Settings - הגדרות webhook ו-thresholds
- ✅ Users - ניהול משתמשים

### API
- ✅ פתח: **http://localhost:8000/docs**
- ✅ נסה את ה-endpoints עם API Key: `dev-api-key-12345`

---

## 🧪 בדיקה מהירה

### יצירת Session חדש
```bash
curl -X POST "http://localhost:8000/api/v1/sessions" \
  -H "X-API-Key: dev-api-key-12345" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "test-user-123"}'
```

### העלאת וידאו
```bash
curl -X POST "http://localhost:8000/api/v1/sessions/{SESSION_ID}/upload" \
  -H "X-API-Key: dev-api-key-12345" \
  -F "video=@path/to/video.mp4"
```

### בדיקת תוצאות
```bash
curl "http://localhost:8000/api/v1/sessions/{SESSION_ID}/result" \
  -H "X-API-Key: dev-api-key-12345"
```

---

## 🔧 הגדרות

### Backend (.env)
```env
DATABASE_URL=postgresql://...
API_KEY=dev-api-key-12345
STORAGE_PATH=storage/videos
```

### Dashboard (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=dev-api-key-12345
```

---

## ❓ בעיות נפוצות

### Backend לא עולה
- ✅ וודא ש-Python 3.8+ מותקן
- ✅ הרץ `pip install -r requirements.txt`
- ✅ בדוק שה-DATABASE_URL תקין

### Dashboard לא עולה
- ✅ וודא ש-Node.js 18+ מותקן
- ✅ הרץ `npm install` בתיקיית admin-dashboard
- ✅ בדוק שה-.env.local קיים

### אין sessions ב-Dashboard
- ✅ צור session דרך ה-API
- ✅ בדוק שה-Backend רץ
- ✅ בדוק את ה-API Key

---

## 📚 מסמכים נוספים

- 📘 [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) - מדריך מלא באנגלית
- 🇮🇱 [HEBREW_GUIDE.md](HEBREW_GUIDE.md) - מדריך מלא בעברית
- ✅ [FINAL_CHECKLIST.md](FINAL_CHECKLIST.md) - checklist מלא

---

## 🎉 זהו!

המערכת מוכנה ופועלת. תהנה! 🚀
