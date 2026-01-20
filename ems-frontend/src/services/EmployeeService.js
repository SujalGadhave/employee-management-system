import api from "./api";

const REST_API_BASE_URL = "/api/employees";

export const listEmployeesPaged = (
  page = 0,
  size = 5,
  sortBy = "id",
  sortDir = "asc",
  search = ""
) =>
  api.get(
    `${REST_API_BASE_URL}/paged?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`
  );

export const createEmployees = (employee) =>
  api.post(REST_API_BASE_URL, employee);

export const getEmployee = (id) =>
  api.get(`${REST_API_BASE_URL}/${id}`);

export const updateEmployee = (id, employee) =>
  api.put(`${REST_API_BASE_URL}/${id}`, employee);

export const deleteEmployee = (id) =>
  api.delete(`${REST_API_BASE_URL}/${id}`);
