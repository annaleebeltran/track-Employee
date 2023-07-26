INSERT INTO department (deptartment_name)
VALUES ('Fiance'),
       ('Software Development'),
       ('Sales'),
       ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Analyst', 80000, 2),
       ('Sales Director', 100000, 3),
       ('Product Manager', 75000, 3),
       ('Controller', 95000, 1),
       ('Software Developer', 90000, 2),
       ('Marketing Manager', 70000, 4),
       ('Office Manager', 68000, 4),
       ('Product Owner', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Annalee', 'Beltran', 2, NULL),
       ('Tony', 'Lee', 1, 2),
       ('Anothony', 'Dionne', 2, 1),
       ('Nancy', 'Santillian', 3, NULL),
       ('Alisah', 'Cervantes', 3, 4),
       ('Priya', 'Amanti', 5, NULL),
       ('Kaite', 'Routon', 5, 10),
       ('Dani', 'Garcia', 8, 6),
       ('Marcelle', 'Joy', 6, 6),
       ('Samsung', 'Choi', 7, NULL),
       ('Swane', 'Rodriguez', 8, 10);