import React from "react";
import OtpComponent from "../components/signin/OtpComponent";
import SignInLayout from "../components/global/SignInLayout";

const Otp = () => {
  return (
    <>
      <SignInLayout children={<OtpComponent />} />
    </>
  );
};

export default Otp;
