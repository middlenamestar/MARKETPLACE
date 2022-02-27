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

// go back to home list.
const goHome = () => {
    inquirer
        .prompt([
            { type: 'list', name: 'back_home', message: 'Back to home', choices: ['Home'] }
        ])
        .then(() =>
            { Home() }
        );
};

// HOME -- LIST PROMPT. WHAT DO U WANNA DO ?
const Home = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'home',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all job roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Edit employee\'s role'],
            },
        ])
        .then((response) => {
            switch(response.home) {
                case 'View all departments':
                    viewDepts();
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
            };
        });
};

// view all departments
const viewDepts = () => {
    marketplace.query(`SELECT
        dept_id AS ID, dept_name AS Name
        FROM departments`,
        (err, results) => {
            console.log('☆ View All Departments ☆');
            console.table(results);
            goHome();
        }
    );
};

// view roles
const viewRoles = () => {
    marketplace.query(`SELECT
        roles.role_id AS ID,
        roles.role AS Title,
        departments.dept_name AS Department,
        roles.salary AS Salary
        FROM roles
        JOIN departments ON roles.department = departments.dept_id`,
        (err, results) => {
            console.log('☆ View All Roles ☆');
            console.table(results);
            goHome();
        }
    );
}

// view employees
const viewEmployees = () => {
    marketplace.query(`SELECT
        empl.employee_id AS ID,
        CONCAT(empl.first_name, " ", empl.last_name) AS Name,
        roles.role AS Title,
        departments.dept_name AS Department,
        roles.salary AS Salary,
        CONCAT(super.first_name, " ", super.last_name) AS Supervisor
        FROM employees empl
        JOIN roles ON roles.role_id = empl.role
        JOIN departments ON roles.department = departments.dept_id
        LEFT JOIN employees super ON empl.supervisor = super.employee_id;`,
        (err, results) => {
            console.log('☆ View All Employees ☆');
            console.table(results);
            goHome();
        }
    )
}

// add department
const addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'add_dept',
                message: 'What is the name of the department you\'d like to add?'
            },
        ])
        .then((response) => {
            const newDept = response.add_dept;
            // console.log(newDept);
            marketplace.query(`INSERT INTO departments (dept_name)
                VALUES ("${newDept}")`,
                (err, results) => {
                    console.log('Department added to database.');
                    // menu for what to do next.
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'next',
                                message: ' ',
                                choices: ['View departments', 'Home']
                            }
                        ])
                        .then((response) => {
                            switch(response.next) {
                                case 'View departments':
                                    viewDepts();
                                    break;
                                case 'Home':
                                    Home();
                                    break;
                            };
                        });
                }
            )
        })
}

let allDepts = [];
marketplace.query('SELECT dept_name FROM departments', (err, results) => {
    for(const meow of results) {
        // console.log(meow.dept_name);
        allDepts.push(meow.dept_name);
    }
});
// add role
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'add_role',
                message: 'What is the position you\'d like to add?'
            },
            {
                type: 'list',
                name: 'add_role_dept',
                message: 'Which department does the role belong to?',
                choices: allDepts
            },
            {
                type: 'number',
                name: 'add_role_salary',
                message: 'Enter a salary for this position:'
            },
        ])
        .then((response) => {
            const newRole = response.add_role;
            const newRoleDept = response.add_role_dept;
            const newRoleSalary = response.add_role_salary;
            // get DEPT ID in order to insert into table.
            marketplace.query(
                `SELECT dept_id FROM departments WHERE dept_name="${newRoleDept}"`,
                (err, results) => {
                    // insert into roles table.
                    marketplace.query(`INSERT INTO roles (role, department, salary)
                    VALUES ("${newRole}", ${results[0].dept_id}, ${newRoleSalary})`)
                    // console.log(results[0].dept_id)
                }
            );
            console.log('New role added to database.')
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'next',
                        message: ' ',
                        choices: ['View roles', 'Home']
                    }
                ])
                .then((response) => {
                    switch(response.next) {
                        case 'View roles':
                            viewRoles();
                            break;
                        case 'Home':
                            Home();
                            break;
                    };
                });
        });
};



Home();