import { createPool } from "mysql2/promise";
export const conn = createPool({
  database: "clicklunch",
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

// export const conn = createPool({
//     host:'localhost',
//     user:'root',
//     password:'LuMITY_BV1',
//     port:3306,
//     database:'clickluch'
// })

// database: clicklunch
// username: 2l3m81j21fxzbehsiz9t
// host: aws.connect.psdb.cloud
// password: pscale_pw_5iIktqxOb7x7Q0Ec419OzTMbRuCEuZnv7Bukc41hD1Q

// database: clicklunch
// username: p0wiin6yxk8dw4g28awu
// host: aws.connect.psdb.cloud
// password: pscale_pw_xwrGA3oIWWWyerROkNP2ZysMzOWaknFopzUpkthWwmz
