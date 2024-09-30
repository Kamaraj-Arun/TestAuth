import React from "react";
import logo from "../../assets/Group.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { signInSliderContents } from "../../utils/data";
import { Link } from "react-router-dom";

const SignInLayout = ({ children }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="cardLayout">
            <div
              className="signInSliderContentsContainer"
            // style={{ width: "50%" }}
            >
              <Link
                to="/"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={logo} alt="logo" width={240} />
              </Link>
              <div
                style={{
                  padding: "93px 0px",
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Slider {...settings}>
                  {signInSliderContents.map((item: any) => (
                    <p key={item.id} className="signInSliderContents">
                      {item.content}
                    </p>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="loginLayout"
            // style={{ width: "50%" }}
            >
              <>{children}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInLayout;
