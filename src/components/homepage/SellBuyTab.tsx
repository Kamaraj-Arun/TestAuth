import React, { useState } from "react";
import shoppingCartImg from "../../assets/shoppingCart.png";
import sellItemImg from "../../assets/sellTabItem.png";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const sellPoints = [
  {
    id: 1,
    content: "Monitor all your digital rights in one place",
  },
  {
    id: 2,
    content: "Attract more Buyers",
  },
  {
    id: 3,
    content: "Buyers are fully verified",
  },
];

const buyPoints = [
  {
    id: 1,
    content: "Sell on a global marketplace",
  },
  {
    id: 2,
    content: "Attract more buyers using our AI marketing tool",
  },
  {
    id: 3,
    content: "Monitor all your digital rights in one place",
  },
  {
    id: 4,
    content: "Conduct sales and payments safely",
  },
  {
    id: 5,
    content: "Easily handle contract creation & legal reviews",
  },
];

const SellBuyTab = () => {
  const [tab, setTab] = useState("SELL");
  const navigate = useNavigate();
  return (
    <section>
      <div className="">
        <div className="container Sell">
          <div className="tabOptions w-full md:w-1/2 lg:w-1/4">
            <p
              className={`tabTextSell ${tab === "SELL" ? "activeTab" : ""}`}
              onClick={() => {
                setTab("SELL");
              }}
            >
              SELL
            </p>
            <p
              className={`tabTextBuy ${tab === "BUY" ? "activeTab" : ""}`}
              onClick={() => {
                setTab("BUY");
              }}
            >
              BUY
            </p>
          </div>

          <div className="tabContents">
            {tab === "SELL" && (
              <div className="tabContentsChild" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <p className="sellTitle">
                    Simplify Global Content Rights Sales without Complications
                  </p>

                </div>
                <div className="sellContents" style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                  <div className="sellImgContainer">
                    <img
                      className="sellImgContainer"
                      src={sellItemImg}
                      alt=""
                      style={{
                        // width: "480px",
                        height: "360px",
                        padding: "20px",
                      }}
                    />
                  </div>
                  <div>
                    {buyPoints.map((item: any) => (
                      <p key={item.id} className="sellPoints">
                        <CiCircleCheck className="tickIcon" />
                        <span className="sellPointContents">
                          {item.content}
                        </span>
                      </p>
                    ))}

                    <div className="signUpBtnSell-div">
                      <button
                        className="signUpBtnSell"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === "BUY" && (
              <div>
                <p className="sellTitle">
                  Buy Movie Content Rights World Wide Without Complications
                </p>

                <div className="sellContents">
                  <div className="sellImgContainer">
                    <img
                      src={shoppingCartImg}
                      alt=""
                      style={{
                        width: "480px",
                        height: "360px",
                        padding: "20px",
                      }}
                    />
                  </div>
                  <div>
                    {sellPoints.map((item: any) => (
                      <p key={item.id} className="sellPoints">
                        <CiCircleCheck className="tickIcon" />
                        <span className="sellPointContents">
                          {item.content}
                        </span>
                      </p>
                    ))}

                    <button
                      className="signUpBtnSell"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBuyTab;
