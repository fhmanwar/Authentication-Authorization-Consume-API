const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'iboydev',
    password: 'P@554mysql',
    database: 'db_tes',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
})


module.exports = {
    host: '127.0.0.1',
    port: 5001,
    dbConn: pool,
    secret: 'Backend-Test'
}