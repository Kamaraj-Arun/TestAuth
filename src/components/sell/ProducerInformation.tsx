import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { CallingCodes, customStyles2 } from "../../utils/data";
import {
  clearSpecificSessionStorage,
  getSessionStorage,
  setSessionStorage,
} from "../../utils/helpers";
import {
  addressRegex,
  companyNameRegex,
  emailRegex,
  mobileRegex,
  nameRegex,
} from "../../utils/RegExpressions";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { REACT_APP_DEV_URL } from "../../utils/api";

const ProducerInformation = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const token = sessionStorage.getItem("token") || "";
  const defaultCallingCode = CallingCodes.slice(0, 1).map(
    (item: any) => item.value
  );
  const [producerInfo, setProducerInfo] = useState(
    getSessionStorage("Producer Information") || {
      productionHouseName: "",
      producerFirstName: "",
      producerLastName: "",
      email: "",
      address: "",
      countryCode: defaultCallingCode,
      phone: "",
    }
  );

  const [errors, setErrors] = useState({
    productionHouseError: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneError: "",
    addressError: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(
    producerInfo?.countryCode?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = selectedCountry?.map((item: any) => item.value);

    setProducerInfo((prev: any) => ({
      ...prev,
      countryCode: fetchCountry,
    }));
  }, [selectedCountry, setProducerInfo]);

  useEffect(() => {
    // Store the values in session storage whenever they change
    setSessionStorage("Producer Information", producerInfo);
  }, [producerInfo]);

  const callingCodeOptions = CallingCodes.map(({ country, value, code }) => ({
    country,
    value,
    code,
    label: `${value}`,
  }));

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    setProducerInfo((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCountryCodeChange = (selectedOptions: any) => {
    const temp = [selectedOptions];
    setSelectedCountry(temp); // Update the state with selected options
  };

  const validateProducerInfo = useCallback(() => {
    let errorMessages = {
      productionHouseError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      phoneError: "",
      addressError: "",
    };

    // Production house name validation
    if (producerInfo.productionHouseName.trim() === "") {
      errorMessages.productionHouseError = "Production house name is required.";
    }
    if (
      producerInfo.productionHouseName !== "" &&
      !companyNameRegex.test(producerInfo.productionHouseName)
    ) {
      errorMessages.productionHouseError =
        "Company  name should contain 3-20 letters and no special characters";
    }

    // First name validation
    if (producerInfo.producerFirstName.trim() === "") {
      errorMessages.firstNameError = "First name is required.";
    }
    if (
      producerInfo.producerFirstName !== "" &&
      !nameRegex.test(producerInfo.productionHouseName)
    ) {
      errorMessages.firstNameError =
        "Name should contain 3-30 letters and no special characters";
    }

    // Last name validation
    if (producerInfo.producerLastName.trim() === "") {
      errorMessages.lastNameError = "Last name is required.";
    }
    if (
      producerInfo.producerLastName !== "" &&
      !nameRegex.test(producerInfo.producerLastName)
    ) {
      errorMessages.lastNameError =
        "Name should contain 3-30 letters and no special characters";
    }

    // Email validation

    if (!emailRegex.test(producerInfo.email)) {
      errorMessages.emailError = "Invalid email address.";
    }

    // Phone validation based on the selected country
    if (producerInfo.phone.trim() === "" || selectedCountry.length === 0) {
      errorMessages.phoneError = "Phone number is required.";
    } else {
      // Define phone number validation logic based on country

      if (!mobileRegex.test(producerInfo.phone)) {
        errorMessages.phoneError =
          "Invalid phone number. It should contain between 6 and 15 digits.";
      }
    }

    // Address validation
    if (producerInfo.address.trim() === "") {
      errorMessages.addressError = "Address is required.";
    }

    if (
      producerInfo.address !== "" &&
      !addressRegex.test(producerInfo.address)
    ) {
      errorMessages.addressError = "invalid address";
    }

    setErrors(errorMessages);

    // Return true if no error messages are present
    return Object.values(errorMessages).every((msg) => msg === "");
  }, [producerInfo, selectedCountry]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateProducerInfo();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
    }
  }, [
    triggerValidation,
    validateProducerInfo,
    setIsStepValid,
    setTriggerValidation,
  ]);

  const onSubmit = async () => {
    const producerInformation = getSessionStorage("Producer Information");
    const rightsAvailable = getSessionStorage("Rights Available");
    const distributionRelease = getSessionStorage("Distribution & Release");
    const movieStatus = sessionStorage.getItem("movie status");
    const advisory = getSessionStorage("Advisory");
    const synopsis = getSessionStorage("Synopsis & Genre");
    const promotions = getSessionStorage("Promotions");
    const castCrew = getSessionStorage("Cast & Crew");
    const contentType = sessionStorage.getItem("contentType");
    const firstStep = getSessionStorage(contentType!);

    const promotionAwards = promotions?.awardsUrl?.map(
      (item: any, index: any) => {
        return {
          sno: `${index + 1}`,
          url: item,
        };
      }
    );
    const tempCrewDetails = castCrew?.crewDetails?.map(
      (item: any, index: number) => {
        return {
          index: `${index + 1}`,
          title: item.title,
          name: item.name,
          previousProject: item.previousProject,
        };
      }
    );
    if (validateProducerInfo()) {
      try {
        const temp = {
          sellingInfo: {
            contentType: {
              type: contentType,
              content: firstStep,
            },
            synopsisGenre: {
              synopsis: synopsis?.synopsis,
              genre: synopsis?.selectedGenres,
              registeredUnderIprAct: synopsis?.copyRightValues,
            },
            castCrew: {
              starring: castCrew.starring,
              crewDetails: tempCrewDetails,
            },
            advisory: {
              indianCensorCertificate: advisory?.censorCeritificateUrl,
              movieDurationInMin: advisory?.movieDurationTime,
              internationalMovieFilmRating: advisory?.internationalMovieRating,
              indianMovieFilmRating: advisory?.indianMovieRating,
              producerCouncilRegDetails: {
                region: advisory?.region,
                state: advisory?.state,
                councilName: advisory?.councilName,
              },
            },
            promotions: {
              moviePoster: promotions?.moviePosterUrl,
              trailerLink: promotions?.movieTrailerUrl,
              imdbUrl: promotions?.imdbUrl,
              wikiLink: promotions?.wikipediaUrl,
              edir: promotions?.edirUrl,
              unreleasedLink: promotions?.unreleasedUrl,
              awards: promotionAwards,
            },
            distributionRelease: {
              movieStatus: movieStatus,
              releaseDate: distributionRelease?.releaseDate, // how to pass release date
              distributorName: distributionRelease?.distributorName,
              companyName: distributionRelease?.distributorCompanyName,
              contactNumber: distributionRelease?.distributorContact,
              expectedReleaseDate: distributionRelease?.expectedReleaseDate,
              poojaDate: distributionRelease?.poojaDate,
            },
            rights: {
              theatricalRights: rightsAvailable?.TheatricalRights,
              televisionRights: rightsAvailable?.TelevisionRights,
              digitalRights: rightsAvailable?.DigitalRights,
              travel: rightsAvailable?.TravelRights,
              audio: rightsAvailable?.Audio,
              dubbingRights: rightsAvailable?.["Dubbing&RemakeRights"],
              overseaseRights: rightsAvailable?.OverseasRights,
              emergingRights: rightsAvailable?.EmergingRights,
              otherRights: rightsAvailable?.OtherRights, /// other rights add
            },
            producerInfo: {
              houseName: producerInformation?.productionHouseName,
              fname: producerInformation?.producerFirstName,
              lname: producerInformation?.producerLastName,
              phone: "91" + producerInformation.phone,
              email: producerInformation?.email,
              address: producerInformation?.address,
            },
          },
        };

        const res = await axios.post(
          `${REACT_APP_DEV_URL}/selling-info/create`,
          temp,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          clearSpecificSessionStorage(["token", "userName", "mobileno"]);
          // here i am excluding token and userName key in session storage and clearing
          // every other key in session storage
          navigate("/dashboard");
        }
      } catch {
        toast.error("Error during form submission");
      }
    }
  };

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Producer Information</p>
      </div>

      <div style={{ marginTop: "35px" }}>
        <div>
          <p className="contentLabelName">
            Production House Name
            <span className="mandatoryField">*</span>
          </p>
          <input
            className="productionHouseName"
            id="productionHouseName"
            value={producerInfo.productionHouseName}
            onChange={handleInputChange}
          />
          {errors.productionHouseError && (
            <p className="error">{errors.productionHouseError}</p>
          )}
        </div>

        <div className="gridContainerStyle">
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Producer First Name
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              id="producerFirstName"
              value={producerInfo.producerFirstName}
              onChange={handleInputChange}
            />
            {errors.firstNameError && (
              <p className="error">{errors.firstNameError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Producer Last Name
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              id="producerLastName"
              value={producerInfo.producerLastName}
              onChange={handleInputChange}
            />
            {errors.lastNameError && (
              <p className="error">{errors.lastNameError}</p>
            )}
          </div>
          <div className="gridItemStyle">
            {" "}
            <p className="contentLabelName">
              Phone
              <span className="mandatoryField">*</span>
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "12px",
                gap: "5px",
              }}
            >
              {/* {selectedCountry.length > 0 && selectedCountry[0].value !== "" ? (
                <Select
                  options={callingCodeOptions}
                  styles={customStyles2}
                  className="phoneNumberDropdown"
                  onChange={handleCountryCodeChange}
                  defaultValue={selectedCountry}
                />
              ) : (
                <Select
                  options={callingCodeOptions}
                  styles={customStyles2}
                  className="phoneNumberDropdown"
                  onChange={handleCountryCodeChange}
                  defaultValue={[callingCodeOptions[0]]}
                />
              )} */}
              <label className="contentInputPhone" style={{ width: "10%" }}>
                +91
              </label>
              <input
                className="contentInputPhone"
                type="number"
                id="phone"
                value={producerInfo.phone}
                onChange={handleInputChange}
              />
            </div>
            {errors.phoneError && <p className="error">{errors.phoneError}</p>}
          </div>
          <div className="gridItemStyle">
            <p className="contentLabelName">
              Email
              <span className="mandatoryField">*</span>
            </p>
            <input
              className="contentInput"
              type="email"
              id="email"
              value={producerInfo.email}
              onChange={handleInputChange}
            />
            {errors.emailError && <p className="error">{errors.emailError}</p>}
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <p className="contentLabelName">
            Address
            <span className="mandatoryField">*</span>
          </p>
          <textarea
            className="synopsisTextArea"
            id="address"
            value={producerInfo.address}
            onChange={handleInputChange}
          />
          {errors.addressError && (
            <p className="error">{errors.addressError}</p>
          )}
        </div>

        <div style={{ marginTop: "35px", float: "right" }}>
          <button
            className="addButton"
            style={{ width: "100%" }}
            type="button"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducerInformation;
