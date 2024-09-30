import React, { useCallback, useEffect, useState } from "react";
import { copyRightTypes, movieGenreTypes } from "../../utils/data";
import { Toggle } from "rsuite";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers"; // Assuming these utilities exist
import { synopsisRegex } from "../../utils/RegExpressions";

interface MovieGenreType {
  name: string;
}

const SynopsisGenre = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  // Get initial values from session storage or set defaults
  const [synopsisValues, setSynopsisValues] = useState(
    getSessionStorage("Synopsis & Genre") || {
      synopsis: "",
      selectedGenres: [],
      copyRightValues: [],
      isChecked: false,
    }
  );

  const [errors, setErrors] = useState({
    synopsisError: "",
    genreError: "",
    copyrightError: "",
  });

  const validateSynopsisGenre = useCallback(() => {
    let errorMessages = {
      synopsisError: "",
      genreError: "",
      copyrightError: "",
    };

    if (
      synopsisValues.synopsis.trim() !== "" &&
      !synopsisRegex.test(synopsisValues.synopsis)
    ) {
      errorMessages.synopsisError =
        "Synopsis must be at least 10 characters and contain only valid characters.";
    }
    if (synopsisValues.selectedGenres.length === 0) {
      errorMessages.genreError = "Please select at least one genre.";
    }

    if (
      synopsisValues.isChecked &&
      synopsisValues.copyRightValues.length === 0
    ) {
      errorMessages.copyrightError = "Please select at least one copyright.";
    }
    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [synopsisValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateSynopsisGenre();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
      setSessionStorage("Synopsis & Genre", synopsisValues);
    }
  }, [
    triggerValidation,
    synopsisValues,
    setIsStepValid,
    validateSynopsisGenre,
    setTriggerValidation,
  ]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const updatedGenres = checked
      ? [...synopsisValues.selectedGenres, value]
      : synopsisValues.selectedGenres.filter((genre: any) => genre !== value);

    setSynopsisValues((prev: any) => ({
      ...prev,
      selectedGenres: updatedGenres,
    }));
  };

  const handleCopyRightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;
    const updatedCopyRights = checked
      ? [...synopsisValues.copyRightValues, value]
      : synopsisValues.copyRightValues.filter((item: any) => item !== value);

    setSynopsisValues((prev: any) => ({
      ...prev,
      copyRightValues: updatedCopyRights,
    }));
  };

  const handleToggleChange = (value: boolean) => {
    setSynopsisValues((prev: any) => ({
      ...prev,
      isChecked: value,
    }));
  };

  const handleSynopsisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSynopsisValues((prev: any) => ({
      ...prev,
      synopsis: value,
    }));
  };

  // Store values in session storage whenever synopsisValues changes
  useEffect(() => {
    setSessionStorage("Synopsis & Genre", synopsisValues);
  }, [synopsisValues]);

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">
          Synopsis & Genre
          <span className="mandatoryField">*</span>
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <div>
          <p className="contentLabelName">Synopsis</p>
          <textarea
            className="synopsisTextArea"
            value={synopsisValues.synopsis}
            onChange={handleSynopsisChange}
          />
          {errors.synopsisError && (
            <p className="error">{errors.synopsisError}</p>
          )}
        </div>

        <div style={{ marginTop: "35px" }}>
          <p className="text-white ft16 ftw700">
            Movie Genre
            <span className="mandatoryField">*</span>
          </p>

          <div className="synopsis-grid-container">
            {movieGenreTypes.map((item: MovieGenreType) => (
              <div className="synopsis-grid-item" key={item.name}>
                <input
                  type="checkbox"
                  id={item.name}
                  name="genre"
                  value={item.name}
                  checked={synopsisValues.selectedGenres.includes(item.name)}
                  onChange={handleGenreChange}
                />
                <label htmlFor={item.name}> {item.name}</label>
              </div>
            ))}
          </div>
          {errors.genreError && <p className="error">{errors.genreError}</p>}
        </div>

        <div style={{ marginTop: "50px" }}>
          <div style={{ display: "flex", gap: "25px" }}>
            <p className="text-white ft16 ftw700">
              Registered Copyright under IPR ACT
              <span className="mandatoryField">*</span>
            </p>
            <p>
              <Toggle
                checked={synopsisValues.isChecked}
                onChange={handleToggleChange}
              />
            </p>
          </div>

          <div
            className="synopsis-grid-container"
            style={{ gridTemplateRows: "repeat(1, 1fr)" }}
          >
            {copyRightTypes.map((item: MovieGenreType) => (
              <div
                key={item.name}
                className={`${
                  synopsisValues.isChecked
                    ? "synopsis-grid-item"
                    : "disabledCopy"
                }`}
              >
                <input
                  type="checkbox"
                  id={item.name}
                  name="copyright"
                  value={item.name}
                  checked={synopsisValues.copyRightValues.includes(item.name)}
                  onChange={handleCopyRightChange}
                  className={`${
                    synopsisValues.isChecked ? "" : "disabledCheck"
                  }`}
                />
                <label
                  htmlFor={item.name}
                  className={`${
                    synopsisValues.isChecked ? "" : "disabledCheckLabel"
                  }`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          {errors.copyrightError && (
            <p className="error">{errors.copyrightError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SynopsisGenre;
