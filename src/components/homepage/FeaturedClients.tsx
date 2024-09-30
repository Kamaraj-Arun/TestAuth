import React from "react";
import img1 from "../../assets/netflix.png";
import img2 from "../../assets/itap.png";
import img3 from "../../assets/jio.png";
import img4 from "../../assets/zee.png";
import img5 from "../../assets/amzprime.png";
import img6 from "../../assets/hotstar.png";
import img7 from "../../assets/bms.png";
import img8 from "../../assets/aha.png";
import img9 from "../../assets/bongo.png";
import img10 from "../../assets/msf.png";

const FeaturedClients = () => {
  const clientsData = [
    {
      id: 1,
      imgData: img1,
    },
    {
      id: 2,
      imgData: img2,
    },
    {
      id: 3,
      imgData: img3,
    },
    {
      id: 4,
      imgData: img4,
    },
    {
      id: 5,
      imgData: img5,
    },
    {
      id: 6,
      imgData: img6,
    },
    {
      id: 7,
      imgData: img7,
    },
    {
      id: 8,
      imgData: img8,
    },
    {
      id: 9,
      imgData: img9,
    },
    {
      id: 10,
      imgData: img10,
    },
  ];
  return (
    <section>
      <div className="">
        <div className="" style={{ paddingTop: "113px" }}>
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <p className="clientsTitle">Featured clients</p>

            <div className="clientsContainerBox" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className="row">
                {clientsData.slice(0, 6).map((item: any) => (
                  <img
                    src={item.imgData}
                    alt=""
                    key={item.id}
                    className="clientImage"
                  />
                ))}
              </div>
              <div className="row secondRow">
                {clientsData.slice(6, 10).map((item: any) => (
                  <img
                    src={item.imgData}
                    alt=""
                    key={item.id}
                    className="clientImage"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClients;
