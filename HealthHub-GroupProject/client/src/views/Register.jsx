import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateRegisterForm = () => {
    const errors = {};

    if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }
    try {
      const capitalizedFirstName =
        formData.firstName.charAt(0).toUpperCase() +
        formData.firstName.slice(1);
      const capitalizedLastName =
        formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1);
      const data = {
        ...formData,
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
        confirmPassword: formData.confirmPassword,
      };
      const res = await axios.post("http://localhost:8000/user/register", data);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
      setFormErrors(error.response.data.message);
      if (error.response.data.message === "Email already exists") {
        setFormErrors({ email: "This email is already registered" });
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-5 py-2 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-4xl font-semibold">Create New Acoount</h1>
          <p className="font-medium text-sm	 text-gray-500 mt-4">
            Please enter you details to create a new account.
          </p>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-sm	 font-medium">First Name</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                {formErrors.firstName && (
                  <p className="text-red-500">{formErrors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm	 font-medium">Last Name</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                {formErrors.lastName && (
                  <p className="text-red-500">{formErrors.lastName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm	 font-medium">Email</label>
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
                <label className="text-sm	 font-medium">Password</label>
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
              <div className="flex flex-col mt-4">
                <label className="text-sm	 font-medium">Confirm Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type={"password"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500">{formErrors.confirmPassword}</p>
                )}
              </div>
              <div className="mt-5 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-sm	"
                >
                  Create
                </button>
              </div>
              <div className="mt-3 mb-3 flex justify-center items-center">
                <p className="font-medium text-sm">Have an account?</p>
                <a href="/">
                  <button className="ml-2 font-medium text-sm text-violet-500">
                    <a href="/login">Login</a>
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

export default Register;
