import React from "react";
import SetupPassword from "../components/signin/SetupPassword";
import SignInLayout from "../components/global/SignInLayout";

const NewPassword = () => {
  return (
    <>
      <SignInLayout children={<SetupPassword />} />
    </>
  );
};

export default NewPassword;
