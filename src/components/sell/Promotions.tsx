import React, { useCallback, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { urlRegex } from "../../utils/RegExpressions";
import axios from "axios";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const Promotions = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [promotionValues, setPromotionValues] = useState(
    getSessionStorage("Promotions") || {
      moviePosterUrl: "",
      movieTrailerUrl: "",
      imdbUrl: "",
      wikipediaUrl: "",
      edirUrl: "",
      unreleasedUrl: "",
      awardsUrl: [],
      awardInput: "",
    }
  );
  const [selectedFile, setSelectedFile] = useState<any>();

  const [errors, setErrors] = useState({
    moviePosterUrlError: "",
    movieTrailerUrlError: "",
    imdbUrlError: "",
    wikipediaUrlError: "",
    edirUrlError: "",
    unreleasedUrlError: "",
    awardInputError: "",
  });

  const validatePromotionValues = useCallback(() => {
    let errorMessages = {
      moviePosterUrlError: "",
      movieTrailerUrlError: "",
      imdbUrlError: "",
      wikipediaUrlError: "",
      edirUrlError: "",
      unreleasedUrlError: "",
      awardInputError: "",
    };

    if (promotionValues.moviePosterUrl === "") {
      errorMessages.moviePosterUrlError = "Please upload movie poster";
    }

    if (promotionValues.movieTrailerUrl === "") {
      errorMessages.movieTrailerUrlError = "Please upload movie poster";
    }
    if (
      promotionValues.movieTrailerUrl !== "" &&
      !urlRegex.test(promotionValues.movieTrailerUrl)
    ) {
      errorMessages.movieTrailerUrlError = "Invalid url";
    }
    if (
      promotionValues.imdbUrl !== "" &&
      !urlRegex.test(promotionValues.imdbUrl)
    ) {
      errorMessages.imdbUrlError = "Invalid url";
    }
    if (
      promotionValues.wikipediaUrl !== "" &&
      !urlRegex.test(promotionValues.wikipediaUrl)
    ) {
      errorMessages.wikipediaUrlError = "Invalid url";
    }
    if (
      promotionValues.edirUrl !== "" &&
      !urlRegex.test(promotionValues.edirUrl)
    ) {
      errorMessages.edirUrlError = "Invalid url";
    }
    if (
      promotionValues.unreleasedUrl !== "" &&
      !urlRegex.test(promotionValues.unreleasedUrl)
    ) {
      errorMessages.unreleasedUrlError = "Invalid url";
    }
    if (
      promotionValues.awardInput !== "" &&
      !urlRegex.test(promotionValues.awardInput)
    ) {
      errorMessages.awardInputError = "Invalid url";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [promotionValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validatePromotionValues();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
      setSessionStorage("Promotions", promotionValues);
    }
  }, [
    triggerValidation,
    promotionValues,
    setIsStepValid,
    validatePromotionValues,
    setTriggerValidation,
  ]);

  useEffect(() => {
    setSessionStorage("Promotions", promotionValues);
  }, [promotionValues]);

  const awardsAddOnClick = () => {
    if (
      promotionValues.awardInput !== "" &&
      !urlRegex.test(promotionValues.awardInput)
    ) {
      setErrors((prev) => ({
        ...prev,
        awardInputError: "Invalid url",
      }));
    } else {
      if (promotionValues.awardInput.trim()) {
        setPromotionValues((prev: any) => ({
          ...prev,
          awardsUrl: prev.awardsUrl
            ? [...prev.awardsUrl, prev.awardInput]
            : [prev.awardInput], // Initialize if not set
          awardInput: "",
        }));
      }
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file); // Update the state with the selected file
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        toast.error("No file selected.");
        return;
      }
      const formData = new FormData();

      formData.append("sellinginfo", selectedFile);
      const res = await axios.post(
        `${REACT_APP_DEV_URL}/selling-info/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.status !== 200) {
        toast.error(res.data.message);
      } else {
        toast.success("file uploaded successfully");
        setPromotionValues((prev: any) => ({
          ...prev,
          moviePosterUrl: res.data.data.url,
        }));
      }
    } catch {
      toast.error("error uploading file");
    }
  };

  const handleAwardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionValues((prev: any) => ({
      ...prev,
      awardInput: e.target.value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setPromotionValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Promotions</p>
      </div>

      <div style={{ marginTop: "35px" }}>
        <div className="gridContainerStyle">
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Upload Movie Poster
              <span className="mandatoryField">*</span>
            </p>
            <div
              style={{
                backgroundColor: "#2F144B",
                height: "46px",
                marginTop: "12px",
                borderRadius: "5px",
                display: "flex",
                padding: "0px 2px",
                position: "relative",
              }}
            >
              <input
                type="file"
                className=""
                style={{ color: "white", padding: "10px" }}
                onChange={handleFileChange}
              />

              <button className="uploadBtn" onClick={handleUpload}>
                Upload
              </button>
            </div>
            {errors.moviePosterUrlError && (
              <p className="error">{errors.moviePosterUrlError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Share the Movie Trailer/Promo Link
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              placeholder="URL"
              id="movieTrailerUrl"
              value={promotionValues.movieTrailerUrl}
              onChange={handleInputChange}
            />
            {errors.movieTrailerUrlError && (
              <p className="error">{errors.movieTrailerUrlError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">IMDB URL Link</p>
            <input
              className="contentInput"
              placeholder=""
              id="imdbUrl"
              value={promotionValues.imdbUrl}
              onChange={handleInputChange}
            />
            {errors.imdbUrlError && (
              <p className="error">{errors.imdbUrlError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">Wikipedia URL</p>
            <input
              className="contentInput"
              placeholder=""
              id="wikipediaUrl"
              value={promotionValues.wikipediaUrl}
              onChange={handleInputChange}
            />
            {errors.wikipediaUrlError && (
              <p className="error">{errors.wikipediaUrlError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">EDIR</p>
            <input
              className="contentInput"
              placeholder=""
              id="edirUrl"
              value={promotionValues.edirUrl}
              onChange={handleInputChange}
            />
            {errors.edirUrlError && (
              <p className="error">{errors.edirUrlError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">Unreleased Link</p>
            <input
              className="contentInput"
              placeholder=""
              id="unreleasedUrl"
              value={promotionValues.unreleasedUrl}
              onChange={handleInputChange}
            />
            {errors.unreleasedUrlError && (
              <p className="error">{errors.unreleasedUrlError}</p>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "25px" }}>
        <p className="contentLabelName">Awards/Media Coverage/Links</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <input
            className="productionHouseName"
            placeholder=""
            style={{ marginTop: "0" }}
            value={promotionValues.awardInput}
            onChange={handleAwardInputChange}
          />
          <button className="addButton" onClick={awardsAddOnClick}>
            Add
          </button>
        </div>
        {errors.awardInputError && (
          <p className="error">{errors.awardInputError}</p>
        )}
      </div>

      <div style={{ marginTop: "50px" }}>
        <div className="crewTable headerRow">
          {["S.No", "URL"].map((item: any, index: number) => (
            <p key={index} className="contentLabelName">
              {item}
            </p>
          ))}
        </div>
        {promotionValues?.awardsUrl?.map((award: any, index: any) => (
          <div className="crewTableContent" key={index}>
            <p className="crewTableValue">{index + 1}</p>
            <p
              className="crewTableValue"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {award}
              <RiDeleteBin5Line
                className="crewTableValueIcon"
                onClick={() =>
                  setPromotionValues((prev: any) => ({
                    ...prev,
                    awardsUrl: prev.awardsUrl.filter(
                      (_: any, i: any) => i !== index
                    ),
                  }))
                }
                style={{ cursor: "pointer" }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
