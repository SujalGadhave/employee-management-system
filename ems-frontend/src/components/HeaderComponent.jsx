import { useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../services/AuthService";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/employees")}
      >
        Employee Management System
      </span>

      {isAuthenticated() && (
        <button
          className="btn btn-outline-light"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default HeaderComponent;
