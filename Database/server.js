const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',  // Change this to your MySQL password
    database: 'ems_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL Connected...');
});

// ✅ GET all employees with department & salary
app.get('/employees', (req, res) => {
    const query = `
        SELECT e.id, e.name, e.position, e.salary, d.name AS department
        FROM employees e
        LEFT JOIN departments d ON e.department_id = d.id`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching employees:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("✅ Employees fetched:", results);
        res.json(results);
    });
});

// ✅ CREATE Employee
app.post('/employees', (req, res) => {
    const { name, email, position, department_id, salary } = req.body;
    db.query('INSERT INTO employees (name, email, position, department_id, salary) VALUES ("abc", "abc@gmail.com"," HR", 101, 80000)', 
        [name, email, position, department_id, salary], 
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Employee added!', id: result.insertId });
        }
    );
});

// ✅ UPDATE Employee
app.put('/employees/:id', (req, res) => {
    const { name, email, position, department_id, salary } = req.body;
    db.query('UPDATE employees SET name=?, email=?, position=?, department_id=?, salary=? WHERE id=?', 
        [name, email, position, department_id, salary, req.params.id], 
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Employee updated!' });
        }
    );
});

// ✅ DELETE Employee
app.delete('/employees/:id', (req, res) => {
    db.query('DELETE FROM employees WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Employee deleted!' });
    });
});

// ✅ GET all departments
app.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ CREATE Department
app.post('/departments', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO departments (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Department added!', id: result.insertId });
    });
});

// ✅ DELETE Department
app.delete('/departments/:id', (req, res) => {
    db.query('DELETE FROM departments WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Department deleted!' });
    });
});

// ✅ GET all salaries
app.get('/salaries', (req, res) => {
    db.query('SELECT * FROM salaries', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ CREATE Salary Entry
app.post('/salaries', (req, res) => {
    const { employee_id, amount, date } = req.body;
    db.query('INSERT INTO salaries (employee_id, amount, date) VALUES (?, ?, ?)', 
        [employee_id, amount, date], 
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Salary added!', id: result.insertId });
        }
    );
});

// ✅ DELETE Salary Entry
app.delete('/salaries/:id', (req, res) => {
    db.query('DELETE FROM salaries WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Salary entry deleted!' });
    });
});

// Start Server
app.listen(5000, () => {
    console.log('✅ Server running on port 5000');
});
