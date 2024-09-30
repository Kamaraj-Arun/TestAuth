import React, { useEffect, useState } from "react";
import viewership from "../assets/viewers.png";
import forecast from "../assets/forecast.png";
import audio from "../assets/audio.png";
import subtitles from "../assets/subtitles.png";
import youtubeIcon from "../assets/youtubeIcon.png";
import saveLater from "../assets/saveLater.png";
import share from "../assets/share.png";
import "../styles/DetailedMarketPlaceItem.css";
import Header from "../components/global/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { REACT_APP_DEV_URL } from "../utils/api";

const DetailedMarketPlaceItemPage = () => {
  const [data, setData] = useState<any>({});
  const [director, setDirector] = useState<any>({});
  const [isAnyRightAvailable, setIsAnyRightAvailable] = useState<Boolean>();
  const navigate = useNavigate();
  const params = useParams();

  const fetchDetails = async () => {
    const res = await axios.post(
      `${REACT_APP_DEV_URL}/selling-info/get-the-detail`,
      { _id: params?.id }
    );
    setData(res.data.data);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const rightsMapping: { [category: string]: string } = {
    "Theatrical Rights": "theatricalRights",
    "Television Rights": "televisionRights",
    "Digital Rights": "digitalRights",
    Travel: "travel",
    Audio: "audio",
    "Dubbing & Remake Rights": "dubbingRights",
    "Emerging Rights": "emergingRights",
    "Other Rights": "otherRights",
  };

  const rightsData: { [category: string]: string[] } = {
    "Theatrical Rights": ["Regional", "National"],
    "Television Rights": ["Regional", "National", "Cable Rights"],
    "Digital Rights": ["TVOD", "AVOD", "SVOD", "Original Rights"],
    Travel: ["Airborne Rights"],
    Audio: ["Regional", "National", "International"],
    "Dubbing & Remake Rights": [
      "Theatrical",
      "Satellite",
      "Digital Rights",
      "International Dubbing & Remake Rights",
    ],
    "Emerging Rights": [
      "AR/VR/XR Rights",
      "Metaverse Rights",
      "Dialect Rights",
      "Subtitle Rights",
      "Video Commerce Rights",
    ],
    "Other Rights": [
      "Gaming Rights",
      "Animation Rights",
      "Non Exclusive Rights",
    ],
  };

  useEffect(() => {
    if (data) {
      const directorObject = data?.castCrew?.crewDetails.find(
        (obj: any) => obj?.title == "Director"
      );
      if (directorObject) {
        setDirector(directorObject);
      }
      const isRightAvailable = isAnyOfRightAvailable();
      setIsAnyRightAvailable(isRightAvailable);
    }
  }, [data]);

  const IsRightAvailable = (category: string, right: string) => {
    let isRightAvailable = false;
    isRightAvailable = data?.rights?.[rightsMapping[category]]?.includes(right);
    return isRightAvailable;
  };

  const MovieDetail = () => {
    return (
      <div className="movieDetailsContainer">
        <div>
          <div className="movie-poster">
            <img src={`${data?.promotions?.moviePoster}`} alt="Movie Poster" />
          </div>
          <div className="signInBox">
            <p className="signInBoxHeading">
              Sign in to view forecasting metrics
            </p>
            <div className="forecasting-icons">
              <div>
                <img className="viewership" src={viewership} />
                <p className="signInBoxText">Viewership by age</p>
              </div>
              <div>
                <img className="viewership" src={forecast} />
                <p className="signInBoxText">Custom Forecasting</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/sign-in")}
              className="signInButton"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="movieInfo">
          <h1>{data?.contentType?.content?.title}</h1>
          <p className="movieDuration">
            {data?.contentType?.content?.duration} |{" "}
            {data?.advisory?.indianCensorCertificate}
          </p>
          <div className="tags">
            {data?.synopsisGenre?.genre.map((genre: string, index: number) => {
              return <span key={index}>{genre}</span>;
            })}
          </div>

          <p className="movieDescription">{data?.synopsisGenre?.synopsis}</p>
          <p className="movie-rating">
            IMDB 7.5
            <span>
              <a
                href={data?.promotions?.trailerLink}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="mediaIcons"
                  style={{ marginLeft: "2rem" }}
                  src={youtubeIcon}
                />
              </a>
            </span>
            <span>
              <img
                className="mediaIcons"
                style={{ width: "3%" }}
                src={saveLater}
              />
            </span>
            <span>
              <img className="mediaIcons" src={share} />
            </span>
          </p>

          <hr />

          <div className="more-info">
            <h3>More Info</h3>
            <p className="marginTop10">
              <strong>Content advisory:</strong>
            </p>
            <p className="infoContent">
              Violence, Drama, Action, Foul language, Alcohol use...
            </p>
            <p className="marginTop10">
              <span>
                <img className="infoIcons" src={audio} />
              </span>
              <strong>Audio</strong>{" "}
            </p>
            <p className="infoContent">Kannada, Tamil, Telugu, Hindi, Marati</p>
            <p className="marginTop10">
              <span>
                <img className="infoIcons" src={subtitles} />
              </span>
              <strong>Subtitles</strong>
            </p>
            <p className="infoContent">English, Japanese</p>
            <p className="marginTop10">
              <strong>Director</strong>
            </p>
            <p className="infoContent">{director?.name}</p>
            <p className="marginTop10">
              <strong>Producers</strong>{" "}
            </p>
            <p className="infoContent">{data?.producerInfo?.name}</p>
            <p className="marginTop10">
              <strong>Starring</strong>
            </p>
            {data?.castCrew?.starring?.map((star: string, index: number) => {
              return (
                <span className="infoContent">
                  {star}
                  {index !== data?.castCrew?.starring?.length - 1 ? ", " : ""}
                </span>
              );
            })}
            <p className="marginTop10">
              <strong>Studio</strong>
            </p>
            <p className="infoContent">{data?.producerInfo?.houseName}</p>
          </div>
        </div>
      </div>
    );
  };

  const isAnyOfRightAvailable = () => {
    if (data && data.hasOwnProperty("rights")) {
      const hasRights = Object.keys(data.rights).some((category: string) => {
        if (data?.rights?.[category]?.length > 0 && category !== "_id") {
          return true;
        }
      });
      return hasRights;
    }
  };

  const AvailableRights = () => {
    return (
      <div className="rightsContainer">
        <div className="rightContainerContent">
          <h3 className="availableRightsHeader">
            Available Rights
            {isAnyRightAvailable === false && (
              <span>
                <button className="claimRights">Claim Rights</button>
              </span>
            )}
          </h3>
          {isAnyRightAvailable === true &&
            Object.keys(rightsData).map((category) => (
              <div key={category} className="category-section">
                <h5 className="category">{category}</h5>
                <div className="checkboxGroup">
                  {rightsData[category].map((right) => (
                    <label key={right} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={IsRightAvailable(category, right)}
                        disabled={true}
                      />
                      {right}
                    </label>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const DetailedSection = () => {
    return (
      <div>
        <MovieDetail />
        <AvailableRights />
      </div>
    );
  };

  return (
    <div>
      <Header />
      <DetailedSection />
    </div>
  );
};

export default DetailedMarketPlaceItemPage;