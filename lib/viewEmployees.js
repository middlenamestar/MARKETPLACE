const marketplace = require('../db/connection');

// View All Employees
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
            backToMain();
        }
    )
}

module.exports = {viewEmployees};