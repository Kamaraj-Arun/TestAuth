import React, { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";

const FacebookSignIn = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "414315965101642", // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
    };

    (function (d, s, id) {
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");
          window.FB.api(
            "/me",
            { fields: "id,name,email,birthday,picture" },
            function (response: any) {
              console.log("Good to see you, " + response.name + ".");
              console.log("Your email is " + response.email, response);
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };
  return (
    <div>
      <button onClick={() => handleLogin()} className="signInThirdPartyBtns">
        <FaFacebook /> <span>Sign In with Facebook</span>{" "}
      </button>
    </div>
  );
};

export default FacebookSignIn;
