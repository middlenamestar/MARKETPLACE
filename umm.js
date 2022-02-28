const mysql = require('mysql2');
const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const cTable = require('console.table');

const viewDepts = require('./lib/viewDepts');
const viewRoles = require('./lib/viewRoles');
const viewEmployees = require('./lib/viewEmployees');
const addDept = require('./lib/addDept');
const addRole = require('./lib/addRole');
const addEmployee = require('./lib/addEmployee');
const editEmplRole = require('./lib/editEmplRole');

// GREETING ☃︎
ui.log.write('Welcome to marketplace.™');

// Main Menu
const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all job roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Edit employee\'s role'],
            },
        ])
        .then((response) => {
            switch(response.main) {
                case 'View all departments':
                    viewDepts.viewDepts();
                    break;
                case 'View all job roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Edit employee\'s role':
                    editEmplRole();
                    break;
            };
        });
};

mainMenu();

module.exports = {mainMenu};