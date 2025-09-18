import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",        // change to your MySQL user
  password: "password", // change to your MySQL password
  database: "mydb",    // change to your database name
});

export default db;
