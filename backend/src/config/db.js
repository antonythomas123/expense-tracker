import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DB_CONNECTION_STRING);

export const initDB = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id  VARCHAR(255) NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
  )`;
    console.log("DB initialized successfully");
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
