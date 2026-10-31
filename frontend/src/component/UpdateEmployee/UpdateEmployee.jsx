import React, { useState, useEffect } from "react";
import { updateEmployee } from "../../services/EmployeeService";
import { getEmployeeById } from "../../services/EmployeeService";
import { listEmployees } from "../../services/EmployeeService";
import "./UpdateEmployee.css";

const UpdateEmployee = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIdChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      empId: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employee)
      .then(() => {
        alert("Employee updated successfully!");
      })
      .catch((err) => {
        alert("Error updating employee");
        console.error(err);
      });
  };

  // Email validation function
  const isValidEmail = (email) => {
    // Simple email regex
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  };

  const [emailError, setEmailError] = React.useState("");

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="update-employee-form"
        className="container mt-5 p-4 border rounded shadow bg-white pb-5"
      >
        <h2 id="update-employee-title">Update Employee Details</h2>
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="empEmail" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                name="empEmail"
                className={`form-control${emailError ? " is-invalid" : ""}`}
                value={employee.empEmail}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
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
                onChange={handleChange}
                required
              />
            </div>
            <button
              id="update-employee-submit"
              type="submit"
              className="btn btn-dark w-100"
              disabled={!!emailError}
            >
              Update Employee
            </button>
          </>
        )}
        {loading && <p>Loading employee details...</p>}
      </form>
    </div>
  );
};

export default UpdateEmployee;
