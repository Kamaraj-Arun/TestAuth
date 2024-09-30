import React from "react";
import img1 from "../../assets/update1.png";
import img2 from "../../assets/update2.png";
import img3 from "../../assets/update3.png";
import img4 from "../../assets/update4.png";
import img5 from "../../assets/update5.png";
import { FaArrowRight } from "react-icons/fa";

const RecentUpdates = () => {
  const updateData = [
    {
      id: 1,
      imgData: img2,
      content: "Producer Bazaar welco...",
    },
    {
      id: 2,
      imgData: img3,
      content: "Bhakti Kandalkar joi...",
    },
    {
      id: 3,
      imgData: img4,
      content: "Producerbazaar to S...",
    },
    {
      id: 4,
      imgData: img5,
      content: "Producer Baza...",
    },
  ];
  return (
    <section>
      <div>
        <div className="container">
          <div>
            <p className="updateTitle">Recent Updates</p>

            <div
              className="recent-Updates"
              style={{
                paddingTop: "75px",
                display: "flex",
                // flexWrap: 'wrap',
                gap: "25px",
                width: "100%",
              }}
            >
              <div className="blogMainImgContainer">
                <div className="imageWrapper">
                  <img src={img1} alt="blog" className="blogMainImg" />
                  <div className="overlayText">
                    <p style={{ fontSize: "18px" }}>
                      Producer Bazaar and Medi...
                    </p>
                    <p>
                      {" "}
                      <FaArrowRight className="updateIcon" />{" "}
                    </p>
                  </div>
                  <div className="overlayGradient"></div>
                </div>
              </div>
              <div className="recentUpdateGridContainer">
                {updateData.map((item: any) => (
                  <div className="blogSideImgContainer" key={item.id}>
                    <div className="imageWrapper">
                      <img
                        src={item.imgData}
                        alt="blog"
                        className="blogMainImg"
                      />
                      <div className="overlayText">
                        <p style={{ fontSize: "14px" }}>{item.content}</p>
                        <p>
                          <FaArrowRight
                            className="updateIcon"
                            style={{ fontSize: "14px" }}
                          />
                        </p>
                      </div>
                      <div className="overlayGradient"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentUpdates;
