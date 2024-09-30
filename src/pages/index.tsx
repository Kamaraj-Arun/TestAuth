import React from "react";
import "../styles/home.css";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import HeroBanner from "../components/homepage/HeroBanner";
import RecentDeals from "../components/homepage/RecentDeals";
import SellBuyTab from "../components/homepage/SellBuyTab";
import FeaturedClients from "../components/homepage/FeaturedClients";
import IndustryTesti from "../components/homepage/IndustryTesti";
import SellBanner from "../components/homepage/SellBanner";
import DigitalRightsSliderSection from "../components/homepage/DigitalRightsSliderSection";
import FourSimpleSteps from "../components/homepage/FourSimpleSteps";
import RecentUpdates from "../components/homepage/RecentUpdates";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Header />
        <HeroBanner />
        <RecentDeals />
        <SellBuyTab />
        <FourSimpleSteps />
        <DigitalRightsSliderSection />
        <RecentUpdates />
        <FeaturedClients />
        <IndustryTesti />
        <SellBanner />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
