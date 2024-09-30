import React, { useEffect, useState } from "react";
import FourFieldLayout from "./FourFieldLayout";
import SixFieldLayout from "./SixFieldLayout";
import Events from "./Events";
import MusicAlbums from "./MusicAlbums";
import FeatureFlim from "./FeatureFlim";
import { contentTypeMenu } from "../../utils/data";

const ContentType = ({
  setIsStepValid,
  triggerValidation,
  setTriggerValidation,
}: any) => {
  const [selectedContent, setSelectedContent] = useState(
    sessionStorage.getItem("contentType") || "Feature Film"
  );

  useEffect(() => {
    const content = sessionStorage.getItem("contentType") || "";
    if (content === "") {
      sessionStorage.setItem("contentType", "Feature Film");
    } else {
      sessionStorage.setItem("contentType", content);
    }
  }, []);

  const handleChange = (event: any) => {
    setSelectedContent(event.target.value); // Update state on change
    sessionStorage.setItem("contentType", event.target.value);
  };

  const renderContentLayout = () => {
    switch (selectedContent) {
      case "Documentary":
        return (
          <FourFieldLayout
            title={"Documentary"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Feature Film":
        return (
          <FeatureFlim
            title={"Feature Film"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Events & Live Shows":
        return (
          <Events
            title={"Events & Live Shows"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Short Film":
        return (
          <FourFieldLayout
            title={"Short Film"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Music Albums":
        return (
          <MusicAlbums
            title={"Music Albums"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Television Series":
        return (
          <SixFieldLayout
            title={"Television Series"}
            episodeLabel={"Total Episodes"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      case "Web Series":
        return (
          <SixFieldLayout
            title={"Web Series"}
            episodeLabel={"No Of Episode"}
            setIsStepValid={setIsStepValid}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        );
      default:
        return <div>Please select a content type</div>;
    }
  };
  return (
    <div>
      <div>
        <p className="text-white ft18 ftw700">Content Type</p>
      </div>

      <div
        style={{
          marginTop: "30px",
          height: "90px",
          paddingBottom: "30px",
          borderBottom: "1px dotted #2F144B",
        }}
        className="rights-grid-container"
      >
        {contentTypeMenu.map((item) => (
          <div
            style={{
              alignItems: "center",
            }}
            className="synopsis-grid-item"
            key={item.id}
          >
            <input
              type="radio"
              id={item.title}
              name="contentType"
              value={item.title}
              checked={selectedContent === item.title}
              onChange={handleChange}
              className="custom-radio"
            />
            <label className="contentLabelName">{item.title}</label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        {renderContentLayout()}
      </div>
    </div>
  );
};

export default ContentType;
