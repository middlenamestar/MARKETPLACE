INSERT INTO departments (dept_name)
VALUES ("CLOTHING"), ("COFFEE"), ("MUSIC"), ("BOOKS"), ("SALES");

INSERT INTO roles (role, department, salary)
VALUES ("STYLIST", 1, 550000), -- role 1
       ("BARISTA", 2, 320000), -- role 2
       ("DJ", 3, 210000), -- role 3
       ("ARCHIVIST", 3, 450000), -- role 4
       ("LIBRARIAN", 4, 500000), -- role 5
       ("CASHIER", 5, 330000); -- role 6

INSERT INTO employees (first_name, last_name, role, supervisor)
VALUES ("BINDI", "ASCLEPIAS", 1, 2), -- EMPLOYEE 1 bindi's supervisor: riot.
       ("RIOT", "ACHILLEA", 2, NULL), -- EMPLOYEE 2
       ("MAYA", "RUDBEKIA", 3, NULL), -- EMPLOYEE 3
       ("TATI", "PAPAVER", 4, 5), -- EMPLOYEE 4 tati's supervisor: alej.
       ("ALEJ", "CICHORIUM", 5, NULL), -- EMPLOYEE 5
       ("STAR", "LOBULARIA", 6, 3); -- EMPLOYEE 6 star's supervisor: maya.