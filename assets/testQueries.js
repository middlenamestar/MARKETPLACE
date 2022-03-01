// Not of use! Just used a separate js page to test some queries and console logs




// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// const ui = new inquirer.ui.BottomBar();
// const cTable = require('console.table');
// const { Console } = require('console');

// const marketplace = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'rootroot',
//     database: 'marketplace_db'
// },
    // console.log('CONNECTED TO DATABASE!☆')
// );

// marketplace.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
//         console.log(results);
//         for(const employee of results) {
//             allEmployees.push(employee.name);
//         }
//     });

// marketplace.query(`SELECT dept_name FROM departments`,
//                         (err, results) => {
//                             for(let i = 0; i < results.length; i++){
//                                 console.log(Object.values(i))
//                             }
//                         }
//                     )

// let allDepts = [];
// marketplace.query('SELECT * FROM departments', (err, results) => {
//     for(const meow of results) {
        // console.log(meow.dept_name);
//         allDepts.push(meow);
//     }
// });

// let allRoles = [];
// marketplace.query('SELECT role FROM roles', (err, results) => {
//     for(const role of results) {
//         // console.log(role.role);
//         allRoles.push(role.role);
//     }
// });

// let allEmployees = [];
// marketplace.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
//     for(const employee of results) {
//         allEmployees.push(employee.name);
//     }
// });

// console.log(marketplace.query(`SELECT employee_id FROM employees WHERE CONCAT(first_name, " ", last_name)="MAYA RUDBEKIA"`));