package com.management.employee.controller;

import com.management.employee.model.Employee;
import com.management.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("")
    public List<Employee> getAllEmployees() {
        // This method should return a list of employees, but for now, we return a simple message.
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{empId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long empId) {
        Employee employee = employeeService.getEmployeeById(empId);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        boolean bool = employeeService.addEmployee(employee.getEmpId(), employee.getEmpName(), employee.getDesignation(), employee.getEmpEmail(), employee.getWorkLocation());
        if(!bool){
            return new ResponseEntity<>("Employee Already exists!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Employee Added successfully", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee employee) {
        boolean bool = employeeService.updateEmployee(employee.getEmpId(), employee.getEmpName(), employee.getDesignation(), employee.getEmpEmail(), employee.getWorkLocation());
        if(!bool){
            return new ResponseEntity<>("Employee does not exist!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Employee Updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("delete/{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long empId) {
        boolean bool = employeeService.deleteEmployee(empId);
        if(!bool){
            return new ResponseEntity<>("Employee does not exist!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Employee Deleted successfully", HttpStatus.OK);
    }
}
