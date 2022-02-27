const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const marketplace = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'marketplace_db'
},
    console.log('CONNECTED TO DATABASE!☆')
);

// marketplace.query(`SELECT dept_name FROM departments`,
//                         (err, results) => {
//                             for(let i = 0; i < results.length; i++){
//                                 console.log(Object.values(i))
//                             }
//                         }
//                     )

let allDepts = [];
marketplace.query('SELECT * FROM departments', (err, results) => {
    for(const meow of results) {
        // console.log(meow.dept_name);
        allDepts.push(meow);
    }
});