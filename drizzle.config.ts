// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts", // Check if this path is correct!
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/jobseeker_db",
  },
});
