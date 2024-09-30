import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { numberInputOnWheelPreventChange } from "../../utils/helpers";
import { REACT_APP_DEV_URL } from "../../utils/api";

const Forgot = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const forgotPassSubmit = async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_DEV_URL}/user/request-reset-password`,
        {
          username: password,
        }
      );
      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        sessionStorage.setItem("mobile", password);
        sessionStorage.setItem("otp", res.data.data.otp);
        navigate("/otp");
        // console.log("res", res.data.data);
      }
    } catch {
      toast.error("error during setting up forgot password");
    }
  };
  return (
    <div>
      <div>
        <p className="signInText fontPoppins">Forgot Your Password?</p>

        <div style={{ marginTop: "15px" }}>
          <p className="loginSubtext fontPoppins">
            Don’t worry happens to all of us, Enter your email below to recover
            your password
          </p>
        </div>
      </div>
      <form className="loginForm" style={{ marginTop: "25px" }}>
        <aside>
          <p className="loginLabel fontPoppins">Mobile</p>
          <input
            type="number"
            placeholder="Enter mobile"
            className="fontPoppins"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onWheel={numberInputOnWheelPreventChange}
          />
        </aside>

        <button className="" onClick={forgotPassSubmit} type="button">
          SUBMIT
        </button>

        <p
          className="fontPoppins accSignUp ft16 ftw400"
          style={{ marginTop: "25px" }}
        >
          Back to!{" "}
          <Link to="/sign-in" style={{ color: "#ffffff" }}>
            <span>Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Forgot;
