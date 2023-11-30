import { createPool } from "mysql2/promise";

export const conn = createPool({
  database: "clicklunch",
  user: "ezafa6bhhv1pma4j8zpp",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_Mi4Y16Vu1rRrRcNSwEDZp9hHqjAltKE6oc9T5NLZIsa",
  ssl: {
    rejectUnauthorized: false,
  },
});
