import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3 custom-footer ">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Employee Management System. All rights
        reserved.
      </p>
    </footer>
  );
};

export default FooterComponent;
