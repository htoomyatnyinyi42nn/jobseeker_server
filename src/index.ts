// src/index.ts
import { Elysia, t } from "elysia";
import { db } from "./db"; // Importing from the file I forgot earlier
import { jobs } from "./db/schema";

const app = new Elysia()
  .get("/", () => "Welcome to Jobseeker API")
  .get("/jobs", async () => {
    // Drizzle now knows 'jobs' is part of the schema automatically,
    // but explicit usage here is fine too.
    return await db.select().from(jobs);
  })
  .post(
    "/jobs",
    async ({ body }) => {
      return await db.insert(jobs).values(body).returning();
    },
    {
      body: t.Object({
        title: t.String(),
        company: t.String(),
        description: t.Optional(t.String()),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Jobseeker API is running at ${app.server?.hostname}:${app.server?.port}`,
);
// // src/index.ts
// import { Elysia, t } from 'elysia';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import { jobs } from './db/schema';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });
// const db = drizzle(pool);

// const app = new Elysia()
//   .get('/jobs', async () => {
//     return await db.select().from(jobs);
//   })
//   .post('/jobs', async ({ body }) => {
//     return await db.insert(jobs).values(body).returning();
//   }, {
//     body: t.Object({
//       title: t.String(),
//       company: t.String(),
//       description: t.Optional(t.String())
//     })
//   })
//   .listen(3000);

// console.log(`🦊 Jobseeker API is running at ${app.server?.hostname}:${app.server?.port}`);

// // import { Elysia } from "elysia";

// // const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

// // console.log(
// //   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// // );
