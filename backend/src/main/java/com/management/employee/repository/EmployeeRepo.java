package com.management.employee.repository;

import com.management.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    //Find all employees by their ID
    public Employee findByEmpId(Long empId);
}
