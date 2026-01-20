package com.ems.employee_backend.service;

import com.ems.employee_backend.dto.EmployeeDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee);
    void deleteEmployee(Long employeeId);

    Page<EmployeeDto> getEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir,
            String search
    );

}
