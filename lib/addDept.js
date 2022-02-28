const marketplace = require('../db/connection');

// Add Department
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
                                choices: ['View Departments', 'Main Menu']
                            }
                        ])
                        .then((response) => {
                            switch(response.next) {
                                case 'View Departments':
                                    viewDepts();
                                    break;
                                case 'Main Menu':
                                    mainMenu();
                                    break;
                            };
                        });
                }
            )
        })
}

module.exports = {addDept};