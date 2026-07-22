import { useState } from "react";
import "./App.css";
import ListAllEmployee from "./Component/ListAllEmployee";
import HeaderComponent from "./component/Header/HeaderComponent";
import FooterComponent from "./component/Footer/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageComp from "./component/HomePage/HomePageComp";
import AddEmployee from "./component/AddEmployee/AddEmployee";
import UpdateEmployee from "./component/UpdateEmployee/UpdateEmployee";
import DeleteEmployee from "./component/DeleteEmployee/DeleteEmployee";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />
      <div className="flex-grow-1">
        <BrowserRouter>
          <Routes>
            //http://localhost:8080/employees
            <Route path="/" element={<HomePageComp />} />
            <Route path="/employees" element={<ListAllEmployee />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/update" element={<UpdateEmployee />} />
            <Route path="/delete" element={<DeleteEmployee />} />
          </Routes>
        </BrowserRouter>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
