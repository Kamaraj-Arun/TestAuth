/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import "../styles/dashboard.css";
// import { BiSolidRightArrowCircle } from "react-icons/bi";
import { FaCirclePlus } from "react-icons/fa6";
// import { CiSearch } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { recentDeals } from "../utils/data";
import { Progress } from "rsuite";
import { useNavigate } from "react-router-dom";
import { REACT_APP_DEV_URL } from "../utils/api";

const Dashboard = () => {
  const token = sessionStorage.getItem("token") || "";
  const [results, setResults] = useState<any>();
  const [marketPlaceSearch, setMarketPlaceSearch] = useState("");
  const [approvedMovies, setApprovedMovies] = useState<any>();
  const [awaitedMovies, setAwaitedMovies] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedMovies();
    fetchAwaitedMovies();
  }, []);

  const fetchApprovedMovies = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_DEV_URL}/selling-info/get-approved-movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovedMovies(res.data.data);
      console.log("approved", res.data.data);
    } catch {
      toast.error("failed during fetching approved movies");
    }
  };

  const fetchAwaitedMovies = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_DEV_URL}/selling-info/get-awaited-movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAwaitedMovies(res.data.data);
      // console.log("market", res.data.data);
    } catch {
      toast.error("failed during fetching waitedMovies");
    }
  };

  // const triggerSearch = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${REACT_APP_DEV_URL}/selling-info/search`,
  //       {
  //         input: marketPlaceSearch,
  //       }
  //     );

  //     if (res.data.status !== 200) {
  //       toast.error(res.data.message);
  //     } else {
  //       setResults(res.data.data);
  //       // console.log("check", res.data.data);
  //     }
  //   } catch (error) {
  //     toast.error("Error during search trigger");
  //   }
  // };

  const addNewClick = () => {
    navigate("/sell");
  };

  console.log("await", awaitedMovies);
  return (
    <>
      <Header />
      <div>
        <div className="container">
          {/* dashboard */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                marginTop: "80px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "35px",
                  justifyContent: "center",
                }}
              >
                <p className="marketPlaceTitle">Dashboard</p>
                {/* <button className="addNewBtn" onClick={addNewClick}>
                  <FaCirclePlus />
                  Add New
                </button> */}
              </div>

              {/* <div className="marketPlaceSearch">
                <CiSearch className="searchIcon" />
                <input
                  placeholder="search"
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
              </div> */}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "80px",
              }}
            >
              {approvedMovies && approvedMovies?.length > 0 ? (
                <>
                  {approvedMovies.map((item: any, index: number) => (
                    <div
                      style={{
                        background: "#2F144B",
                        border: "1px solid #2F144B",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                      key={index}
                    >
                      <img
                        src={item?.promotions?.moviePoster}
                        alt=""
                        height={260}
                        width={180}
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "12px",
                        }}
                      >
                        <p className="ft14" style={{ color: "#00FFC2" }}>
                          New enquires
                        </p>
                        <p
                          className="ft14"
                          style={{
                            backgroundColor: "#00FFC2",
                            color: "black",
                            borderRadius: "50%",
                            padding: "3px 6px",
                          }}
                        >
                          10
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-white ft24">No results found</p>
              )}
            </div>
          </div>

          {/* Awaiting approval  */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                marginTop: "80px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "35px",
                  justifyContent: "center",
                }}
              >
                <p className="marketPlaceTitle">Awaiting approval </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "80px",
              }}
            >
              {awaitedMovies && awaitedMovies?.length > 0 ? (
                <>
                  {awaitedMovies.map((item: any, index: number) => (
                    <div
                      style={{
                        background: "#2F144B",
                        border: "1px solid #2F144B",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                      key={index}
                    >
                      <img
                        src={item?.promotions?.moviePoster}
                        alt=""
                        height={260}
                        width={180}
                      />

                      <div
                        style={{
                          paddingBlock: "15px",
                        }}
                      >
                        {/* <>
                          <Progress.Line
                            percent={40}
                            showInfo={false}
                            strokeColor="#00FFC2" // Fill color
                            trailColor="#7C7A81" // Background color
                            style={{
                              padding: "0px", // Customize height of the progress bar if needed
                            }}
                          />
                        </> */}
                        {/* <p
                          className="ft14 text-white"
                          style={{
                            paddingTop: "10px",
                            textDecoration: "underline",
                          }}
                        >
                          Complete missing info
                        </p> */}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-white ft24">No results found</p>
              )}
            </div>
          </div>

          {/* Buy enquires */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                marginTop: "80px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "35px",
                  justifyContent: "center",
                }}
              >
                <p className="marketPlaceTitle">Buy enquires</p>
                <button className="addNewBtn">
                  <FaCirclePlus />
                  Enquiry
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "80px",
              }}
            >
              {recentDeals?.slice(0, 5).map((item: any, index: number) => (
                <div
                  style={{
                    background: "#2F144B",
                    border: "1px solid #2F144B",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  key={index}
                >
                  <img src={item} alt="" height={260} width={180} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "12px",
                    }}
                  >
                    <p className="ft14" style={{ color: "#00FFC2" }}>
                      New enquires
                    </p>
                    <p
                      className="ft14"
                      style={{
                        backgroundColor: "#00FFC2",
                        color: "black",
                        borderRadius: "50%",
                        padding: "3px 6px",
                      }}
                    >
                      10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
