DROP DATABASE IF EXISTS marketplace_db;
CREATE DATABASE marketplace_db;

USE marketplace_db;

CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    department INT NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (department)
    REFERENCES departments(dept_id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role INT NOT NULL,
    supervisor INT REFERENCES employee_id,
    FOREIGN KEY (role)
    REFERENCES roles(role_id)
    ON DELETE CASCADE
);