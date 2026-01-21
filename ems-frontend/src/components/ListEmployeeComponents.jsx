import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployeesPaged } from '../services/EmployeeService'
import { isAdmin } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {

  const navigate = useNavigate()

  const [employees, setEmployees] = useState([])

  const [page, setPage] = useState(0)
  const [size] = useState(5)
  const [totalPages, setTotalPages] = useState(0)

  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('asc')

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [page, sortBy, sortDir, search])

  function fetchEmployees() {
    setLoading(true)

    listEmployeesPaged(page, size, sortBy, sortDir, search)
      .then(response => {
        const pageData = response.data.data
        setEmployees(pageData.content)
        setTotalPages(pageData.totalPages)
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }

  function addNewEmployee() {
    navigate('/add-employee')
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`)
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => fetchEmployees())
      .catch(error => console.error(error))
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('asc')
    }
    setPage(0)
  }

  function sortArrow(column) {
    if (sortBy !== column) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="container">

      <h2 className="text-center">List of Employees</h2>

      {/* ===== Top Bar ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        {/* ✅ Admin-only: Add Employee */}
        {isAdmin() && (
          <button className="btn btn-primary" onClick={addNewEmployee}>
            Add Employee
          </button>
        )}

        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by first name, last name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(0)
          }}
        />
      </div>

      {/* ===== Table ===== */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
              Employee Id{sortArrow('id')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('firstName')}>
              First Name{sortArrow('firstName')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('lastName')}>
              Last Name{sortArrow('lastName')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
              Email{sortArrow('email')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">Loading...</td>
            </tr>
          ) : employees.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No employees found</td>
            </tr>
          ) : (
            employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>

                  {/* ✅ Admin-only: Update & Delete */}
                  {isAdmin() ? (
                    <>
                      <button
                        className="btn btn-info"
                        onClick={() => updateEmployee(employee.id)}>
                        Update
                      </button>

                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                        onClick={() => removeEmployee(employee.id)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">Read only</span>
                  )}

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== Pagination ===== */}
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-secondary"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

    </div>
  )
}

export default ListEmployeeComponents
