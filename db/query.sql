-- VIEW
-- VIEW ALL DEPARTMENTS:
SELECT * FROM marketplace_db.departments;

-- VIEW ALL ROLES:
SELECT
roles.role_id AS ID,
roles.role,
departments.dept_name AS department,
roles.salary

FROM roles

JOIN departments ON roles.department = departments.dept_id;

-- VIEW ALL EMPLOYEES:
-- tables A and B = empl and super.
SELECT
empl.employee_id AS ID,
CONCAT(empl.first_name, " ", empl.last_name) AS name,
roles.role,
departments.dept_name AS department,
roles.salary,
CONCAT(super.first_name, " ", super.last_name) AS supervisor

FROM employees empl

JOIN roles ON roles.role_id = empl.role
JOIN departments ON roles.department = departments.dept_id
LEFT JOIN employees super ON empl.supervisor = super.employee_id;

-- ADD
-- ADD DEPARTMENT:
INSERT INTO departments (dept_name)
VALUES ("DEPT_X");

-- ADD ROLE:
INSERT INTO roles (role, department, salary)
VALUES ("ROLE_X", 1, 333333)
-- role name is string/varchar, department is going to be a list, salary is going to be integer user chooses to input whatever they want.

-- ADD EMPLOYEE:
INSERT INTO employees (first_name, last_name, role, supervisor)
VALUES ("firstxname", "lastxname", 2, 4)
-- role is list, supervisor is list of ALL EMPLOYEES, doesn't have to be preexisting superv... it's just the employee ID. SELECT CONCAT(employees.first_name, " ", employees.last_name) AS SUPERVISOR FROM employees; also include none option. nah I prob need empl ID too so that when user assigns the employee as new employee's supervisor - it uses the supervisor's ID to assign to the new employee.

-- UPDATE
-- UPDATE EMPLOYEE ROLE:
-- but the prompt SELECTS employee first, then SELECTS role, both in list form.
SELECT CONCAT(first_name, " ", last_name) AS employee
FROM employees;
SELECT role FROM roles; -- but idk if I should use like a joined table in order to UPDATE properly.

-- this is the ultimate query we are going to pass information into:
UPDATE employees 
SET 
    role = 2
WHERE
    employee_id = 1;