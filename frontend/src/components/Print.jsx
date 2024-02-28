import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Print = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployeeList();
    }, []); // Fetch employee list when the component mounts

    const fetchEmployeeList = () => {
        axios.get('http://localhost:8080/printEmpList')
            .then(response => {
                setEmployeeList(response.data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching employee list:', error);
                setError('Error fetching employee list. Please try again later.'); // Set error state
            });
    };

    return (
        <div>
            <h1>Employee List</h1>
            {error && <p>{error}</p>} {/* Display error message if there's an error */}
            <ul>
                {employeeList.map((employee) => (
                    <li key={employee.emp_id}>
                        {employee.emp_name} - {employee.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Print;
