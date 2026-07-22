import React from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const HomePageComp = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        id="home-page-container"
        className="container text-center mt-5 d-grid gap-2 col-6 mx-auto"
      >
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => navigate("/add")}
        >
          <i className="bi bi-person-plus-fill me-2"></i>
          Add Employee
        </button>
        <br />
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => navigate("/employees")}
        >
          <i className="bi bi-eye me-2"></i>
          View Employees
        </button>
        <br />
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => navigate("/update")}
        >
          <i className="bi bi-pencil me-2"></i>
          Update Employee
        </button>
        <br />
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => navigate("/delete")}
        >
          <i className="bi bi-trash me-2"></i>
          Delete Employee
        </button>
      </div>
    </div>
  );
};

export default HomePageComp;
