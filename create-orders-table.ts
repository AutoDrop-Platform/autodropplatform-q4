import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        items JSONB NOT NULL,
        total_cents INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ Orders table created or already exists.");
  } catch (error) {
    console.error("❌ Error creating orders table:", error);
  }
}

main();
