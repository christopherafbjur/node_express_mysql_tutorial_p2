const mysql = require("mysql2");
const CONFIG = require("./config/db");

const connection = mysql.createConnection(CONFIG);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL server!");
});

module.exports = connection;
