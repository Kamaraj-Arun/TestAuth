import React, { useCallback, useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { projectRegex } from "../../utils/RegExpressions";

const FourFieldLayout = ({
  title,
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const currentContent = sessionStorage.getItem("contentType") || "";
  const [values, setValues] = useState(
    getSessionStorage(currentContent) || {
      contentTitle: "",
      originalLanguage: "",
      audio: [],
      subtitle: [],
    }
  );
  const [errors, setErrors] = useState({
    contentTitleError: "",
    originalLanguageError: "",
    audioError: "",
    subtitleError: "",
  });

  const [selectedLanguages, setSelectedLanguages] = useState(
    values?.audio?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );
  const [selectedSubtitles, setSelectedSubtitles] = useState(
    values?.subtitle?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage(currentContent, values);
  }, [values, currentContent]);

  useEffect(() => {
    const fetchLanguages = selectedLanguages?.map((item: any) => item.value);

    setValues((prev: any) => ({
      ...prev,
      audio: fetchLanguages,
    }));
  }, [selectedLanguages, setValues]);

  useEffect(() => {
    const fetchSubtitles = selectedSubtitles?.map((item: any) => item.value);

    setValues((prev: any) => ({
      ...prev,
      subtitle: fetchSubtitles,
    }));
  }, [selectedSubtitles, setValues]);

  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(selectedOptions); // Update the state with selected options
  };

  const handleSubtitleChange = (selectedOptions: any) => {
    setSelectedSubtitles(selectedOptions); // Update the state with selected options
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateFourFieldLayout = useCallback(() => {
    let errorMessages = {
      contentTitleError: "",
      originalLanguageError: "",
      audioError: "",
      subtitleError: "",
    };

    // Validate content title
    if (values.contentTitle.trim() === "") {
      errorMessages.contentTitleError = "Please fill the content title.";
    } else if (!projectRegex.test(values.contentTitle)) {
      errorMessages.contentTitleError = "Invalid content title.";
    }

    // Validate original language
    if (values.originalLanguage.trim() === "") {
      errorMessages.originalLanguageError =
        "Please fill the original language.";
    } else if (!projectRegex.test(values.originalLanguage)) {
      errorMessages.originalLanguageError = "Invalid original language.";
    }

    // Validate audio (languages)
    if (values.audio.length === 0 || values.audio[0] === "") {
      errorMessages.audioError =
        "At least one audio language must be selected.";
    }

    // Validate subtitles
    if (values.subtitle.length === 0 || values.subtitle[0] === "") {
      errorMessages.subtitleError = "At least one subtitle must be selected.";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [values]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateFourFieldLayout();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
    }
  }, [
    triggerValidation,
    validateFourFieldLayout,
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
              value={values.contentTitle}
              onChange={handleInputChange}
            />
            {errors.contentTitleError && (
              <p className="error">{errors.contentTitleError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Original Language
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              placeholder="Type to add"
              id="originalLanguage"
              value={values.originalLanguage}
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
        </div>
      </div>
    </div>
  );
};

export default FourFieldLayout;
