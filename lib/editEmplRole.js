const marketplace = require('../db/connection');

let allEmployees = [];
marketplace.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
    for(const employee of results) {
        allEmployees.push(employee.name);
    }
});

// Edit Employee Role
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

module.exports = {editEmplRole};