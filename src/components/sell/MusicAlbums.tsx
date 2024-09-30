import React, { useCallback, useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { projectRegex, runningTimeRegex } from "../../utils/RegExpressions";

const MusicAlbums = ({
  title,
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [musicValues, setMusicValues] = useState(
    getSessionStorage("Music Albums") || {
      contentTitle: "",
      audio: [],
      duration: "",
    }
  );
  const [errors, setErrors] = useState({
    contentTitleError: "",
    audioError: "",
    durationError: "",
  });

  const [selectedLanguages, setSelectedLanguages] = useState(
    musicValues?.audio?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Music Albums", musicValues);
  }, [musicValues]);

  useEffect(() => {
    const fetchLanguages = selectedLanguages?.map((item: any) => item.value);

    setMusicValues((prev: any) => ({
      ...prev,
      audio: fetchLanguages,
    }));
  }, [selectedLanguages, setMusicValues]);

  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(selectedOptions); // Update the state with selected options
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setMusicValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateMusicAlbums = useCallback(() => {
    let errorMessages = {
      contentTitleError: "",
      audioError: "",
      durationError: "",
    };

    // Validate content title
    if (musicValues.contentTitle.trim() === "") {
      errorMessages.contentTitleError = "Content title is required.";
    } else if (!projectRegex.test(musicValues.contentTitle)) {
      errorMessages.contentTitleError = "Invalid content title.";
    }

    // Validate audio (languages)
    if (musicValues.audio.length === 0 || musicValues.audio[0] === "") {
      errorMessages.audioError = "At least one language must be selected.";
    }

    // Validate duration
    if (musicValues.duration.trim() === "") {
      errorMessages.durationError = "Duration is required.";
    } else if (!runningTimeRegex.test(musicValues.duration)) {
      errorMessages.durationError =
        "Invalid duration. Enter a valid number of minutes.";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [musicValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateMusicAlbums();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
    }
  }, [
    triggerValidation,
    validateMusicAlbums,
    setIsStepValid,
    setTriggerValidation,
  ]);

  return (
    <div>
      <div>
        <p className="ft18 ftw700 text-white">{title}</p>
        <div className="gridItemStyle" style={{ paddingTop: "25px" }}>
          <p className="contentLabelName">
            Content Title<span className="mandatoryField">*</span>
          </p>
          <input
            className="contentInput"
            placeholder="Type to add"
            id="contentTitle"
            value={musicValues.contentTitle}
            onChange={handleInputChange}
          />
          {errors.contentTitleError && (
            <p className="error">{errors.contentTitleError}</p>
          )}
        </div>
        <div className="gridContainerStyle">
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
            <p className="contentLabelName">
              Duration
              <span className="mandatoryField">*</span>
              <span className="mandatoryField">(in mins)</span>
            </p>
            <input
              className="contentInput"
              placeholder="Type to add"
              type="number"
              id="duration"
              value={musicValues.duration}
              onChange={handleInputChange}
            />
            {errors.durationError && (
              <p className="error">{errors.durationError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicAlbums;
