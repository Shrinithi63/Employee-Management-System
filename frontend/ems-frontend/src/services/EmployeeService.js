import axios from "axios";

const API_BASE_URL = "http://54.209.178.0:8080/employees";
export const listEmployees = axios.get(API_BASE_URL);

export const getEmployeeById = (empId) => {
  return axios.get(`${API_BASE_URL}/${empId}`);
};

export const addEmployee = (employee) => {
  return axios.post(`${API_BASE_URL}/add`, employee);
};

export const updateEmployee = (employee) => {
  return axios.put(`${API_BASE_URL}/update`, employee);
};

export const deleteEmployee = (empId) => {
  return axios.delete(`${API_BASE_URL}/delete/${empId}`);
};
