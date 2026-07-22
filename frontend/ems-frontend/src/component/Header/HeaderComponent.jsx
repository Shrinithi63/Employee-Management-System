import React from "react";
import "./HeaderComponent.css"; // Assuming you have a CSS file for styling
const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1 custom-title">
            <i className="fas fa-users me-2"></i>
            Employee Management System
          </span>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
