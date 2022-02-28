const marketplace = require('../db/connection');

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

// Add Employee
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
                        choices: ['View Employees', 'Main Menu']
                    }
                ])
                .then((response) => {
                    switch(response.next) {
                        case 'View Employees':
                            viewEmployees();
                            break;
                        case 'Main Menu':
                            mainMenu();
                            break;
                    };
                });
        });
};

module.exports = {addEmployee};