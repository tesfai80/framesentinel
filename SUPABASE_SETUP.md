# Supabase PostgreSQL Setup Guide

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up for free account
3. Create new project

## Step 2: Get Database Connection String
1. Go to Project Settings → Database
2. Scroll to "Connection String" section
3. Select "URI" format
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

## Step 3: Configure FrameSentinel

### Option A: Using .env file (Recommended)
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and replace DATABASE_URL:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

### Option B: Using environment variable
```bash
set DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

## Step 4: Install PostgreSQL Driver
```bash
pip install psycopg2-binary
```

Or reinstall all requirements:
```bash
pip install -r requirements.txt
```

## Step 5: Run Database Migrations
The tables will be created automatically on first run:
```bash
python main.py
```

## Step 6: Verify Connection
Check the console output - you should see:
```
INFO:     Database connected successfully
```

## Migration from SQLite to Supabase

If you have existing data in SQLite:

1. Export data from SQLite:
   ```bash
   sqlite3 framesentinel.db .dump > backup.sql
   ```

2. Convert to PostgreSQL format (manual adjustments needed)

3. Import to Supabase using their SQL Editor

## Switching Back to SQLite

Simply change DATABASE_URL in `.env`:
```
DATABASE_URL=sqlite:///./framesentinel.db
```

## Notes

- Supabase Free Tier: 500MB database, 2GB bandwidth/month
- Connection pooling is handled automatically
- SSL is enabled by default
- Backups are automatic (daily)

## Troubleshooting

**Error: "could not connect to server"**
- Check your internet connection
- Verify the connection string is correct
- Check if Supabase project is active

**Error: "password authentication failed"**
- Reset database password in Supabase dashboard
- Update connection string with new password

**Error: "SSL connection required"**
- Add `?sslmode=require` to connection string
