# הוראות הפעלה - Marketing Site עם התחברות אמיתית

## מה עשינו:
✅ חיברנו את Marketing Site ל-Backend API
✅ התחברות אמיתית מול Supabase PostgreSQL
✅ הרשמה אמיתית עם יצירת משתמשים בבסיס הנתונים

## איך להריץ:

### 1. הפעל את Backend (עם Supabase):
```bash
cd c:\Users\tesfa\source\repos\FrameSentinel
python main.py
```

### 2. הפעל את Marketing Site:
```bash
cd marketing-site
npm install
npm run dev
```

### 3. צור משתמש ראשון:
```bash
python create_admin.py
```

## כתובות:
- Backend API: http://localhost:8000
- Marketing Site: http://localhost:3000
- Admin Dashboard: http://localhost:3001

## זרימת עבודה:
1. משתמש נכנס ל: http://localhost:3000
2. לוחץ על "Sign In" או "Start Free Trial"
3. ממלא פרטים
4. המערכת שולחת בקשה ל-Backend API
5. Backend מאמת מול Supabase PostgreSQL
6. משתמש מקבל JWT token
7. מועבר לדף Demo

## בסיס הנתונים:
- Supabase PostgreSQL
- טבלה: users
- שדות: id, email, password_hash, role, tenant_id, last_login

## אבטחה:
✅ סיסמאות מוצפנות עם bcrypt
✅ JWT tokens לאימות
✅ CORS מוגדר
✅ SSL connection ל-Supabase
