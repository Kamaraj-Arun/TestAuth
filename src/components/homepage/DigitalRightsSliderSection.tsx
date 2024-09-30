import React from "react";
import img1 from "../../assets/anime.png";
import img2 from "../../assets/earth.png";
import img3 from "../../assets/reel.png";
import img4 from "../../assets/entertainment.png";

const DigitalRightsSliderSection = () => {
  const sliderData = [
    {
      id: 1,
      img: img1,
      content: "Content Curation with AI Technology",
    },
    {
      id: 2,
      img: img2,
      content: "Sustain & Grow your audience with our Global Contents",
    },
    {
      id: 3,
      img: img3,
      content: "Rights management with Blockchain Technology",
    },
    {
      id: 4,
      img: img4,
      content:
        "Stay updated to generate new revenue opportunities with emerging rights",
    },
  ];
  return (
    <section>
      <div className="">
        <div style={{ paddingTop: "120px", paddingBottom: "134px" }}>
          <div className="container w-full">
            <p className="sliderTitle">
              Fastest Growing Digital Rights Marketplace
            </p>

            <div className="DigitalRightsSliderCont" style={{ display: "flex", paddingTop: "75px", gap: "40px" }}>
              {sliderData.map((item: any) => (
                <div className="image-container">
                  <img
                    src={item.img}
                    alt="entertainment"
                    className="sliderImage"
                  />
                  <div className="overlay"></div>
                  <div className="sliderImgText">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalRightsSliderSection;
