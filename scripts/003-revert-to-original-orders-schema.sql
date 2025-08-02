-- Drop the existing table to ensure a clean slate, in case a previous migration was run.
DROP TABLE IF EXISTS orders;

-- Re-create the original orders table schema which supports all platform features.
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_email VARCHAR(255),
    amount_total INTEGER NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    charity_donation INTEGER,
    charity_organization VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
