INSERT INTO department_tb (name) VALUES
('IT'),
('FOH Staff'),
('Human Resources'),
('Marketing'),
('Accounting');

INSERT INTO role_tb (title, salary, department) VALUES 
('Software Engineer', 86000, (SELECT id FROM department_tb WHERE name = 'IT')),
('Store Manager', 47500, (SELECT id FROM department_tb WHERE name = 'FOH Staff')),
('HR Manager', 82000, (SELECT id FROM department_tb WHERE name = 'Human Resources')),
('Project Manager', 174000, (SELECT id FROM department_tb WHERE name = 'Marketing')),
('Corporate Buyer', 78000, (SELECT id FROM department_tb WHERE name = 'Accounting')),
('Technician', 75000, (SELECT id FROM department_tb WHERE name = 'IT')),
('Advertising Expert', 90000, (SELECT id FROM department_tb WHERE name = 'Marketing'));

-- Since Nimit is the Project Manager, he is the manager of all the employees. As such, we won't specify a manager for him.
INSERT INTO employee_tb (first_name, last_name, role_id) VALUES 
('Nimit', 'Patel', (SELECT id FROM role_tb WHERE title = 'Project Manager'));

-- All of Nimit's employees will have him as their manager.
INSERT INTO employee_tb (first_name, last_name, role_id, manager_id) VALUES
('Bobby', 'Hoffman', (SELECT id FROM role_tb WHERE title = 'HR Manager'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Denise', 'Marco', (SELECT id FROM role_tb WHERE title = 'Corporate Buyer'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Lloyd', 'Sugarman', (SELECT id FROM role_tb WHERE title = 'Advertising Expert'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('John', 'Smith', (SELECT id FROM role_tb WHERE title = 'Software Engineer'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Scott', 'Saller', (SELECT id FROM role_tb WHERE title = 'Store Manager'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('James', 'Brown', (SELECT id FROM role_tb WHERE title = 'Advertising Expert'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Stevie', 'Wonder', (SELECT id FROM role_tb WHERE title = 'Corporate Buyer'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Bill', 'Withers', (SELECT id FROM role_tb WHERE title = 'Advertising Expert'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Mick', 'Jagger', (SELECT id FROM role_tb WHERE title = 'Technician'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Buck', 'Dharma', (SELECT id FROM role_tb WHERE title = 'HR Manager'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel')),
('Steve', 'Morse ', (SELECT id FROM role_tb WHERE title = 'Technician'), (SELECT id FROM employee_tb WHERE first_name = 'Nimit' AND last_name = 'Patel'));