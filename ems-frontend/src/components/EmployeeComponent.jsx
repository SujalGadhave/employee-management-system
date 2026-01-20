import React, { useEffect, useState } from "react";
import {
  createEmployees,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // ===================== FETCH EMPLOYEE =====================
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch(() => {
          setError("Failed to load employee");
        });
    }
  }, [id]);

  // ===================== VALIDATION =====================
  const validForm = () => {
    let valid = true;
    const tempErrors = { ...errors };

    if (!firstName.trim()) {
      tempErrors.firstName = "First name is required";
      valid = false;
    } else tempErrors.firstName = "";

    if (!lastName.trim()) {
      tempErrors.lastName = "Last name is required";
      valid = false;
    } else tempErrors.lastName = "";

    if (!email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else tempErrors.email = "";

    setErrors(tempErrors);
    return valid;
  };

  // ===================== SAVE / UPDATE =====================
  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    setError("");

    if (!validForm()) return;

    const employee = { firstName, lastName, email };
    setLoading(true);

    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await createEmployees(employee);
      }
      navigate("/employees");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already exists");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===================== UI =====================
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">
            {id ? "Update Employee" : "Add Employee"}
          </h2>

          <div className="card-body">
            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            <form>
              {/* FIRST NAME */}
              <div className="mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="invalid-feedback">{errors.firstName}</div>
              </div>

              {/* LAST NAME */}
              <div className="mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="invalid-feedback">{errors.lastName}</div>
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <button
                className="btn btn-success w-100"
                onClick={saveOrUpdateEmployee}
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
