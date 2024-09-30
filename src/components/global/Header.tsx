import React, { useState } from "react";
import logo from "../../assets/Group.png";
import { PiThumbsUp } from "react-icons/pi";
import "../../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { Loader } from "rsuite";
import axios from "axios";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const Header = () => {
  const username = sessionStorage.getItem("userName") || "";
  const token = sessionStorage.getItem("token") || "";
  const [sellLoader, setSellLoader] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Market Place",
      link: "/market-place",
    },
    {
      id: 3,
      name: "Sell",
      link: "/static-sell",
    },
    {
      id: 4,
      name: "Buy",
      link: "/static-buy",
    },
  ];

  const paymentVerification = async () => {
    setSellLoader(true);

    if (!token) {
      navigate("/static-sell");
      return;
    }

    try {
      const res = await axios.get(
        `${REACT_APP_DEV_URL}/user/get-payment-verification`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        if (res.data.data.isPaymentVerified) {
          navigate("/sell");
        } else {
          window.open("https://rzp.io/l/EbseiUeT");
        }
      }
    } catch (error) {
      toast.error("failed during payment verification");
    } finally {
      setSellLoader(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("mobileno");
    window.location.reload();
  };

  return (
    <div>
      <div className="headerBackground">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div
            style={{
              display: "flex",
              flexWrap: 'wrap',
              justifyContent: "space-between",
              alignItems: "center",
              width: '100%'
            }}
          >
            <div
              className="header-logo"
              style={{ width: "200px", height: "80px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="header-ul">
              <ul
                style={{
                  display: "flex",
                  // gap: "40px",
                  color: "white",
                  listStyle: "none",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {navItems.map((item: any) => (
                  <>
                    {token !== "" && item.name === "Sell" ? (
                      <div
                        style={{ textDecoration: "none", color: "white" }}
                        onClick={() => {
                          paymentVerification();
                        }}
                      >
                        <>
                          {sellLoader ? (
                            <Loader size="sm" content="" />
                          ) : (
                            <li key={item.id} className="ft16">
                              {item.name}
                            </li>
                          )}
                        </>
                      </div>
                    ) : (
                      <Link
                        to={item.link}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <li key={item.id} className="ft16">
                          {item.name}
                        </li>
                      </Link>
                    )}
                  </>
                ))}
                <p
                  className="dealsBtn ft16"
                  onClick={() => {
                    navigate("/deals");
                  }}
                >
                  {" "}
                  <PiThumbsUp style={{ color: "#ffffff", fontSize: "18px" }} />
                  <span>Deals</span>
                </p>

                {username !== "" ? (
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
                ) : (
                  <p
                    className="loginBtn ft14 ftw500"
                    onClick={() => navigate("/sign-in")}
                  >
                    Login
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
