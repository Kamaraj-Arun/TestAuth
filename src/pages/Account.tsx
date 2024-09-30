import React, { useEffect, useState } from "react";
import logo from "../assets/Group.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import "../styles/account.css";
import {
  emailRegex,
  mobileRegex,
  nameRegex,
  passwordRegex,
} from "../utils/RegExpressions";
import axios from "axios";
import { REACT_APP_DEV_URL } from "../utils/api";
import toast from "react-hot-toast";

const Account = () => {
  const username = sessionStorage.getItem("userName") || "";
  const token = sessionStorage.getItem("token") || "";
  const mobileNumber = sessionStorage.getItem("mobileno") || "";
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tab, setTab] = useState("My Account");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    phoneError: "",
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [profile, setProfile] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("mobileno");
    window.location.reload();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUser((prev: any) => ({
      ...prev,
      [id]: value,
    }));

    // Reset errors on input change
    setError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateInput = () => {
    let errors = {
      firstnameError: "",
      lastnameError: "",
      emailError: "",
      phoneError: "",
    };

    // Validate first name
    if (user?.firstname === "") {
      errors.firstnameError = "Please enter your first name.";
    } else if (!nameRegex.test(user?.firstname)) {
      errors.firstnameError =
        "First name should be valid and not contain special characters.";
    }

    // Validate last name
    if (user?.lastname === "") {
      errors.lastnameError = "Please enter your last name.";
    } else if (!nameRegex.test(user?.lastname)) {
      errors.lastnameError =
        "Last name should be valid and not contain special characters.";
    }

    // Validate email
    // if (user?.email === "") {
    //   errors.emailError = "Please enter your email address.";
    // } else if (!emailRegex.test(user?.email)) {
    //   errors.emailError = "Please enter a valid email address.";
    // }

    // Validate phone number
    // if (user?.phone === "") {
    //   errors.phoneError = "Please enter your phone number.";
    // } else if (!mobileRegex.test(user?.phone)) {
    //   errors.phoneError = "Please enter a valid phone number.";
    // }

    // Set the error state
    setError((prev) => ({
      ...prev,
      firstnameError: errors.firstnameError,
      lastnameError: errors.lastnameError,
      emailError: errors.emailError,
      phoneError: errors.phoneError,
    }));

    // Return true if there are no errors
    return (
      !errors.firstnameError &&
      !errors.lastnameError &&
      !errors.emailError &&
      !errors.phoneError
    );
  };

  const handleImageChange = (event: any) => {
    const file = event?.target?.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    if (selectedImage) {
      handleUpload();
    }
  }, [selectedImage]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("user-profile", selectedImage);
      const res = await axios.put(
        `${REACT_APP_DEV_URL}/user/update-dp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setProfile(res.data.data.url);
      }
    } catch {
      toast.error("error uploading file");
    }
  };

  // console.log("selectedImage", selectedImage, profile);

  const validatePassword = () => {
    let errors = {
      oldPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
    };

    // Validate old password
    if (user?.oldPassword === "") {
      errors.oldPasswordError = "Please enter your old password.";
    }

    // Validate new password
    if (user?.newPassword === "") {
      errors.newPasswordError = "Please enter a new password.";
    } else if (!passwordRegex.test(user?.newPassword)) {
      errors.newPasswordError = "invalid password";
    }

    // Validate confirm password
    if (user?.confirmPassword === "") {
      errors.confirmPasswordError = "Please confirm your new password.";
    } else if (user?.newPassword !== user?.confirmPassword) {
      errors.confirmPasswordError = "Passwords do not match.";
    }

    // Set the error state
    setError((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    // Return true if there are no errors
    return (
      !errors.oldPasswordError &&
      !errors.newPasswordError &&
      !errors.confirmPasswordError
    );
  };

  // Function to trigger the file input click
  const handleIconClick = () => {
    const inputElement = document.getElementById("fileInput");
    inputElement?.click(); // Simulate click on the file input
  };

  const onSubmit = async () => {
    if (validateInput()) {
      try {
        const loginValues = {
          name: user.firstname + user.lastname,
          // email: user.email,
          dp: profile,
          // mobile: user.phone,
        };
        const res = await axios.put(
          `${REACT_APP_DEV_URL}/user/update-profile`,
          loginValues,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          // sessionStorage.setItem("userName", res.data.data.name);
          toast.success(res.data.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error("failed during profile set up");
      }
    }
  };

  const passwordChangeHandler = async () => {
    if (validatePassword()) {
      try {
        const loginValues = {
          oldpassword: user.oldPassword,
          newpassword: user.newPassword,
        };
        const res = await axios.post(
          `${REACT_APP_DEV_URL}/user/login`,
          loginValues
        );

        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          if (res.data.data.name && res.data.data.token) {
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("userName", res.data.data.name);
            toast.success("account updated successfully");
            navigate("/");
          } else {
            toast.error(res.data.data.message);
          }
        }
      } catch (error) {
        toast.error("failed during password change");
      }
    }
  };
  return (
    <div>
      <header>
        <div className="headerBackground">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ width: "200px", height: "80px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <img
                  src={logo}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <ul
                style={{
                  display: "flex",
                  gap: "40px",
                  color: "white",
                  listStyle: "none",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{ position: "relative" }}
                  onClick={() => {
                    setIsDropdownOpen(true);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <p className="ftw500" style={{ fontSize: "20px" }}>
                      <FaUserCircle />
                    </p>
                    <p className="ft16 ftw500">{username}</p>
                    <p className="ft16 ftw500" style={{ marginTop: "4px" }}>
                      <FaChevronDown />
                    </p>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="profileDropdown"
                      onMouseLeave={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      <p onClick={() => navigate("/account")}>My Account</p>
                      <p
                        style={{ paddingTop: "12px" }}
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </p>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="container">
          <div className="accountTabOptions">
            <p
              className={`tabTextMyAccount ${
                tab === "My Account" ? "currentTab" : ""
              }`}
              onClick={() => {
                setTab("My Account");
              }}
            >
              My Account
            </p>
            <p
              className={`tabTextChangePassword ${
                tab === "Change Password" ? "currentTab" : ""
              }`}
              onClick={() => {
                setTab("Change Password");
              }}
            >
              Change Password
            </p>
          </div>
          <div className="accountLayout">
            {tab === "My Account" ? (
              <>
                <div className="accPhotoBackgroundContainerDiv">
                  <div
                    className="accPhotoBackground"
                    style={{ position: "relative" }}
                    onClick={() => {
                      handleIconClick();
                    }}
                  >
                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {/* Display the uploaded image or the circle icon */}
                    {selectedImage && profile !== "" ? (
                      <img
                        src={profile}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        onClick={handleIconClick}
                      />
                    ) : (
                      <FaCirclePlus className="accountAddImgIcon" />
                    )}
                  </div>
                </div>
                <div className="accountDetailsLayout">
                  <div
                    className="gridContainerStyle"
                    style={{ marginTop: "0" }}
                  >
                    <div className="gridItemStyle">
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        First Name
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your first name"
                        id="firstname"
                        type="text"
                        value={user.firstname}
                        onChange={handleInputChange}
                      />
                      {error.firstnameError && (
                        <p className="error">{error.firstnameError}</p>
                      )}
                    </div>
                    <div className="gridItemStyle">
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Last Name
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your last name"
                        type="text"
                        id="lastname"
                        value={user.lastname}
                        onChange={handleInputChange}
                      />
                      {error.lastnameError && (
                        <p className="error">{error.lastnameError}</p>
                      )}
                    </div>
                    <div className="gridItemStyle">
                      {" "}
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Email ID
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your email"
                        type="email"
                        id="email"
                        disabled
                        value={user.email}
                        onChange={handleInputChange}
                      />
                      {error.emailError && (
                        <p className="error">{error.emailError}</p>
                      )}
                    </div>
                    <div className="gridItemStyle">
                      {" "}
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Phone Number
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your mobile"
                        type="number"
                        id="phone"
                        disabled
                        value={mobileNumber}
                        onChange={handleInputChange}
                      />
                      {error.phoneError && (
                        <p className="error">{error.phoneError}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="accSubmitBtn">
                  <button
                    className="addButton"
                    style={{ width: "100%" }}
                    type="button"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="accChangePassword">
                  <div>
                    <div>
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Enter Old Password
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your old password"
                        type="password"
                        style={{ width: "100%" }}
                        id="oldPassword"
                        value={user.oldPassword}
                        onChange={handleInputChange}
                      />
                      {error.oldPasswordError && (
                        <p className="error">{error.oldPasswordError}</p>
                      )}
                    </div>
                    <div>
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Enter New Password
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please enter your new password"
                        type="password"
                        style={{ width: "100%" }}
                        id="newPassword"
                        value={user.newPassword}
                        onChange={handleInputChange}
                      />
                      {error.newPasswordError && (
                        <p className="error">{error.newPasswordError}</p>
                      )}
                    </div>
                    <div>
                      <p
                        className="contentLabelName"
                        style={{ color: "white" }}
                      >
                        Re-Enter New Password
                      </p>
                      <input
                        className="contentInput"
                        placeholder="Please re-enter your new password"
                        type="password"
                        style={{ width: "100%" }}
                        id="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {error.confirmPasswordError && (
                        <p className="error">{error.confirmPasswordError}</p>
                      )}
                    </div>
                  </div>

                  <div className="accSubmitBtn">
                    <button
                      className="addButton"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={passwordChangeHandler}
                    >
                      SET PASSWORD
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
