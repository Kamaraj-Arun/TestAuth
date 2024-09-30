import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { REACT_APP_DEV_URL } from "../../utils/api";

const SetupPassword = () => {
  const mobile = sessionStorage.getItem("mobile");
  const otp = sessionStorage.getItem("otp");
  const [passwordValues, setPasswordValues] = useState({
    pass: "",
    confirmPass: "",
  });
  const navigate = useNavigate();

  const newPasswordSetter = async () => {
    try {
      if (passwordValues.pass !== passwordValues.confirmPass) {
        toast.error("both passwords are not same");
        return;
      }
      const res = await axios.put(`${REACT_APP_DEV_URL}/user/reset-password`, {
        username: mobile,
        otp: otp,
        password: passwordValues.pass,
      });
      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        // console.log("res", res.data.data);
        toast.success(res.data.data.message);
        sessionStorage.removeItem("mobile");
        sessionStorage.removeItem("otp");
        navigate("/sign-in");
      }
    } catch (e) {
      toast.error("Error during new password setup");
    }
  };
  return (
    <div>
      <div>
        <p className="signInText fontPoppins">Set Password</p>
        <div style={{ marginTop: "15px" }}>
          <p className="loginSubtext fontPoppins" style={{ maxWidth: "75%" }}>
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
        </div>
      </div>
      <form className="loginForm">
        <aside>
          <p className="loginLabel fontPoppins">New Password</p>
          <input
            type="password"
            placeholder="enter new password"
            className="fontPoppins"
            onChange={(e) => {
              setPasswordValues((prev) => ({
                ...prev,
                pass: e.target.value,
              }));
            }}
          />
        </aside>
        <aside>
          <p className="loginLabel fontPoppins">Re-enter Password</p>
          <input
            type="password"
            placeholder="re-enter new password"
            className="fontPoppins"
            onChange={(e) => {
              setPasswordValues((prev) => ({
                ...prev,
                confirmPass: e.target.value,
              }));
            }}
          />
        </aside>

        <button className="" type="button" onClick={newPasswordSetter}>
          SET PASSWORD
        </button>
      </form>
    </div>
  );
};

export default SetupPassword;
