USE employee_db;

INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Sales"),
    ("Legal");
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Senior Marketing Exec", 2500000, 1),
    ("Marketing Exec", 1500000, 1),
    ("Junior Marketing Exec", 500000, 1),
    ("Marketing Assistant", 10000, 1),
    ("Senior Sales Exec", 3000000, 2),
    ("Sales Exec", 2500000, 2),
    ("Junior Sales Exec", 1500000, 2),
    ("Senior Legal Exec", 4000000, 3),
    ("Legal Exec", 2500000, 3),
    ("Junior Legal Exec", 1500000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("David", "Johnson", 2, 1),
    ("Gomez", "Jenkins", 3, 2),
    ("Henrietta", "Jones", 4, 3),
    ("Austin", "Brown", 5, NULL),
    ("Todd", "Lamb", 6, 5);

    