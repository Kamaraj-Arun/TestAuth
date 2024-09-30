import React from "react";
import Forgot from "../components/signin/Forgot";
import SignInLayout from "../components/global/SignInLayout";

const ForgotPassword = () => {
  return (
    <>
      <SignInLayout children={<Forgot />} />
    </>
  );
};

export default ForgotPassword;
