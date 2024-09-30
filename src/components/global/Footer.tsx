import React, { useState } from "react";
import "../../styles/footer.css";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_DEV_URL } from "../../utils/api";
import toast from "react-hot-toast";

const footerSocial = [
  {
    id: 1,
    link: "https://www.facebook.com/producerbazaarofficial?mibextid=LQQJ4d&rdid=aVNBGEndcfOeX10o&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FL8qLLhFj6xmPyhLJ%2F%3Fmibextid%3DLQQJ4d",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    link: "https://x.com/producerbazaar",
    icon: <RiTwitterXFill />,
  },
  {
    id: 3,
    link: "https://www.linkedin.com/company/producerbazaarofficial/",
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    link: "https://www.youtube.com/@producerbazaar4202",
    icon: <FaYoutube />,
  },
  {
    id: 5,
    link: "https://www.instagram.com/producerbazaar/",
    icon: <FaInstagram />,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";

  const paymentVerification = async () => {
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
    }
  };

  return (
    <footer
      className="w-full"
      style={{ backgroundColor: "#2F005D" }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="foocont">
          <div className="fooContentContainer" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
              <p
                className="footerTitle"
                onClick={() => {
                  navigate("/");
                }}
              >
                Producer Bazaar
              </p>
              <p className="footerText">
                Unlocking the Value of Film Rights, Driving <br /> Transparent
                Monetization for Years to Come.
              </p>
            </div>
            <div className="footerLinks">
              <div>
                <li
                  onClick={() => {
                    navigate("/market-place");
                  }}
                >
                  Marketplace
                </li>
                <li
                  onClick={() => {
                    paymentVerification();
                  }}
                >
                  Sell
                </li>
                <li
                  onClick={() => {
                    navigate("/static-buy");
                  }}
                >
                  Buy
                </li>
              </div>
              <div>
                <li>About us</li>
                <li>Blog</li>
                <li>Contact us</li>
              </div>
              <div>
                <li
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Login
                </li>
                <li>Support</li>
                <li>Privacy</li>
              </div>
            </div>
            <div>
              <p className="connectTitle">Connect With Us</p>

              <div className="socialLinksContainer">
                {footerSocial.map((item: any) => (
                  <a
                    style={{ padding: "12px" }}
                    key={item.id}
                    className="socialLinks"
                    href={item.link}
                    target="blank"
                  >
                    <span className="socialIcons">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footerCopyRight">
            <div>
              <p>© ProducerBazaar 2024. All Rights Reserved.</p>
            </div>
            <div style={{ display: "flex", gap: "40px" }}>
              <p>Terms of Use</p>
              <p>Cookie Policy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
