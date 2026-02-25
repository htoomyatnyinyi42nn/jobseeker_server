// src/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Ensure the environment variable is set or fallback (useful for local dev outside docker)
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://user:password@localhost:5432/jobseeker_db";

const pool = new Pool({ connectionString });

// Export the db instance with the schema loaded
export const db = drizzle(pool, { schema });
