import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import "../styles/deals.css";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import DealsModal from "../components/deals/DealsModal";
import { REACT_APP_DEV_URL } from "../utils/api";

const Deals = () => {
  const [results, setResults] = useState<any>();
  const [marketPlaceSearch, setMarketPlaceSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState();
  const [resultText, setResultText] = useState("Loading...");

  const fetchDealsApi = async () => {
    try {
      const res = await axios.get(`${REACT_APP_DEV_URL}/deals/get-all`);
      setResults(res.data.data);
      if (res?.data?.data?.length === 0) {
        setResultText("No results found");
      }
    } catch {
      toast.error("error during fetching the deals api");
    }
  };

  useEffect(() => {
    fetchDealsApi();
  }, []);

  const triggerSearch = async () => {
    try {
      const res = await axios.post(`${REACT_APP_DEV_URL}/deals/search`, {
        input: marketPlaceSearch,
      });

      if (res.data.status !== 200 && res.data.status !== 204) {
        toast.error(res.data.message);
      } else {
        if (res?.data?.data?.length === 0) {
          setResultText("No results found");
        }
        setResults(res.data.data);
      }
    } catch (error) {
      toast.error("Error during search trigger");
    }
  };

  const modalHandler = (item: any) => {
    setIsModalOpen(true);
    setModalDetails(item);
  };

  return (
    <>
      <Header />
      <div>
        <div className="container">
          <div>
            <div
              className="dealstopcontainer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                marginTop: "80px",
              }}
            >
              <div>
                <p className="marketPlaceTitle">Recent Deals</p>
              </div>

              <div className="marketPlaceSearch">
                <CiSearch className="searchIcon" />
                <input
                  placeholder="Search and enter"
                  onChange={(e) => {
                    setMarketPlaceSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      triggerSearch(); // Call the triggerSearch function when "Enter" key is pressed
                    }
                  }}
                />
                <BiSolidRightArrowCircle
                  className="searchIcon"
                  onClick={() => {
                    triggerSearch();
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div
              className="dealsmidcontainer"
              style={{
                paddingTop: "50px",
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "80px",
              }}
            >
              {results && results.length > 0 ? (
                <>
                  {results?.map((item: any) => (
                    <div
                      style={{
                        background: "#2F144B",
                        border: "1px solid #2F144B",
                        borderRadius: "12px",
                        padding: "12px",
                        cursor: "pointer",
                      }}
                      key={item._id}
                      onClick={() => {
                        modalHandler(item._id);
                      }}
                    >
                      <img src={item?.url} alt="" height={260} width={200} />
                      <p
                        style={{
                          color: "#999999",
                          fontSize: "14px",
                          paddingTop: "8px",
                        }}
                      >
                        {item?.title.replace(".jpg", "").replace(/-/g, " ")}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p style={{ fontSize: "48px", color: "white" }}>{resultText}</p>
              )}
            </div>
          </div>
          {isModalOpen && (
            <div>
              <DealsModal
                open={isModalOpen}
                close={setIsModalOpen}
                data={modalDetails}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deals;
