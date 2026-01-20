package com.ems.employee_backend.service.impl;

import com.ems.employee_backend.dto.EmployeeDto;
import com.ems.employee_backend.entity.Employee;
import com.ems.employee_backend.exception.DuplicateResourceException;
import com.ems.employee_backend.exception.ResourceNotFoundException;
import com.ems.employee_backend.mapper.EmployeeMapper;
import com.ems.employee_backend.repository.EmployeeRepository;
import com.ems.employee_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        employeeRepository.findByEmail(employeeDto.getEmail())
                .ifPresent(employee -> {
                    throw new DuplicateResourceException(
                            "Email already exists: " + employeeDto.getEmail()
                    );
                });

        Employee employee = EmployeeMapper.maptoEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given Id:" +employeeId));

        return EmployeeMapper.maptoEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::maptoEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
                );

        employeeRepository.findByEmail(updateEmployee.getEmail())
                .ifPresent(existingEmployee -> {
                    if (!existingEmployee.getId().equals(employeeId)) {
                        throw new DuplicateResourceException(
                                "Email already exists: " + updateEmployee.getEmail()
                        );
                    }
                });

        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.maptoEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
                );

        employeeRepository.deleteById(employeeId);

    }

    @Override
    public Page<EmployeeDto> getEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir,
            String search) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Employee> employeePage;

        if (search == null || search.trim().isEmpty()) {
            employeePage = employeeRepository.findAll(pageable);
        } else {
            employeePage =
                    employeeRepository
                            .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                                    search, search, search, pageable
                            );
        }

        return employeePage.map(EmployeeMapper::maptoEmployeeDto);
    }

}
