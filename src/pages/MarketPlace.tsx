/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import "../styles/marketplace.css";
import FilterItems from "../components/marketplace/FilterItems";
import axios from "axios";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const MarketPlace = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>();
  const [marketPlaceSearch, setMarketPlaceSearch] = useState("");
  const [selectedFilterValues, setSelectedFilterValues] = useState({
    language: [],
    contentType: [],
    genre: [],
    producer: [],
    director: [],
    starring: [],
    indianRating: [],
    durationMin: 0,
    durationMax: 0,
    internationalRating: [],
    rights: [],
    releasedStatus: "yes",
    yearOfRelease: [],
  });
  const [resultText, setResultText] = useState("Loading...");

  useEffect(() => {
    fetchMarketPlaceApi();
  }, []);

  const fetchMarketPlaceApi = async () => {
    const res = await axios.get(`${REACT_APP_DEV_URL}/selling-info/list-all`);
    setResults(res.data.data);
    if (res?.data?.data?.length === 0) {
      setResultText("No results found");
    }
    // console.log("market", res.data.data);
  };

  const triggerSearch = async () => {
    try {
      const res = await axios.post(`${REACT_APP_DEV_URL}/selling-info/search`, {
        input: marketPlaceSearch,
      });

      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        setResults(res.data.data);
        if (res?.data?.data?.length === 0) {
          setResultText("No results found");
        }
      }
    } catch (error) {
      toast.error("Error during search trigger");
    }
  };

  const fetchFilteredData = async () => {
    try {
      const temp = {
        language: selectedFilterValues.language,
        contentType: selectedFilterValues.contentType,
        genre: selectedFilterValues.genre,
        producer: selectedFilterValues.producer,
        director: selectedFilterValues.director,
        starring: selectedFilterValues.starring,
        indianRating: selectedFilterValues.indianRating,
        durationMin: selectedFilterValues.durationMin,
        durationMax: selectedFilterValues.durationMax,
        internationalRating: selectedFilterValues.internationalRating,
        rights: selectedFilterValues.rights,
        releasedStatus: selectedFilterValues.releasedStatus,
        yearOfRelease: selectedFilterValues.yearOfRelease,
      };
      const res = await axios.post(
        `${REACT_APP_DEV_URL}/selling-info/filter`,
        temp
      );
      setResults(res.data.data);
      if (res?.data?.data?.length === 0) {
        setResultText("No results found");
      }
    } catch (e) {
      console.log("failed to triged filtered data", e);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [setSelectedFilterValues, selectedFilterValues]);

  const navigateTo = (id: string) => {
    navigate(`/detail/${id}`);
  };

  // console.log("results", results);
  return (
    <>
      <Header />
      <div>
        <div className="">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "100px 0px",
                alignItems: "baseline",
                gap: "40px",
              }}
            >
              <div style={{ width: "30%", flexGrow: 1 }}>
                <div
                  style={{
                    background: "#1B0036",
                    borderRadius: "12px",
                    minHeight: "100vh",
                  }}
                >
                  <div className="filterTextContainer">
                    <p className="filterTitleText">Filters</p>
                  </div>

                  <FilterItems
                    selectedFilterValues={selectedFilterValues}
                    setSelectedFilterValues={setSelectedFilterValues}
                  />
                </div>
              </div>

              <div style={{ width: "70%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    alignItems: "center",
                    gap: "40px",
                    marginBottom: "40px",
                  }}
                >
                  <div>
                    <p className="marketPlaceTitle">Marketplace</p>
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
                  style={{
                    paddingTop: "50px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    maxHeight: "200vh",
                    scrollbarWidth: "thin",
                    overflowY: "scroll",
                  }}
                >
                  {results && results.length > 0 ? (
                    <>
                      {results?.map((item: any) => (
                        <div
                          onClick={(event) => navigateTo(item?._id)}
                          style={{
                            background: "#2F144B",
                            border: "1px solid #2F144B",
                            borderRadius: "12px",
                            padding: "12px",
                          }}
                          key={item.id}
                        >
                          <img
                            src={item?.promotions?.moviePoster}
                            alt=""
                            height={260}
                            width={200}
                          />
                          <p
                            style={{
                              color: "#999999",
                              fontSize: "14px",
                              paddingTop: "8px",
                            }}
                          >
                            {item?.contentType?.content?.title}
                          </p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p style={{ fontSize: "48px", color: "white" }}>
                      {resultText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarketPlace;
