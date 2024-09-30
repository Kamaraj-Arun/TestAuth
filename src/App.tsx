import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages";
import SignIn from "./pages/SignIn";
import MarketPlace from "./pages/MarketPlace";
import "./styles/App.css";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import NewPassword from "./pages/NewPassword";
import Deals from "./pages/Deals";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import ProtectedRoute from "./components/global/ProtectedRoute";
import { StaticBuy } from "./pages/StaticBuy";
import { StaticSell } from "./pages/StaticSell";
import DetailedMarketPlaceItemPage from "./pages/DetailedMarketPlaceItem";

function App() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" &&
        document.activeElement?.getAttribute("type") === "number"
      ) {
        e.preventDefault();
      }
    };

    // Add event listener to the document
    document.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup the event listener
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/market-place" element={<MarketPlace />} />
          <Route path="/static-sell" element={<StaticSell />} />
          <Route path="/static-buy" element={<StaticBuy />} />
          <Route path="/detail/:id" element={<DetailedMarketPlaceItemPage />} />
          <Route path="/deals" element={<Deals />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
