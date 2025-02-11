CREATE DATABASE ems_db;
USE ems_db;
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL,
    department_id INT,
    salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE salaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


DESC salaries;

INSERT INTO departments (id, name, location) VALUES 
(1, 'Engineering', 'New York'),
(2, 'Marketing', 'Los Angeles'),
(3, 'Human Resources', 'Chicago'),
(4, 'Finance', 'San Francisco'),
(5, 'Sales', 'Miami');

INSERT INTO employees (id, name, position, salary, department_id) VALUES 
(1, 'John Doe', 'Software Engineer', 75000, 1),
(2, 'Jane Smith', 'Marketing Manager', 68000, 2),
(3, 'Emily Davis', 'HR Coordinator', 55000, 3),
(4, 'Michael Brown', 'Financial Analyst', 72000, 4),
(5, 'Chris Johnson', 'Sales Executive', 60000, 5);

INSERT INTO employees (id, name, email, position, salary, department_id) VALUES 
(1, 'John Doe', 'john.doe@example.com', 'Software Engineer', 75000, 1),
(2, 'Jane Smith', 'jane.smith@example.com', 'Marketing Manager', 68000, 2),
(3, 'Emily Davis', 'emily.davis@example.com', 'HR Coordinator', 55000, 3),
(4, 'Michael Brown', 'michael.brown@example.com', 'Financial Analyst', 72000, 4),
(5, 'Chris Johnson', 'chris.johnson@example.com', 'Sales Executive', 60000, 5);

INSERT INTO salaries (id, employee_id, amount, payment_date) VALUES 
(1, 1, 75000, '2024-02-01'),
(2, 2, 68000, '2024-02-01'),
(3, 3, 55000, '2024-02-01'),
(4, 4, 72000, '2024-02-01'),
(5, 5, 60000, '2024-02-01');


USE ems_db;
SELECT * FROM employees;
SELECT * FROM departments;
SELECT * FROM salaries;
