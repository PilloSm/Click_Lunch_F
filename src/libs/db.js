import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "clicklunch",
  username: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
