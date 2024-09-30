import React, { useCallback, useEffect, useState } from "react";
import { movieStatusTypeMenu } from "../../utils/data";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { DatePicker } from "rsuite";
import {
  companyNameRegex,
  mobileRegex,
  nameRegex,
} from "../../utils/RegExpressions";

const DistributionRelease = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [movieStatus, setmovieStatus] = useState(
    sessionStorage.getItem("movie status") || "Released"
  );

  const [distributionValues, setDistributionValues] = useState(
    getSessionStorage("Distribution & Release") || {
      releaseDate: "",
      distributorName: "",
      distributorCompanyName: "",
      distributorContact: "",
      expectedReleaseDate: "",
      poojaDate: "",
    }
  );

  const [errors, setErrors] = useState({
    releaseDateError: "",
    distributorNameError: "",
    distributorCompanyNameError: "",
    distributorContactError: "",
    expectedReleaseDateError: "",
    poojaDateError: "",
  });

  const validateDistributionValues = useCallback(() => {
    let errorMessages = {
      releaseDateError: "",
      distributorNameError: "",
      distributorCompanyNameError: "",
      distributorContactError: "",
      expectedReleaseDateError: "",
      poojaDateError: "",
    };
    const currentDate = new Date(); // Get today's date
    currentDate.setHours(0, 0, 0, 0); // Set to midnight to ensure comparison is only by date

    if (distributionValues.releaseDate !== "") {
      const releaseDate = new Date(distributionValues.releaseDate);
      if (releaseDate >= currentDate) {
        errorMessages.releaseDateError = "Release date should be a past date";
      }
    }
    if (
      distributionValues.distributorName !== "" &&
      !nameRegex.test(distributionValues.distributorName)
    ) {
      errorMessages.distributorNameError =
        "Name should contain 3-30 letters and no special characters";
    }
    if (
      distributionValues.distributorCompanyName !== "" &&
      !companyNameRegex.test(distributionValues.distributorCompanyName)
    ) {
      errorMessages.distributorCompanyNameError =
        "Company  name should contain 3-20 letters and no special characters";
    }
    if (
      distributionValues.distributorContact !== "" &&
      !mobileRegex.test(distributionValues.distributorContact)
    ) {
      errorMessages.distributorContactError = "Invalid contact no";
    }

    if (distributionValues.expectedReleaseDate === "") {
      errorMessages.expectedReleaseDateError = "";
    } else {
      const expectedReleaseDate = new Date(
        distributionValues.expectedReleaseDate
      );
      if (expectedReleaseDate <= currentDate) {
        errorMessages.expectedReleaseDateError =
          "Expected release date should be a future date";
      }
    }
    if (distributionValues.poojaDate === "") {
      errorMessages.poojaDateError = "";
    } else {
      const poojaDate = new Date(distributionValues.poojaDate);
      if (poojaDate <= currentDate) {
        errorMessages.poojaDateError = "Pooja date should be a future date";
      }
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [distributionValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateDistributionValues();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
      setSessionStorage("Distribution & Release", distributionValues);
    }
  }, [
    triggerValidation,
    distributionValues,
    setIsStepValid,
    validateDistributionValues,
    setTriggerValidation,
  ]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Distribution & Release", distributionValues);
  }, [distributionValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setDistributionValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChange = (event: any) => {
    setmovieStatus(event.target.value); // Update state on change
    if (event.target.value === "Released") {
      setDistributionValues((prev: any) => ({
        ...prev,
        releaseDate: "",
        distributorName: "",
        distributorCompanyName: "",
        distributorContact: "",
        expectedReleaseDate: "",
        poojaDate: "",
      }));
    } else if (event.target.value === "Un Released") {
      setDistributionValues((prev: any) => ({
        ...prev,
        releaseDate: "",
        distributorName: "",
        distributorCompanyName: "",
        distributorContact: "",
        expectedReleaseDate: "",
        poojaDate: "",
      }));
    } else if (event.target.value === "Under Production") {
      setDistributionValues((prev: any) => ({
        ...prev,
        releaseDate: "",
        distributorName: "",
        distributorCompanyName: "",
        distributorContact: "",
        expectedReleaseDate: "",
        poojaDate: "",
      }));
    }

    sessionStorage.setItem("movie status", event.target.value);
  };

  const handleDateChange = (id: string, date: Date | null) => {
    setDistributionValues((prev: any) => ({
      ...prev,
      [id]: formatDate(date), // Store ISO string format
    }));
  };

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Distribution & Release</p>
      </div>

      <div style={{ marginTop: "35px" }}>
        <div>
          <p className="text-white ft16 ftw700">
            Movie Status
            <span className="mandatoryField">*</span>
          </p>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15%",
          }}
        >
          {movieStatusTypeMenu.map((item) => (
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
              }}
              key={item.id}
            >
              <input
                type="radio"
                id={item.title}
                name="contentType"
                value={item.title}
                checked={movieStatus === item.title}
                onChange={handleChange}
                className="custom-radio"
              />
              <label className="contentLabelName">{item.title}</label>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "50px" }}>
          {movieStatus === "Released" && (
            <>
              <div className="gridContainerStyle">
                <div className="gridItemStyle">
                  <p className="contentLabelName">Release Date</p>
                  <DatePicker
                    className="releaseDate"
                    value={
                      distributionValues.releaseDate
                        ? new Date(distributionValues.releaseDate)
                        : null
                    }
                    onChange={(date: any) =>
                      handleDateChange("releaseDate", date)
                    }
                  />
                  {errors.releaseDateError && (
                    <p className="error">{errors.releaseDateError}</p>
                  )}
                </div>
                <div className="gridItemStyle">
                  <p className="contentLabelName">Distributor Name</p>
                  <input
                    className="contentInput"
                    id="distributorName"
                    value={distributionValues.distributorName}
                    onChange={handleInputChange}
                  />
                  {errors.distributorNameError && (
                    <p className="error">{errors.distributorNameError}</p>
                  )}
                </div>
                <div className="gridItemStyle">
                  <p className="contentLabelName">Distributor Company Name</p>
                  <input
                    className="contentInput"
                    id="distributorCompanyName"
                    value={distributionValues.distributorCompanyName}
                    onChange={handleInputChange}
                  />
                  {errors.distributorCompanyNameError && (
                    <p className="error">
                      {errors.distributorCompanyNameError}
                    </p>
                  )}
                </div>
                <div className="gridItemStyle">
                  <p className="contentLabelName">
                    Distributor Contact Details
                  </p>
                  <input
                    className="contentInput"
                    id="distributorContact"
                    type="number"
                    value={distributionValues.distributorContact}
                    onChange={handleInputChange}
                  />
                  {errors.distributorContactError && (
                    <p className="error">{errors.distributorContactError}</p>
                  )}
                </div>
              </div>
            </>
          )}
          {movieStatus === "Un Released" && (
            <>
              <p className="contentLabelName">Expected Release Date</p>
              <DatePicker
                className="releaseDate"
                value={
                  distributionValues.expectedReleaseDate
                    ? new Date(distributionValues.expectedReleaseDate)
                    : null
                }
                onChange={(date: any) =>
                  handleDateChange("expectedReleaseDate", date)
                }
                style={{ width: "100%" }}
              />
              {errors.expectedReleaseDateError && (
                <p className="error">{errors.expectedReleaseDateError}</p>
              )}
            </>
          )}
          {movieStatus === "Under Production" && (
            <>
              <p className="contentLabelName">Pooja Date</p>
              <DatePicker
                className="releaseDate"
                value={
                  distributionValues.poojaDate
                    ? new Date(distributionValues.poojaDate)
                    : null
                }
                onChange={(date: any) => handleDateChange("poojaDate", date)}
                style={{ width: "100%" }}
              />
              {errors.poojaDateError && (
                <p className="error">{errors.poojaDateError}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionRelease;
