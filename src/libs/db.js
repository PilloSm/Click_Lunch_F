import { createPool } from "mysql2/promise";

export const conn = createPool({
<<<<<<< HEAD
  database: 'clicklunch',
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  ssl:{
    rejectUnauthorized:false
  }
});
=======
  host: "localhost",
  user: "root",
  password: "admin",
  port: 3306,
  database: "clicklunch",
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
>>>>>>> 843473730b1722d45ad0cd88c738dac1ad020fc6
