/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "rsuite";
import bms from "../../assets/bms.png";
import itap from "../../assets/itap.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_DEV_URL } from "../../utils/api";
import toast from "react-hot-toast";
import { SiBlockchaindotcom } from "react-icons/si";

const DealsModal = ({ open, close, data }: any) => {
  const [results, setResults] = useState<any>();

  const fetchDealsApi = async () => {
    try {
      const res = await axios.post(`${REACT_APP_DEV_URL}/deals/get-by-id`, {
        _id: data,
      });
      setResults(res.data.data);
    } catch {
      toast.error("error during fetching the deals api");
    }
  };

  useEffect(() => {
    fetchDealsApi();
  }, []);

  const handleClose = () => close(false);
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="dealsModal" size="lg">
        <Modal.Header />
        <Modal.Body>
          <div>
            <div className="dealModalContents">
              <div className="dealsModalImg">
                <div
                  style={{
                    background: "#2F144B",
                    border: "1px solid #2F144B",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <img src={results?.url} alt="" height={260} width={180} />
                </div>
              </div>
              <div className="dealsModalDetails" style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                >
                  <div>
                    <img src={bms} alt="seller" />
                    <p className="buySellDetails">Seller</p>
                  </div>
                  <div>
                    <img src={itap} alt="seller" />
                    <p className="buySellDetails">Buyer</p>
                  </div>
                  <div>
                    <p style={{ textAlign: "center" }}>
                      <SiBlockchaindotcom className="blockChainIcon" />
                    </p>
                    <label className="text-white ft18">Blockchain</label>
                    <p className="buySellDetails">**********</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "35px",
                    borderTop: "1px solid #a6a6a6",
                  }}
                >
                  <div className="modalMovieContent">
                    <p>
                      Content Type: <span>{results?.contentType}</span>
                    </p>
                    <p>
                      Original Language:<span>{results?.originalLanguage}</span>
                    </p>
                    <p>
                      Duration in mins: <span>{results?.durationInMins}</span>
                    </p>
                    <p>
                      Agreement Period: <span>{results?.agreementPeriod}</span>
                    </p>
                  </div>
                  <div className="modalMovieContent">
                    <p>
                      Genre:
                      {results?.genre && results?.genre.length > 0 ? (
                        <>
                          {results.genre.map((item: any, index: number) => (
                            <span key={index}>
                              {item}
                              {index !== results.genre.length - 1 && ", "}
                            </span>
                          ))}
                        </>
                      ) : (
                        <>
                          {" "}
                          <span>NA</span>
                        </>
                      )}
                    </p>
                    <p>
                      Rights Licensed:<span>{results?.rightsLicensed}</span>
                    </p>
                    <p>
                      Years: <span>{results?.years}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DealsModal;
