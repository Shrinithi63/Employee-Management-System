import React, { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";

const ListAllEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div className="container pb-5 mb-4">
      <br />
      <h2>List Of Employees</h2>
      <br />
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-responsive rounded table-striped table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Work Location</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.empName}</td>
                <td>{employee.designation}</td>
                <td>{employee.empEmail}</td>
                <td>{employee.workLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAllEmployee;
