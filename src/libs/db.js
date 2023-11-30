import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "clickluch",
  user: 'root',
  host: 'localhost',
  password: 'LuMITY_BV1',
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
});
