import React from "react";
import bgImage from "../../assets/bgSellBanner.png";
import { useNavigate } from "react-router-dom";

const SellBanner = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="">
        <div className="" style={{ padding: "125px 0px" }}>
          <div className="container">
            <div
              style={{
                backgroundImage: `url(${bgImage})`,
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: 'wrap',
                  padding: "100px 80px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p className="sellBannerTitle ftw700">
                    Start Selling Movies & Digital Rights <br />
                    At The Right Price
                  </p>
                </div>
                <div className="sellBannerDiv" style={{ display: "flex", gap: "25px", flexWrap: 'wrap' }}>
                  <p className="chatSaleBtn ft16">Chat with Sales Team</p>
                  <p
                    className="ft16 signSaleBtn"
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    Signup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBanner;
