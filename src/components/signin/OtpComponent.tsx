import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { REACT_APP_DEV_URL } from "../../utils/api";

const OtpComponent = () => {
  const mobile = sessionStorage.getItem("mobile");
  // const otp = sessionStorage.getItem("otp");
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();

  const submitOtp = async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_DEV_URL}/user/verify-mobile-otp`,
        {
          username: mobile,
          otp: otpValue,
        }
      );
      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        // console.log("res", res.data.data);
        if (res.data.data.verification) {
          navigate("/new-password");
        } else {
          toast.error(res.data.data.message);
        }
      }
    } catch (e) {
      toast.error("error during submitting otp");
    }
  };
  return (
    <div>
      <div>
        <p className="signInText fontPoppins">Verify Code</p>

        <div style={{ marginTop: "15px" }}>
          <p className="loginSubtext fontPoppins">
            An authentication code has been sent to your email.
          </p>
        </div>
      </div>
      <form className="loginForm" style={{ marginTop: "25px" }}>
        <aside>
          <p className="loginLabel fontPoppins">Enter Code</p>
          <input
            type="number"
            placeholder="1234"
            className="fontPoppins"
            onChange={(e) => {
              setOtpValue(e.target.value);
            }}
          />
        </aside>

        <aside>
          <p className="fontPoppins ft16 ftw400" style={{ color: "white" }}>
            Didn’t receive a code?{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              Resend
            </span>
          </p>
        </aside>
        <button className="" type="button" onClick={submitOtp}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default OtpComponent;
