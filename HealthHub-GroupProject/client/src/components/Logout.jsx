import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Logout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/") {
    return null; // Hide the Logout component on the Login and Register pages
  }

  const logmeout = () => {
    axios
      .post("http://localhost:8000/user/logout")
      .then((res) => {
        window.localStorage.removeItem("authToken");
        window.localStorage.removeItem("user");
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  if (!window.localStorage.getItem("authToken")) {
    navigate("/login");
  }

  return (
    <div className="">
      <button className="btn btn-secondary " onClick={() => logmeout()}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
