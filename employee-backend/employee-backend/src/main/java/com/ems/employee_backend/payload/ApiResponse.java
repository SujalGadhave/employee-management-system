package com.ems.employee_backend.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private T data;
    private Object errors;

    public static <T> ApiResponse<T> success(int status, String message, T data) {
        return new ApiResponse<>(
          LocalDateTime.now(),
          status,
          message,
          data,
          null
        );
    }

    public static ApiResponse<?> error(int status, String message, Object errors) {
        return new ApiResponse<>(
                LocalDateTime.now(),
                status,
                message,
                null,
                errors
        );
    }
}
