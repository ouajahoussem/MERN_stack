import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const validateLoginForm = () => {
    const errors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        formData
      );
      const token = response.data.token;
      const { firstName, lastName, _id } = response.data.user;
      console.log(token, firstName, lastName, _id);

      localStorage.setItem("authToken", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ firstName, lastName, _id })
      );
      navigate("/home");
    } catch (error) {
      console.error(error.response);
      setFormErrors({ email: error.response.data.message });
      if (error.response && error.response.status === 400) {
        setFormErrors({ password: "Incorrect email or password" });
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome to <label className="text-violet-500">HealthHub</label></h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome back! Please enter you details.
          </p>
          <form onSubmit={handleLoginSubmit}>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type={"password"}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {formErrors.password && (
                  <p className="text-red-500">{formErrors.password}</p>
                )}
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                >
                  Sign in
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Don't have an account?</p>
                <a href="/">
                  <button className="ml-2 font-medium text-base text-violet-500">
                    <a href="/">Sign up</a>
                  </button>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-cover lg:flex bg-gray-200 w-full h-full ">
        <img
          src="https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          srcset=""
        />
      </div>
    </div>
  );
};

export default Login;
