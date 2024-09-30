import React, { useEffect, useState } from "react";
import { recentDeals } from "../../utils/data";

const HeroBanner = () => {
  const [imgData, setImgData] = useState(recentDeals);

  // Shuffle function to rearrange images
  const shuffleImages = () => {
    const shuffled = [...imgData].sort(() => 0.5 - Math.random());
    setImgData(shuffled);
  };

  useEffect(() => {
    const interval = setInterval(shuffleImages, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [imgData]);

  return (
    <section>
      <div className="herobannerBackground">
        <div style={{ paddingTop: "85px" }}>
          <div className="container">
            <div className="heroBanner">
              <div className="bannerContents" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="bannerContents-child" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <h1 className="heroTitle ftw700">
                    World’s Top <br />
                    Digital Rights <br />
                    Marketplace
                  </h1>
                  <p className="heroContent ftw600">
                    Buy - Sell - Secure
                  </p>
                </div>
                <div
                  className="bannerContentOutBox"
                  style={{
                    position: "relative",
                    height: "400px",
                    width: "390px",
                    // marginRight: "120px",
                    // left: '50%',
                    // transform: 'translate(-50%, 0)',
                    // right: '50%'
                    // display: 'none',
                  }}
                >
                  <img
                    src={imgData[0]}
                    alt="Main Poster"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      zIndex: 0,
                      transform: "translateX(-50%)",
                      opacity: "80%",
                    }}
                    className="mainBannerPosterImages"
                  />
                  <img
                    src={imgData[1]}
                    alt="Left Poster"
                    style={{
                      position: "absolute",
                      top: "100px",
                      left: "0",
                      zIndex: 1,
                      transform: "translateX(-25%)",
                      opacity: "85%",
                    }}
                    className="mainBannerPosterImages"
                  />
                  <img
                    src={imgData[3]}
                    alt="Bottom Poster"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "65%",
                      zIndex: 2,
                      transform: "translateX(-60%)",
                      opacity: "90%",
                    }}
                    className="mainBannerPosterImages"
                  />
                  <img
                    src={imgData[2]}
                    alt="Right Poster"
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "100%",
                      zIndex: 3,
                      transform: "translateX(-75%)",
                      opacity: "95%",
                    }}
                    className="mainBannerPosterImages"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
