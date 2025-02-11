import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';

function App() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [showData, setShowData] = useState(false);

    // ✅ Fetch all data when button is clicked
    const fetchData = async () => {
        try {
            const empRes = await axios.get('http://localhost:5000/employees');
            const deptRes = await axios.get('http://localhost:5000/departments');
            const salRes = await axios.get('http://localhost:5000/salaries');
            setEmployees(empRes.data);
            setDepartments(deptRes.data);
            setSalaries(salRes.data);
            setShowData(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <h1>Employee Management System</h1>
            <Button variant="contained" color="primary" onClick={fetchData}>
                Display Data
            </Button>

            {showData && (
                <>
                    {/* Employees Table */}
                    <h2>Employees</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Department</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(emp => (
                                    <TableRow key={emp.id}>
                                        <TableCell>{emp.id}</TableCell>
                                        <TableCell>{emp.name}</TableCell>
                                        <TableCell>{emp.position}</TableCell>
                                        <TableCell>${emp.salary}</TableCell>
                                        <TableCell>{emp.department}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Departments Table */}
                    <h2>Departments</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {departments.map(dept => (
                                    <TableRow key={dept.id}>
                                        <TableCell>{dept.id}</TableCell>
                                        <TableCell>{dept.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
}

export default App;
