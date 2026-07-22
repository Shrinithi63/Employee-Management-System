import React, { useState, useEffect } from "react";
import { deleteEmployee } from "../../services/EmployeeService";
import { getEmployeeById } from "../../services/EmployeeService";
import { listEmployees } from "../../services/EmployeeService";
const DeleteEmployee = () => {
  const [employee, setEmployee] = useState({
    empId: "",
    empName: "",
    designation: "",
    empEmail: "",
    workLocation: "",
  });

  const [employeeIds, setEmployeeIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all employee IDs on mount
  useEffect(() => {
    listEmployees
      .then((res) => {
        const ids = res.data.map((emp) => emp.empId);
        setEmployeeIds(ids);
      })
      .catch((err) => {
        console.error("Error fetching employee IDs", err);
      });
  }, []);

  // Fetch employee details when empId changes
  useEffect(() => {
    if (employee.empId) {
      setLoading(true);
      getEmployeeById(employee.empId)
        .then((res) => {
          setEmployee({
            empId: res.data.empId,
            empName: res.data.empName,
            designation: res.data.designation,
            empEmail: res.data.empEmail,
            workLocation: res.data.workLocation,
          });
        })
        .catch((err) => {
          console.error("Error fetching employee details", err);
        })
        .finally(() => setLoading(false));
    }
  }, [employee.empId]);

  const handleIdChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      empId: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteEmployee(employee.empId)
      .then(() => {
        alert("Employee deleted successfully!");
      })
      .catch((err) => {
        alert("Error deleting employee");
        console.error(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="update-employee-form"
        className="container mt-5 p-4 border rounded shadow bg-white pb-5"
      >
        <h2 id="update-employee-title">Delete Employee</h2>
        <br />
        <div className="mb-3">
          <label htmlFor="empId" className="form-label">
            Employee ID
          </label>
          <select
            value={employee.empId}
            className="form-select"
            onChange={handleIdChange}
            required
          >
            <option value="">Select Employee ID</option>
            {employeeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        {employee.empId && !loading && (
          <>
            <div className="mb-3">
              <label htmlFor="empName" className="form-label">
                Employee Name
              </label>
              <input
                type="text"
                name="empName"
                className="form-control"
                value={employee.empName}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                className="form-control"
                value={employee.designation}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="empEmail" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                name="empEmail"
                className="form-control"
                value={employee.empEmail}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="workLocation" className="form-label">
                Work Location
              </label>
              <input
                type="text"
                name="workLocation"
                className="form-control"
                value={employee.workLocation}
                readOnly
                disabled
              />
            </div>
            <button
              id="update-employee-submit"
              type="submit"
              className="btn btn-dark w-100"
            >
              Delete Employee
            </button>
          </>
        )}
        {loading && <p>Loading employee details...</p>}
      </form>
    </div>
  );
};

export default DeleteEmployee;
