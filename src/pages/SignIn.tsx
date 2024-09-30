import SignInLayout from "../components/global/SignInLayout";
import Login from "../components/signin/Login";
import "./../styles/signin.css";

const SignIn = () => {
  return (
    <>
      <SignInLayout children={<Login />} />
    </>
  );
};

export default SignIn;
