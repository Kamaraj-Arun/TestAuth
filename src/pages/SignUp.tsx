import React from "react";
import SignInLayout from "../components/global/SignInLayout";
import SignUpComponent from "../components/signin/SignUp";

const SignUp = () => {
  return (
    <>
      <SignInLayout children={<SignUpComponent />} />
    </>
  );
};

export default SignUp;
