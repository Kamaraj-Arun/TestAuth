import React, { useState } from "react";
import { socialLogin } from "../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { mobileRegex, passwordRegex } from "../../utils/RegExpressions";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const Login = () => {
  const [signInValues, setSignInValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateInput = () => {
    let errors = {
      username: "",
      password: "",
    };

    // Validate username (mobile number)
    if (signInValues.username === "") {
      errors.username = "Please enter mobile number";
    }

    if (
      signInValues.username !== "" &&
      !mobileRegex.test(signInValues.username)
    ) {
      errors.username = "Please enter valid mobile number";
    }

    // Validate password
    if (signInValues.password === "") {
      errors.password = "Please enter a password";
    }
    if (
      signInValues.password !== "" &&
      !passwordRegex.test(signInValues.password)
    ) {
      errors.password = "Invalid password";
    }

    // Set the error state
    setError(errors);

    // Return true if there are no errors
    return !errors.username && !errors.password;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setSignInValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));

    // Reset errors on input change
    setError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleLogin = async () => {
    if (validateInput()) {
      try {
        const loginValues = {
          username: signInValues.username,
          password: signInValues.password,
        };
        const res = await axios.post(
          `${REACT_APP_DEV_URL}/user/login`,
          loginValues
        );

        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          if (res.data.data.name && res.data.data.token) {
            sessionStorage.setItem("mobileno", signInValues.username);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("userName", res.data.data.name);
            toast.success("Loggedin successfully");
            navigate("/");
          } else {
            toast.error(res.data.data.message);
          }
        }
      } catch (error) {
        toast.error("failed during login");
      }
    }
  };

  return (
    <div>
      <div>
        <p className="signInText fontPoppins">SIGN IN</p>
        <p className="loginSubtext fontPoppins">Login to access your account</p>
      </div>
      <form className="loginForm">
        <aside>
          <p className="loginLabel fontPoppins">Mobile</p>
          <input
            type="number"
            placeholder="Please enter mobile"
            className="fontPoppins"
            id="username"
            value={signInValues.username}
            onChange={handleInputChange}
          />
          {error.username && <p className="error">{error.username}</p>}
        </aside>
        <aside>
          <p className="loginLabel fontPoppins">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="fontPoppins"
            id="password"
            value={signInValues.password}
            onChange={handleInputChange}
          />
          {error.password && <p className="error">{error.password}</p>}
        </aside>

        <Link to="/forgot-password">
          <p className="forgotPass fontPoppins">Forgot Password</p>
        </Link>

        <button className="" type="button" onClick={handleLogin}>
          LOGIN
        </button>

        <aside style={{ width: "100%", display: "flex", gap: "6px" }}>
          {socialLogin.map((item: any) => (
            <div className="loginSocial" key={item.id}>
              <img src={item.pic} alt="icon" />
            </div>
          ))}
        </aside>

        <p className="fontPoppins accSignUp ft16 ftw400">
          Don’t have an account?
          <Link to="/sign-up" style={{ color: "#ffffff", marginLeft: '10px' }}>
            <span>Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
