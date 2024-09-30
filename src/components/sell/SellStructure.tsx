/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import StepsHandler from "./StepsHandler";
import toast from "react-hot-toast";
import { Progress } from "rsuite";

const steps = [
  "Content Type",
  "Synopsis & Genre",
  "Cast & Crew",
  "Advisory",
  "Promotions",
  "Distribution & Release",
  "Rights Available",
  "Producer Information",
];

const SellStructure = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleNext = () => {
    setTriggerValidation(true); // Set to trigger validation
  };

  useEffect(() => {
    if (triggerValidation && isStepValid) {
      advanceStep();
    }
  }, [isStepValid, triggerValidation]);

  const advanceStep = () => {
    if (isStepValid && activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      setIsStepValid(false); // Reset validation state for the next step
      setTriggerValidation(false); // Reset trigger state
    } else {
      toast.error("Please fill out all required fields before proceeding.");
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%" }}>
        <div className="leftBox">
          <div>
            <div>
              <p
                style={{ textAlign: "center" }}
                className="text-white ft24 ftw700"
              >
                Sell Digital Rights
              </p>
            </div>

            <div className="vertical-stepper">
              <ul className="step-list">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className={`step-item  ${index === activeStep ? "step-item-active" : ""
                      }`}
                    onClick={() => {
                      if (index < activeStep) {
                        setActiveStep(index);
                      }
                      //  else {
                      //   handleNext();
                      // }
                    }}
                    style={{ cursor: index < activeStep ? "pointer" : "" }}
                  >
                    <span className="step-number">
                      {index === activeStep ? (
                        <FaCheckCircle className="stepActiveIcon" />
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="step-label">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                width: "200px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p className="text-white" style={{ textAlign: "center" }}>
                {activeStep} of 8 steps completed
              </p>
              <>
                <Progress.Line
                  percent={(activeStep / 8) * 100}
                  showInfo={false}
                  strokeColor="#4F1787" // Fill color
                  trailColor="#2F144B" // Background color
                  style={{
                    height: "8px", // Customize height of the progress bar if needed
                  }}
                />
              </>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "75%" }}>
        <div className="rightBox">
          <div style={{ height: "200vh" }}>
            <div
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "5px",
              }}
            >
              <div className="steps-container">
                <StepsHandler
                  activeStep={activeStep}
                  setIsStepValid={setIsStepValid}
                  triggerValidation={triggerValidation}
                  setTriggerValidation={setTriggerValidation}
                />
              </div>

              <div className="step-actions">
                <button
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  className="prevBtn"
                >
                  <FaChevronLeft className="arrowIcon" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                  className="nextBtn"
                >
                  <FaChevronRight className="arrowIcon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellStructure;
