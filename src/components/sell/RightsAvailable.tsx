import React, { useState, useEffect } from "react";
import { masterRightTypes } from "../../utils/data";
import { getSessionStorage, setSessionStorage } from "../../utils/helpers"; // Assuming these helpers exist

interface MovieGenreType {
  name: string;
}

const RightsAvailable = ({
  setIsStepValid,
}: // triggerValidation,
// setTriggerValidation,
any) => {
  const initialAvailableRights = masterRightTypes.reduce((acc, curr) => {
    // Create an object with each rightType as key and an empty array as value
    return { ...acc, [curr.rightType.replace(/\s+/g, "")]: [] };
  }, {});
  // Initialize state with session storage or default values
  const [availableRights, setAvailableRights] = useState(
    getSessionStorage("Rights Available") || initialAvailableRights
  );

  // const [errors, setErrors] = useState<any>(
  //   masterRightTypes.reduce((acc, curr) => {
  //     return { ...acc, [curr.rightType.replace(/\s+/g, "")]: "" };
  //   }, {})
  // );
  // Function to update rights based on checkbox selection
  const handleRightChange = (
    rightCategory: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;

    // Update the state for the corresponding right category
    setAvailableRights((prevState: any) => {
      const updatedRights = checked
        ? [...(prevState[rightCategory] || []), value]
        : (prevState[rightCategory] || []).filter(
            (right: any) => right !== value
          );

      return {
        ...prevState,
        [rightCategory]: updatedRights,
      };
    });
  };

  // const validateRightsAvailable = useCallback(() => {
  //   let errorMessages = masterRightTypes.reduce((acc: any, curr) => {
  //     const key = curr.rightType.replace(/\s+/g, "");
  //     if (availableRights[key].length === 0) {
  //       acc[key] = `Please select at least one ${curr.rightType}`;
  //       // acc[key] = `Please select at least one ${curr.rightType}`;
  //     } else {
  //       acc[key] = "";
  //     }
  //     return acc;
  //   }, {});
  //   setErrors(errorMessages);
  //   return Object.values(errorMessages).every((msg) => msg === "");
  // }, [availableRights]);

  // useEffect(() => {
  //   if (triggerValidation) {
  //     const isValid = validateRightsAvailable();
  //     setIsStepValid(isValid);
  //     if (!isValid) {
  //       setTriggerValidation(false);
  //     }
  //   }
  // }, [
  //   triggerValidation,
  //   validateRightsAvailable,
  //   setIsStepValid,
  //   setTriggerValidation,
  // ]);

  // Store the state in session storage whenever `availableRights` changes
  useEffect(() => {
    setSessionStorage("Rights Available", availableRights);
    setIsStepValid(true);
  }, [availableRights]);

  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Rights Available</p>
      </div>

      {/* Loop through masterRightTypes to render each right category */}
      {masterRightTypes.map((ele: any) => {
        // Use rightType for key without spaces
        const categoryKey = ele.rightType.replace(/\s+/g, "");

        return (
          <div className="masterRightDiv" key={ele.id}>
            <p className="text-white ft16 ftw700">
              {ele.rightType}
              {/* {ele.isMandatory && <span className="mandatoryField">*</span>} */}
            </p>

            <div className="rights-grid-container">
              {ele.options.map((item: MovieGenreType) => (
                <div className="synopsis-grid-item" key={item.name}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name="rights"
                    value={item.name}
                    checked={availableRights[categoryKey]?.includes(item.name)} // Check if the option is selected
                    onChange={(event) => handleRightChange(categoryKey, event)}
                  />
                  <label htmlFor={item.name}> {item.name}</label>
                </div>
              ))}
            </div>

            {/* {errors[categoryKey] && (
              <p className="error">{errors[categoryKey]}</p>
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default RightsAvailable;
