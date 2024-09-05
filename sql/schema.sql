DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department_tb(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role_tb (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department INTEGER,
    FOREIGN KEY (department) REFERENCES department_tb(id) ON DELETE SET NULL
);

CREATE TABLE employee_tb (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role_tb(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee_tb(id) ON DELETE SET NULL
);