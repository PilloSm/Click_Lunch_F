import { createPool } from "mysql2/promise";
export const conn = createPool({
  database: "clicklunch",
  user: process.env.DATABASE_USERNAME,
  host: "aws.connect.psdb.cloud",
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

// database: clicklunch
// username: p0wiin6yxk8dw4g28awu
// host: aws.connect.psdb.cloud
// password: pscale_pw_xwrGA3oIWWWyerROkNP2ZysMzOWaknFopzUpkthWwmz
