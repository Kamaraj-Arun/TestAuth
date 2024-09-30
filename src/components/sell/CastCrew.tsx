import React, { useCallback, useEffect, useState } from "react";
import {
  crewTitleOptions,
  customStyles2,
  starringOptions,
} from "../../utils/data";
import Select from "react-select";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers";
import { nameRegex, projectNameRegex } from "../../utils/RegExpressions";
import CreatableSelect from "react-select/creatable";

const CastCrew = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const defaultStarringValue = starringOptions
    .slice(1, 3)
    .map((item: any) => item.value);
  const getCrewDetails = getSessionStorage("Cast & Crew");
  const [castCrewValues, setCastCrewValues] = useState({
    starring: defaultStarringValue,
    title: [crewTitleOptions[0].value],
    name: "",
    crewDetails: getCrewDetails?.crewDetails || [],
    previousProject: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    previousProjectError: "",
  });

  const [starringValues, setStarringValues] = useState(
    castCrewValues?.starring?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || []
  );

  const [titleValues, setTitleValues] = useState(
    castCrewValues?.title?.map((item: any) => {
      return {
        label: item,
        value: item,
      };
    }) || [crewTitleOptions[0]]
  );

  const validateCastandCrew = useCallback(() => {
    let errorMessages = {
      nameError: "",
      previousProjectError: "",
    };

    if (castCrewValues.name !== "" && !nameRegex.test(castCrewValues.name)) {
      errorMessages.nameError =
        "Name should contain 3-30 letters and no special characters";
    }
    if (
      castCrewValues.previousProject !== "" &&
      !projectNameRegex.test(castCrewValues.previousProject)
    ) {
      errorMessages.previousProjectError =
        "project should contain max of 20 letters and no special characters";
    }

    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === ""); // Return true if all errors are empty
  }, [castCrewValues]);

  useEffect(() => {
    if (triggerValidation) {
      const isValid = validateCastandCrew();
      setIsStepValid(isValid);
      if (!isValid) {
        setTriggerValidation(false);
      }
      setSessionStorage("Cast & Crew", castCrewValues);
    }
  }, [
    triggerValidation,
    castCrewValues,
    setIsStepValid,
    validateCastandCrew,
    setTriggerValidation,
  ]);

  useEffect(() => {
    setSessionStorage("Cast & Crew", castCrewValues);
  }, [castCrewValues]);

  useEffect(() => {
    const fetchStars = starringValues?.map((item: any) => item.value);

    setCastCrewValues((prev: any) => ({
      ...prev,
      starring: fetchStars,
    }));
  }, [starringValues, setCastCrewValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCastCrewValues((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTitleChange = (selectedOptions: any) => {
    const temp = [selectedOptions];
    setCastCrewValues((prev) => ({
      ...prev,
      title: [selectedOptions?.value],
    }));
    setTitleValues(temp); // Update the state with selected options
  };

  const handleStarChange = (selectedOptions: any) => {
    setStarringValues(selectedOptions); // Update the state with selected options
  };

  const handleAddCrew = () => {
    if (validateCastandCrew()) {
      const { starring, previousProject, title, name } = castCrewValues;
      const updatedTitle = title[0];

      if (starring.length > 0 && title.length > 0 && name) {
        setCastCrewValues((prev: any) => ({
          ...prev,
          crewDetails: prev.crewDetails
            ? [
                ...prev?.crewDetails,
                { previousProject, title: updatedTitle, name },
              ]
            : [
                {
                  title: updatedTitle,
                  previousProject,
                  name,
                },
              ],
          name: "",
          previousProject: "",
        }));
      }
    }
  };

  const handleDeleteCrew = (index: number) => {
    setCastCrewValues((prev: any) => ({
      ...prev,
      crewDetails: prev?.crewDetails?.filter((_: any, i: any) => i !== index),
    }));
  };

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Cast & Crew</p>
      </div>

      <div style={{ marginTop: "35px" }}>
        <div>
          <p className="contentLabelName" style={{ paddingBottom: "20px" }}>
            Starring<span className="mandatoryField">*</span>
          </p>
          {starringValues?.length > 0 && starringValues[0].value !== "" ? (
            <CreatableSelect
              isMulti
              options={starringOptions}
              onChange={handleStarChange}
              placeholder="Type and press Enter"
              noOptionsMessage={() => null}
              className="createableSelect"
              styles={customStyles2}
            />
          ) : (
            <CreatableSelect
              isMulti
              options={starringOptions}
              onChange={handleStarChange}
              placeholder="Type and press Enter"
              noOptionsMessage={() => null}
              styles={customStyles2}
              className="createableSelect"
            />
          )}
        </div>

        <div style={{ marginTop: "35px" }}>
          <p className="text-white ft16 ftw700">Crew Details</p>

          <div
            className="gridContainerStyle"
            style={{ gridTemplateRows: "none" }}
          >
            <div className="gridItemStyle">
              <p className="contentLabelName">Title</p>

              {titleValues?.length > 0 && titleValues[0]?.value !== "" ? (
                <Select
                  options={crewTitleOptions}
                  styles={customStyles2}
                  className="titleDropDown"
                  onChange={handleTitleChange}
                  defaultValue={[crewTitleOptions[0]]}
                  // defaultValue={titleValues}
                />
              ) : (
                <Select
                  options={crewTitleOptions}
                  styles={customStyles2}
                  className="titleDropDown"
                  onChange={handleTitleChange}
                  defaultValue={[crewTitleOptions[0]]}
                />
              )}
            </div>
            <div className="gridItemStyle">
              <p className="contentLabelName">Name</p>
              <input
                className="contentInput"
                placeholder=""
                id="name"
                value={castCrewValues.name}
                onChange={handleInputChange}
              />
              {errors.nameError && <p className="error">{errors.nameError}</p>}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "25px" }}>
          <p className="contentLabelName">Previous Project Details</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input
              className="productionHouseName"
              placeholder=""
              style={{ marginTop: "0" }}
              id="previousProject"
              value={castCrewValues.previousProject}
              onChange={handleInputChange}
            />
            <button className="addButton" onClick={handleAddCrew}>
              Add
            </button>
          </div>
          {errors.previousProjectError && (
            <p className="error">{errors.previousProjectError}</p>
          )}
        </div>

        <div style={{ marginTop: "50px" }}>
          <div className="crewTable headerRow">
            {["S.No", "Title", "Name", "Previous Project Details"].map(
              (item: any, index: number) => (
                <p key={index} className="contentLabelName">
                  {item}
                </p>
              )
            )}
          </div>
          {castCrewValues?.crewDetails?.map((item: any, index: number) => (
            <div className="crewTableContent" key={index}>
              <p className="crewTableValue">{index + 1}</p>
              <p className="crewTableValue">{item.title}</p>
              <p className="crewTableValue">{item.name}</p>
              <p
                className="crewTableValue"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {item.previousProject}
                <RiDeleteBin5Line
                  className="crewTableValueIcon"
                  onClick={() => handleDeleteCrew(index)}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastCrew;
