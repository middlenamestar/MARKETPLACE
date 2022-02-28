const marketplace = require('../db/connection');

let allDepts = [];
marketplace.query('SELECT dept_name FROM departments', (err, results) => {
    for(const meow of results) {
        // console.log(meow.dept_name);
        allDepts.push(meow.dept_name);
    }
});

// Add Role
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
                        choices: ['View Roles', 'Main Menu']
                    }
                ])
                .then((response) => {
                    switch(response.next) {
                        case 'View Roles':
                            viewRoles();
                            break;
                        case 'Main Menu':
                            mainMenu();
                            break;
                    };
                });
        });
};

module.exports = {addRole};