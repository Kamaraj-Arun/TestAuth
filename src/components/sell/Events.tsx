import React, { useCallback, useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { marketOptions } from "../../utils/data";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { projectRegex } from "../../utils/RegExpressions";

const Events = ({
  title,
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [eventValues, setEventValues] = useState(
    getSessionStorage("Events & Live Shows") || {
      category: "",
      originalLanguage: "",
      trademark: "Yes",
      audio: [],
      subtitle: [],
      markets: [],
    }
  );

  const [errors, setErrors] = useState({
    categoryError: "",
    originalLanguageError: "",
    audioError: "",
    subtitleError: "",
    marketError: "",
  });

  const [selectedLanguages, setSelectedLanguages] = useState(
    eventValues?.audio?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );
  const [selectedSubtitles, setSelectedSubtitles] = useState(
    eventValues?.subtitle?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const [selectedMarkets, setSelectedMarkets] = useState(
    eventValues?.markets?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Events & Live Shows", eventValues);
  }, [eventValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEventValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(selectedOptions); // Update the state with selected options
  };

  const handleSubtitleChange = (selectedOptions: any) => {
    setSelectedSubtitles(selectedOptions); // Update the state with selected options
  };

  const handleMarketChange = (selectedOptions: any) => {
    setSelectedMarkets(selectedOptions); // Update the state with selected options
  };

  useEffect(() => {
    const fetchLanguages = selectedLanguages?.map((item: any) => item.value);

    setEventValues((prev: any) => ({
      ...prev,
      audio: fetchLanguages,
    }));
  }, [selectedLanguages, setEventValues]);

  useEffect(() => {
    const fetchSubtitles = selectedSubtitles?.map((item: any) => item.value);

    setEventValues((prev: any) => ({
      ...prev,
      subtitle: fetchSubtitles,
    }));
  }, [selectedSubtitles, setEventValues]);

  useEffect(() => {
    const fetchMarkets = selectedMarkets?.map((item: any) => item.value);

    setEventValues((prev: any) => ({
      ...prev,
      markets: fetchMarkets,
    }));
  }, [selectedMarkets, setEventValues]);

  // Validation function
  const validateEvents = useCallback(() => {
    let errorMessages = {
      categoryError: "",
      originalLanguageError: "",
      audioError: "",
      subtitleError: "",
      marketError: "",
    };

    // Validate category
    if (eventValues.category.trim() === "") {
      errorMessages.categoryError = "Please enter the category.";
    } else if (!projectRegex.test(eventValues.category)) {
      errorMessages.categoryError = "Invalid category.";
    }

    // Validate original language
    if (eventValues.originalLanguage.trim() === "") {
      errorMessages.originalLanguageError =
        "Please enter the original language.";
    } else if (!projectRegex.test(eventValues.originalLanguage)) {
      errorMessages.originalLanguageError = "Invalid original language.";
    }

    // Validate audio (languages)
    if (eventValues.audio.length === 0 || eventValues.audio[0] === "") {
      errorMessages.audioError =
        "At least one audio language must be selected.";
    }

    // Validate subtitles
    if (eventValues.subtitle.length === 0 || eventValues.subtitle[0] === "") {
      errorMessages.subtitleError = "At least one subtitle must be selected.";
    }

    // Validate markets
    if (eventValues.markets.length === 0 || eventValues.markets[0] === "") {
      errorMessages.marketError = "At least one market must be selected.";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === "");
  }, [eventValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateEvents();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
    }
  }, [triggerValidation, validateEvents, setIsStepValid, setTriggerValidation]);

  return (
    <div>
      <div>
        <p className="ft18 ftw700 text-white">{title}</p>
        <div className="gridContainerStyle">
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Category<span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              id="category"
              value={eventValues.category}
              onChange={handleInputChange}
            />
            {errors.categoryError && (
              <p className="error">{errors.categoryError}</p>
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
              value={eventValues.originalLanguage}
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
          <div className="gridItemStyle">
            {" "}
            <p className="contentLabelName">
              Available Markets
              <span className="mandatoryField">*</span>
            </p>
            {selectedMarkets.length > 0 && selectedMarkets[0].value !== "" ? (
              <LanguageSelect
                options={marketOptions}
                onChange={handleMarketChange}
                defaultValue={selectedMarkets}
              />
            ) : (
              <LanguageSelect
                options={marketOptions}
                onChange={handleMarketChange}
              />
            )}
          </div>
          {errors.marketError && <p className="error">{errors.marketError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Events;
