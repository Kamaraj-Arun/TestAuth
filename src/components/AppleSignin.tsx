import React from "react";
import { FaApple } from "react-icons/fa";

const AppleSignin = () => {
  return (
    <div>
      <button className="signInThirdPartyBtns">
        <FaApple /> <span>Sign In with Apple</span>{" "}
      </button>
    </div>
  );
};

export default AppleSignin;
