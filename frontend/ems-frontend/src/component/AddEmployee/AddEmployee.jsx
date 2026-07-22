import React from "react";
import "./AddEmployee.css";
import { addEmployee } from "../../services/EmployeeService";

const AddEmployee = () => {
  const [form, setForm] = React.useState({
    empId: "",
    empName: "",
    designation: "",
    empEmail: "",
    workLocation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    const employeeData = { ...form };
    addEmployee(employeeData)
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        setForm({
          empId: "",
          empName: "",
          designation: "",
          empEmail: "",
          workLocation: "",
        });
        window.alert("Employee added successfully!");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  // Email validation function
  const isValidEmail = (email) => {
    // Simple email regex
    return /^\w+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(email);
  };

  const [emailError, setEmailError] = React.useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, empEmail: value });
    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <form
      id="add-employee-form"
      onSubmit={handleSubmit}
      className="container mt-5 p-4 border rounded shadow bg-white pb-5"
    >
      <h2 id="add-employee-title" className="mb-4 text-center">
        Add Employee
      </h2>
      <div className="mb-3">
        <label htmlFor="empId" className="form-label">
          Employee Id
        </label>
        <input
          type="number"
          id="empId"
          name="empId"
          className="form-control"
          value={form.empId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="empName" className="form-label">
          Employee Name
        </label>
        <input
          type="text"
          id="empName"
          name="empName"
          className="form-control"
          value={form.empName}
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
          id="designation"
          name="designation"
          className="form-control"
          value={form.designation}
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
          id="empEmail"
          name="empEmail"
          className={`form-control${emailError ? " is-invalid" : ""}`}
          value={form.empEmail}
          onChange={handleEmailChange}
          required
        />
        {emailError && <div className="invalid-feedback">{emailError}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="workLocation" className="form-label">
          Work Location
        </label>
        <input
          type="text"
          id="workLocation"
          name="workLocation"
          className="form-control"
          value={form.workLocation}
          onChange={handleChange}
          required
        />
      </div>
      <button
        id="add-employee-submit"
        type="submit"
        className="btn btn-dark w-100"
        disabled={!!emailError}
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
