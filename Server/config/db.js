const config = require('./config');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

let user = 
    `CREATE TABLE IF NOT EXISTS users(
        id INT NOT NULL AUTO_INCREMENT,
        username CHAR(50) NOT NULL,
        password CHAR(128) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE (username)
    )`;

let lists =
    `CREATE TABLE IF NOT EXISTS lists(
        id INT NOT NULL AUTO_INCREMENT,
        resides_user_name CHAR(50) NOT NULL,
        resides_box_name CHAR(50) NOT NULL,
        list_content CHAR(255) NOT NULL,
        list_status TINYINT(1) NOT NULL,
        PRIMARY KEY (id)
    )`;

let createTable = function(sql) {
    return query(sql, []);
};

createTable(user);
createTable(lists);

module.exports = {
    query
};