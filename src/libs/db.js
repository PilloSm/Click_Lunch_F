import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "clicklunch",
  user: 'unamusn7qg592mugxggs',
  host: process.env.DATABASE_HOST,
  password: 'pscale_pw_C179ZTwv9Yt6Tl6e1eDG68MbcrIH7nyTD5P7Is6OZLm',
  ssl: {
    rejectUnauthorized: false,
  },
});
