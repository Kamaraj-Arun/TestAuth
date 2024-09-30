import React, { useState } from "react";
import { socialLogin } from "../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  mobileRegex,
  nameRegex,
  passwordRegex,
} from "../../utils/RegExpressions";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const SignUpComponent = () => {
  const [signUpValues, setSignUpValues] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const validateInput = () => {
    let errors = {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    };

    // Validate username (mobile number)
    if (signUpValues.username === "") {
      errors.username = "Please enter mobile number";
    }

    if (
      signUpValues.username !== "" &&
      !mobileRegex.test(signUpValues.username)
    ) {
      errors.username = "Please enter valid mobile number";
    }

    // Validate name
    if (signUpValues.name === "") {
      errors.name = "Please enter a name";
    }

    if (signUpValues.name !== "" && !nameRegex.test(signUpValues.name)) {
      errors.name =
        "Name should contain 3-30 letters and no special characters";
    }

    // Validate password
    if (signUpValues.password === "") {
      errors.password = "Please enter a password";
    }
    if (
      signUpValues.password !== "" &&
      !passwordRegex.test(signUpValues.password)
    ) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Validate confirm password
    if (signUpValues.confirmPassword === "") {
      errors.confirmPassword = "Please enter a password";
    }
    if (
      signUpValues.confirmPassword !== "" &&
      signUpValues.password !== signUpValues.confirmPassword
    ) {
      errors.confirmPassword = "Passwords did not match";
    }

    // Set the error state
    setError(errors);

    // Return true if there are no errors
    return (
      !errors.username &&
      !errors.name &&
      !errors.password &&
      !errors.confirmPassword
    );
  };

  const createAccount = async () => {
    if (validateInput()) {
      const createAccountValues = {
        username: signUpValues.username,
        name: signUpValues.name,
        password: signUpValues.password,
      };

      try {
        const res = await axios.post(
          `${REACT_APP_DEV_URL}/user/register`,
          createAccountValues
        );

        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/sign-in");
        }
      } catch (error) {
        toast.error("Error during account creation");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setSignUpValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));

    // Reset errors on input change
    setError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  return (
    <div>
      <div>
        <p className="signInText fontPoppins">SIGN UP</p>
        <p className="loginSubtext fontPoppins">
          Let’s create your personal account
        </p>
      </div>
      <form className="loginForm">
        <aside>
          <p className="loginLabel fontPoppins">Mobile</p>
          <input
            type="number"
            placeholder="Please enter mobile"
            className="fontPoppins"
            id="username"
            value={signUpValues.username}
            onChange={handleInputChange}
          />
          {error.username && <p className="error">{error.username}</p>}
        </aside>
        <aside>
          <p className="loginLabel fontPoppins">Full Name</p>
          <input
            type="text"
            placeholder="Enter full name"
            className="fontPoppins"
            id="name"
            value={signUpValues.name}
            onChange={handleInputChange}
          />
          {error.name && <p className="error">{error.name}</p>}
        </aside>
        <aside>
          <p className="loginLabel fontPoppins">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="fontPoppins"
            id="password"
            value={signUpValues.password}
            onChange={handleInputChange}
          />
          {error.password && <p className="error">{error.password}</p>}
        </aside>
        <aside>
          <p className="loginLabel fontPoppins">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm password"
            className="fontPoppins"
            id="confirmPassword"
            value={signUpValues.confirmPassword}
            onChange={handleInputChange}
          />
          {error.confirmPassword && (
            <p className="error">{error.confirmPassword}</p>
          )}
        </aside>

        <button className="" onClick={createAccount} type="button">
          CREATE ACCOUNT
        </button>

        <aside style={{ width: "100%", display: "flex", gap: "6px" }}>
          {socialLogin.map((item: any) => (
            <div className="loginSocial" key={item.id}>
              <img src={item.pic} alt="icon" />
            </div>
          ))}
        </aside>

        <p className="fontPoppins accSignUp ft16 ftw400">
          Already have an account?{" "}
          <Link to="/sign-in" style={{ color: "#ffffff" }}>
            <span>Sign In </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpComponent;
