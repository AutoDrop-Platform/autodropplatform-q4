DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  amount_total INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  charity_donation INTEGER,
  charity_organization TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
