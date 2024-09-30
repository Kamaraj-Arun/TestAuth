import React, { useCallback, useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { projectRegex } from "../../utils/RegExpressions";
import axios from "axios";
import toast from "react-hot-toast";
import { REACT_APP_DEV_URL } from "../../utils/api";

const FeatureFlim = ({
  title,
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [featureFlimValues, setFeatureFlimValues] = useState(
    getSessionStorage("Feature Film") || {
      contentTitle: "",
      category: "",
      originalLanguage: "",
      fileUrl: "",
      trademark: "Yes",
      audio: [],
      subtitle: [],
    }
  );

  const [selectedFile, setSelectedFile] = useState();

  const [errors, setErrors] = useState({
    contentTitleError: "",
    categoryError: "",
    originalLanguageError: "",
    audioError: "",
    subtitleError: "",
  });

  const [selectedLanguages, setSelectedLanguages] = useState(
    featureFlimValues?.audio?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );
  const [selectedSubtitles, setSelectedSubtitles] = useState(
    featureFlimValues?.subtitle?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.includes("trademark")) {
      setFeatureFlimValues((prev: any) => ({
        ...prev,
        trademark: value,
      }));
    } else {
      setFeatureFlimValues((prev: any) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file); // Update the state with the selected file
  };

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Feature Film", featureFlimValues);
  }, [featureFlimValues]);

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
        setFeatureFlimValues((prev: any) => ({
          ...prev,
          fileUrl: res.data.data.url,
        }));
      }
    } catch {
      toast.error("error uploading file");
    }
  };

  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(selectedOptions); // Update the state with selected options
  };

  const handleSubtitleChange = (selectedOptions: any) => {
    setSelectedSubtitles(selectedOptions); // Update the state with selected options
  };

  useEffect(() => {
    const fetchLanguages = selectedLanguages?.map((item: any) => item.value);

    setFeatureFlimValues((prev: any) => ({
      ...prev,
      audio: fetchLanguages,
    }));
  }, [selectedLanguages, setFeatureFlimValues]);

  useEffect(() => {
    const fetchSubtitles = selectedSubtitles?.map((item: any) => item.value);

    setFeatureFlimValues((prev: any) => ({
      ...prev,
      subtitle: fetchSubtitles,
    }));
  }, [selectedSubtitles, setFeatureFlimValues]);

  // Validation function
  const validateFeatureFlim = useCallback(() => {
    let errorMessages = {
      contentTitleError: "",
      categoryError: "",
      originalLanguageError: "",
      audioError: "",
      subtitleError: "",
    };

    // Validate content title
    if (featureFlimValues.contentTitle.trim() === "") {
      errorMessages.contentTitleError = "Content title is required.";
    } else if (!projectRegex.test(featureFlimValues.contentTitle)) {
      errorMessages.contentTitleError = "Invalid content title.";
    }

    // Validate category
    if (
      featureFlimValues.category !== "" &&
      !projectRegex.test(featureFlimValues.category)
    ) {
      errorMessages.categoryError = "Invalid category.";
    }

    // Validate original language
    if (featureFlimValues.originalLanguage.trim() === "") {
      errorMessages.originalLanguageError = "Original language is required.";
    } else if (!projectRegex.test(featureFlimValues.originalLanguage)) {
      errorMessages.originalLanguageError = "Invalid original language.";
    }

    // Validate audio
    if (
      featureFlimValues.audio.length === 0 ||
      featureFlimValues.audio[0] === ""
    ) {
      errorMessages.audioError =
        "At least one audio language must be selected.";
    }

    // Validate subtitles
    if (
      featureFlimValues.subtitle.length === 0 ||
      featureFlimValues.subtitle[0] === ""
    ) {
      errorMessages.subtitleError = "At least one subtitle must be selected.";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [featureFlimValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateFeatureFlim();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
    }
  }, [
    triggerValidation,
    validateFeatureFlim,
    setIsStepValid,
    setTriggerValidation,
  ]);

  return (
    <div>
      <div>
        <p className="ft18 ftw700 text-white">{title}</p>
        <div className="gridContainerStyle">
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Content Title
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              id="contentTitle"
              value={featureFlimValues.contentTitle}
              onChange={handleInputChange}
            />
            {errors.contentTitleError && (
              <p className="error">{errors.contentTitleError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">Category</p>
            <input
              className="contentInput"
              placeholder=""
              id="category"
              value={featureFlimValues.category}
              onChange={handleInputChange}
            />
            {errors.categoryError && (
              <p className="error">{errors.categoryError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Original Language<span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              id="originalLanguage"
              value={featureFlimValues.originalLanguage}
              onChange={handleInputChange}
            />
            {errors.originalLanguageError && (
              <p className="error">{errors.originalLanguageError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            {" "}
            <p className="contentLabelName">
              Available Audio Languages
              <span className="mandatoryField">*</span>
            </p>
            <div>
              {selectedLanguages.length > 0 &&
              selectedLanguages[0].value !== "" ? (
                <LanguageSelect
                  onChange={handleLanguageChange}
                  defaultValue={selectedLanguages}
                />
              ) : (
                <LanguageSelect onChange={handleLanguageChange} />
              )}
              {errors.audioError && (
                <p className="error">{errors.audioError}</p>
              )}
            </div>
          </div>
          <div className="gridItemStyle">
            {" "}
            <p className="contentLabelName">Title Registrations Certificate</p>
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
            {" "}
            <p className="contentLabelName">
              Available Subtitles
              <span className="mandatoryField">*</span>
            </p>
            {selectedSubtitles.length > 0 &&
            selectedSubtitles[0].value !== "" ? (
              <LanguageSelect
                onChange={handleSubtitleChange}
                defaultValue={selectedSubtitles}
              />
            ) : (
              <LanguageSelect onChange={handleSubtitleChange} />
            )}
            {errors.subtitleError && (
              <p className="error">{errors.subtitleError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            {" "}
            <p className="contentLabelName">
              Trademark For Title Registered
              <span className="mandatoryField">*</span>
            </p>
            <div style={{ display: "flex", gap: "25px", paddingTop: "25px" }}>
              {["Yes", "No"].map((item: any) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="radio"
                    name="trademark"
                    value={item}
                    className="custom-radio"
                    id={`trademark-${item}`}
                    onChange={handleInputChange}
                    checked={featureFlimValues.trademark === item} // Bind to state
                  />
                  <label
                    htmlFor={`trademark-${item}`}
                    className="contentLabelName"
                    style={{ paddingLeft: "10px" }}
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlim;
