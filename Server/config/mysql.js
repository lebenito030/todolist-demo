const config = require('./config/default');
const mysql = require('mysql')

const pool = mysql.createPool({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, rows) {
            if(err) {
                resolve(err);
            }
        });
    });
}