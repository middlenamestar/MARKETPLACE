const marketplace = require('../db/connection');

// View All Roles
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
            backToMain();
        }
    );
}

module.exports = {viewRoles};