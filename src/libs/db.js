import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "clickluch",
  user: 'root',
  host: 'localhost',
  password: 'LuMITY_BV1',
  ssl: {
    rejectUnauthorized: false,
  },
});
