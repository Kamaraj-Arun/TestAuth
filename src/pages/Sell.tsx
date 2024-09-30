import React from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import SellStructure from "../components/sell/SellStructure";
import "../styles/sell.css";

const Sell = () => {
  return (
    <>
      <Header />
      <div>
        <div className="container">
          <div className="sellSheetLayout">
            <SellStructure />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
