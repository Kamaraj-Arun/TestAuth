import React from "react";
import ContentType from "./ContentType";
import SynopsisGenre from "./SynopsisGenre";
import CastCrew from "./CastCrew";
import Advisory from "./Advisory";
import Promotions from "./Promotions";
import DistributionRelease from "./DistributionRelease";
import RightsAvailable from "./RightsAvailable";
import ProducerInformation from "./ProducerInformation";

const StepsHandler = ({
  activeStep,
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const stepHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <ContentType
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 1:
        return (
          <SynopsisGenre
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 2:
        return (
          <CastCrew
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 3:
        return (
          <Advisory
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 4:
        return (
          <Promotions
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 5:
        return (
          <DistributionRelease
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 6:
        return (
          <RightsAvailable
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case 7:
        return (
          <ProducerInformation
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      default:
        return null;
    }
  };
  return <div>{stepHandler()}</div>;
};

export default StepsHandler;
