import { createPool } from "mysql2/promise";
const usu='p0wiin6yxk8dw4g28awu'
export const conn = createPool({

  database: "clicklunch",
  user: usu,
  host: process.env.DATABASE_HOST,
  password: 'pscale_pw_xwrGA3oIWWWyerROkNP2ZysMzOWaknFopzUpkthWwmz',
  ssl: {
    rejectUnauthorized: false,
  },
});
