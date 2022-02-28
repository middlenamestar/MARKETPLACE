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
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Edit employee\'s role':
                    editEmplRole();
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

let allRoles = [];
marketplace.query('SELECT role FROM roles', (err, results) => {
    for(const role of results) {
        allRoles.push(role.role);
    }
});

let assignSupervisor = [];
marketplace.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
    for(const employee of results) {
        assignSupervisor.push(employee.name);
    }
    assignSupervisor.push('None');
});

// add employee
const addEmployee = () => {
    ui.log.write('Congrats on a new employee!');
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'add_empl_firstn',
                message: 'What is their first name?'
            },
            {
                type: 'input',
                name: 'add_empl_lastn',
                message: 'What is their last name?'
            },
            {
                type: 'list',
                name: 'add_empl_role',
                message: 'Assign their role:',
                choices: allRoles
            },
            {
                type: 'list',
                name: 'add_empl_super',
                message: 'Assign their supervisor:',
                choices: assignSupervisor
            },
        ])
        .then((response) => {
            const newEmplFirstN = response.add_empl_firstn;
            const newEmplLastN = response.add_empl_lastn;
            const newEmplRole = response.add_empl_role;
            // select employee ID from response.
            if (response.add_empl_super === 'None') {
                marketplace.query(`SELECT role_id FROM roles WHERE role="${newEmplRole}"`,
                    (err, results) => {
                        marketplace.query(`INSERT INTO employees (first_name, last_name, role, supervisor)
                        VALUES ("${newEmplFirstN}", "${newEmplLastN}", ${results[0].role_id}, NULL)`);
                    }
                )
            } else {
                marketplace.query(
                    `SELECT employee_id FROM employees WHERE CONCAT(first_name, " ", last_name)="${response.add_empl_super}"`,
                    (err, results) => {
                        // set the supervisor var here.
                        const newEmplSuper = results[0].employee_id;
                        // this query is to select role ID from what it currently is: a string.
                        marketplace.query(`SELECT role_id FROM roles WHERE role="${newEmplRole}"`,
                            (err, results) => {
                            // using the results HERE to get the role ID. and finally insert everything into employees table.
                            marketplace.query(`INSERT INTO employees (first_name, last_name, role, supervisor)
                            VALUES ("${newEmplFirstN}", "${newEmplLastN}", ${results[0].role_id}, ${newEmplSuper})`);
                            }
                        )
                    }
                )
            };
            console.log('New employee added to database.');
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'next',
                        message: ' ',
                        choices: ['View employees', 'Home']
                    }
                ])
                .then((response) => {
                    switch(response.next) {
                        case 'View employees':
                            viewEmployees();
                            break;
                        case 'Home':
                            Home();
                            break;
                    };
                });
        });
};

let allEmployees = [];
marketplace.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
    for(const employee of results) {
        allEmployees.push(employee.name);
    }
});

// edit employee role
const editEmplRole = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'edit_empl',
                message: 'Which employee?',
                choices: allEmployees
            },
            {
                type: 'list',
                name: 'update_role',
                message: 'Assign their new role:',
                choices: allRoles
            },
        ])
        .then((response) => {
            const updatedRole = response.update_role;
            marketplace.query(`SELECT employee_id
                FROM employees WHERE CONCAT(first_name, " ", last_name)="${response.edit_empl}"`,
                (err, results) => {
                    const emplToEdit = results[0].employee_id;
                    marketplace.query(`SELECT role_id
                        FROM roles WHERE role="${updatedRole}"`,
                        (err, results) => {
                            marketplace.query(`UPDATE employees 
                                SET role = ${results[0].role_id}
                                WHERE employee_id = ${emplToEdit}`
                            )
                        }
                    )
                }
            )
            console.log('Employee\'s role has been updated.');
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'next',
                        message: ' ',
                        choices: ['View employees', 'Home']
                    }
                ])
                .then((response) => {
                    switch(response.next) {
                        case 'View employees':
                            viewEmployees();
                            break;
                        case 'Home':
                            Home();
                            break;
                    };
                });
        });
};

Home();