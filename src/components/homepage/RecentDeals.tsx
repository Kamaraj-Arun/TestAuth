import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { recentDeals } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const RecentDeals = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <section>
      <div className="">
        <div className="" style={{ paddingTop: "85px" }}>
          <div className="container">
            <p className="dealsTitle">Recent Trades</p>

            <div
              style={{
                paddingTop: "50px",
                width: "100%",
              }}
            >
              <Slider {...settings}>
                {recentDeals.map((item: any, index: any) => (
                  <div
                    className="recentDealsImgContainerDiv"
                    key={index}
                    onClick={() => {
                      navigate("/deals");
                    }}
                  >
                    <img
                      src={item}
                      alt=""
                      style={{
                        borderRadius: "30px",
                        padding: "10px 12px",
                        width: "200px",
                        height: "300px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentDeals;
