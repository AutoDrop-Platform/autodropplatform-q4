-- Drop the existing orders table if it exists
DROP TABLE IF EXISTS orders;

-- Create the new orders table schema as requested
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    product_id TEXT,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
