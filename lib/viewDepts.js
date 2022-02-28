const marketplace = require('../db/connection');
const backToMain = require('./backToMain');

// View All Departments
const viewDepts = () => {
    marketplace.query(`SELECT
        dept_id AS ID, dept_name AS Name
        FROM departments`,
        (err, results) => {
            console.log('☆ View All Departments ☆');
            console.table(results);
            backToMain.backToMain();
        }
    );
};

module.exports = {viewDepts};