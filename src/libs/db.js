import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "railway",
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: 57256,
  ssl: {
    rejectUnauthorized: false,
  },
});
