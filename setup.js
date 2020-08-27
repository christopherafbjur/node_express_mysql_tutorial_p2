const mysql = require("mysql2");
const CONFIG = require("./config/db");

const SETUP_DB_QUERY = `
  CREATE DATABASE IF NOT EXISTS ${CONFIG.database} DEFAULT CHARACTER SET 'utf8';

  USE ${CONFIG.database};

  CREATE TABLE IF NOT EXISTS messages (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text varchar(255) NOT NULL
  );
`;

function createConnection(config, query) {
  const { host, user, password } = config;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    multipleStatements: true,
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL server!");
    createAndSetupDatabase(connection, query);
  });
}

function createAndSetupDatabase(connection, query) {
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.log("Database created and setup!");
  });
}
createConnection(CONFIG, SETUP_DB_QUERY);
