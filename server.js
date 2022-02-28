const mysql = require('mysql2');
const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const cTable = require('console.table');

const marketplace = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'marketplace_db'
},
    // console.log('CONNECTED TO DATABASE!☆')
);

// GREETING ☃︎
ui.log.write('Welcome to marketplace.™');

