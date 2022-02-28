const mysql = require('mysql2');

const marketplace = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'marketplace_db'
},
    console.log('CONNECTED TO DATABASE!☆')
);

module.exports = marketplace;