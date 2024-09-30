import React, { useCallback, useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import {
  indianMovieRatingOptions,
  internationalMovieRatingOptions,
} from "../../utils/data";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { nameRegex, runningTimeRegex } from "../../utils/RegExpressions";
import axios from "axios";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const Advisory = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [advisoryValues, setAdvisoryValues] = useState(
    getSessionStorage("Advisory") || {
      censorCeritificateUrl: "",
      movieDurationTime: "",
      internationalMovieRating: [indianMovieRatingOptions[0].value],
      indianMovieRating: [indianMovieRatingOptions[0].value],
      region: "",
      state: "",
      councilName: "",
    }
  );
  const [selectedFile, setSelectedFile] = useState<any>();
  const [errors, setErrors] = useState({
    movieDurationTimeError: "",
    regionError: "",
    stateError: "",
    councilNameError: "",
  });

  const [internationalRating, setInternationalRating] = useState(
    advisoryValues?.internationalMovieRating?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const [indianRating, setIndianRating] = useState(
    advisoryValues?.indianMovieRating?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const validateSynopsisGenre = useCallback(() => {
    let errorMessages = {
      movieDurationTimeError: "",
      regionError: "",
      stateError: "",
      councilNameError: "",
    };

    if (advisoryValues.movieDurationTime === "") {
      errorMessages.movieDurationTimeError = "Please enter movie running time";
    }
    if (
      advisoryValues.movieDurationTime !== "" &&
      !runningTimeRegex.test(advisoryValues.movieDurationTime)
    ) {
      errorMessages.movieDurationTimeError = "Movie running time range 20-220";
    }
    if (
      advisoryValues.region !== "" &&
      !nameRegex.test(advisoryValues.region)
    ) {
      errorMessages.regionError = "No special characters allowed";
    }

    if (advisoryValues.state !== "" && !nameRegex.test(advisoryValues.state)) {
      errorMessages.stateError = "No special characters allowed";
    }

    if (
      advisoryValues.councilName !== "" &&
      !nameRegex.test(advisoryValues.councilName)
    ) {
      errorMessages.councilNameError = "No special characters allowed";
    }
    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [advisoryValues]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file); // Update the state with the selected file
  };

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateSynopsisGenre();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
      setSessionStorage("Advisory", advisoryValues);
    }
  }, [
    triggerValidation,
    advisoryValues,
    setIsStepValid,
    validateSynopsisGenre,
    setTriggerValidation,
  ]);

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Advisory", advisoryValues);
  }, [advisoryValues]);

  useEffect(() => {
    const fetchRating = internationalRating?.map((item: any) => item.value);

    setAdvisoryValues((prev: any) => ({
      ...prev,
      internationalMovieRating: fetchRating,
    }));
  }, [internationalRating, setAdvisoryValues]);

  useEffect(() => {
    const fetchRating = indianRating?.map((item: any) => item.value);

    setAdvisoryValues((prev: any) => ({
      ...prev,
      indianMovieRating: fetchRating,
    }));
  }, [indianRating, setAdvisoryValues]);

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
        toast.success(res.data.message);
        setAdvisoryValues((prev: any) => ({
          ...prev,
          censorCeritificateUrl: res.data.data.url,
        }));
      }
    } catch {
      toast.error("error uploading file");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setAdvisoryValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleInternationalRating = (selectedOptions: any) => {
    const temp = [selectedOptions];
    setInternationalRating(temp); // Update the state with selected options
  };

  const handleIndianRating = (selectedOptions: any) => {
    const temp = [selectedOptions];
    setIndianRating(temp); // Update the state with selected options
  };

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Advisory</p>
      </div>

      <div className="gridContainerStyle">
        <div className="gridItemStyle">
          <p className="contentLabelName">Indian Censor Certificate</p>
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
        </div>
        <div className="gridItemStyle">
          <p className="contentLabelName">
            Movie Duration in Minutes
            <span className="mandatoryField">*</span>
            <span className="mandatoryField">(in mins)</span>
          </p>
          <input
            className="contentInput"
            placeholder="Type to add"
            type="number"
            id="movieDurationTime"
            value={advisoryValues.movieDurationTime}
            onChange={handleInputChange}
          />
          {errors.movieDurationTimeError && (
            <p className="error">{errors.movieDurationTimeError}</p>
          )}
        </div>
        <div className="gridItemStyle">
          {" "}
          <p className="contentLabelName">International Movie Film Rating</p>
          <div>
            {internationalRating.length > 0 &&
            internationalRating[0].value !== "" ? (
              <LanguageSelect
                isMulti={false}
                options={internationalMovieRatingOptions}
                onChange={handleInternationalRating}
                defaultValue={internationalRating}
              />
            ) : (
              <LanguageSelect
                isMulti={false}
                options={internationalMovieRatingOptions}
                onChange={handleInternationalRating}
                defaultValue={[internationalMovieRatingOptions[0]]}
              />
            )}
          </div>
        </div>
        <div className="gridItemStyle">
          {" "}
          <p className="contentLabelName">Indian Movie Film Rating</p>
          {indianRating.length > 0 && indianRating[0].value !== "" ? (
            <LanguageSelect
              isMulti={false}
              options={indianMovieRatingOptions}
              onChange={handleIndianRating}
              defaultValue={indianRating}
            />
          ) : (
            <LanguageSelect
              isMulti={false}
              options={indianMovieRatingOptions}
              onChange={handleIndianRating}
              defaultValue={[indianMovieRatingOptions[0]]}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <p className="text-white ft18 ftw700">
          Producer Council Registration Details
        </p>

        <div className="gridContainerStyle">
          <div className="gridItemStyle">
            <p className="contentLabelName">Region</p>
            <input
              className="contentInput"
              placeholder=""
              id="region"
              value={advisoryValues.region}
              onChange={handleInputChange}
            />
            {errors.regionError && (
              <p className="error">{errors.regionError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">State</p>
            <input
              className="contentInput"
              placeholder=""
              id="state"
              value={advisoryValues.state}
              onChange={handleInputChange}
            />
            {errors.stateError && <p className="error">{errors.stateError}</p>}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">Council Name</p>
            <input
              className="contentInput"
              placeholder=""
              id="councilName"
              value={advisoryValues.councilName}
              onChange={handleInputChange}
            />
            {errors.councilNameError && (
              <p className="error">{errors.councilNameError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisory;
