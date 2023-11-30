import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: 'clicklunch',
  user: vo9zbl973a7jeoax56hs,
  host: 'aws.connect.psdb.cloud',
  password: 'pscale_pw_G7mXmMTKOmKxWsfU7IdVoiPJKBAaIwcqbU96wgrEKD8',
  ssl: {
    rejectUnauthorized: false,
  },
});
