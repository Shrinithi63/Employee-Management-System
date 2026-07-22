package com.management.employee.service;

import com.management.employee.model.Employee;
import com.management.employee.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepo employeeRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public boolean addEmployee(Long empId, String empName, String designation, String empEmail, String workLocation) {
        // Check if the employee already exists
        if (employeeRepo.existsById(empId)) {
            return false; // Employee already exists
        }

        // Create a new employee object
        Employee employee = new Employee(empId, empName, designation, empEmail, workLocation);


        // Save the new employee to the repository
        employeeRepo.save(employee);
        return true; // Employee added successfully
    }

    public boolean updateEmployee(Long empId, String empName, String designation, String empEmail, String workLocation) {
        // Check if the employee exists
        if (!employeeRepo.existsById(empId)) {
            return false; // Employee does not exist
        }

        // Create a new employee object with updated details
        Employee employee = new Employee(empId, empName, designation, empEmail, workLocation);

        // Save the updated employee to the repository
        employeeRepo.save(employee);
        return true; // Employee updated successfully
    }

    public boolean deleteEmployee(Long empId) {
        // Check if the employee exists
        if (!employeeRepo.existsById(empId)) {
            return false; // Employee does not exist
        }

        // Delete the employee from the repository
        employeeRepo.deleteById(empId);
        return true; // Employee deleted successfully
    }

    public Employee getEmployeeById(Long empId) {
        return employeeRepo.findByEmpId(empId);
    }
}
