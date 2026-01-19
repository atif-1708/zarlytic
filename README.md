# ZARlytics Production Setup Guide

Professional Flutter-style web application for Profit Tracking & Business Reporting.

## 🚀 Deployment Instructions

### 1. Database Setup (Supabase)
Create a new project on [Supabase](https://supabase.com) and run this script in the **SQL Editor**:

```sql
-- Create Business Units
CREATE TABLE businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Staff/User Accounts
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- 'admin' or 'user'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Sales Records
CREATE TABLE sales (
  id TEXT PRIMARY KEY,
  business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sales_amount NUMERIC NOT NULL,
  profit_percent NUMERIC NOT NULL,
  profit_amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Expense Records
CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: YYYY-MM
  expense_amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Administrator
INSERT INTO users (id, name, email, password, role)
VALUES ('admin-001', 'System Admin', 'admin@zar.co.za', 'password123', 'admin');
```

### 2. Deployment to Vercel (Step-by-Step)
1.  **Import:** Link your GitHub repo to Vercel.
2.  **Environment Variables:** Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `API_KEY` in the project settings.
3.  **Troubleshooting:** If you see `npm error ETARGET`, ensure your `@google/genai` version is set to `^0.21.0` in both `package.json` and `index.html`.

### 3. Environment Variables Reference
| Variable | Source | Description |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Supabase API Settings | Project URL |
| `SUPABASE_ANON_KEY` | Supabase API Settings | Anon public key |
| `API_KEY` | Google AI Studio | Gemini API Key |

## 🛠 Tech Stack
- **Frontend:** React 19 + Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Database:** Supabase (PostgreSQL)
- **AI Engine:** Google Gemini (gemini-3-flash-preview)
- **Currency:** ZAR (South African Rand)
