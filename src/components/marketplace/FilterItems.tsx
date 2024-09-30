import React, { useEffect, useState } from "react";
import CustomAccordion from "./CustomAccordion";
import Select from "react-select";
import {
  languageOptions,
  contentTypes,
  customStyles,
  genreTypes,
  indianRatingTypes,
  internationalRatingTypes,
  rightsTypes,
  yearOptions,
} from "../../utils/data";
import MultivaluesSelection from "./MultivaluesSelection";
import { RangeSlider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import axios from "axios";
import { REACT_APP_DEV_URL } from "../../utils/api";

const FilterItems = ({
  selectedFilterValues,
  setSelectedFilterValues,
}: any) => {
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<any[]>([]);
  const [selectedStarring, setSelectedStarring] = useState<any[]>([]);
  const [selectedDirector, setSelectedDirector] = useState<any[]>([]);
  const [selectedYears, setSelectedYears] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("yes");
  const [rangeValue, setRangeValue] = useState<[number, number]>([60, 120]);
  const [producerList, setProducerList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [directorList, setDirectorList] = useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<number[]>(
    []
  ); // Moved state here
  const [selectedRights, setSelectedRights] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedIndianRating, setSelectedIndianRating] = useState<number[]>(
    []
  );
  const [selectedInternationalRating, setSelectedInternationalRating] =
    useState<number[]>([]);

  useEffect(() => {
    fetchProducersList();
  }, []);

  const fetchProducersList = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_DEV_URL}/selling-info/get-master-data-for-filter`
      );
      const tempProducerList = res.data.data.producer.map((item: any) => {
        return {
          value: item,
          label: item,
        };
      });
      const tempStarringList = res.data.data.starring.map((item: any) => {
        return {
          value: item,
          label: item,
        };
      });
      const tempDirectorList = res.data.data.director.map((item: any) => {
        return {
          value: item,
          label: item,
        };
      });
      setProducerList(tempProducerList);
      setStarList(tempStarringList);
      setDirectorList(tempDirectorList);
    } catch (e) {
      console.log("failed to fetch producer, director, starrs", e);
    }
  };

  // Handle range change
  const handleRangeChange = (value: [number, number]) => {
    setRangeValue(value);
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      durationMin: value[0],
      durationMax: value[1],
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      releasedStatus: e.target.value,
    }));
  };

  // Handler for when languages are selected
  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(selectedOptions); // Update the state with selected options
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      language: selectedOptions.map((item: any) => item.value),
    }));
  };

  const handleProducerChange = (selectedOptions: any) => {
    setSelectedProducer(selectedOptions); // Update the state with selected options
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      producer: selectedOptions.map((item: any) => item.value),
    }));
  };

  const handleDirectorChange = (selectedOptions: any) => {
    setSelectedDirector(selectedOptions); // Update the state with selected options
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      director: selectedOptions.map((item: any) => item.value),
    }));
  };

  const handleStarringChange = (selectedOptions: any) => {
    setSelectedStarring(selectedOptions); // Update the state with selected options
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      starring: selectedOptions.map((item: any) => item.value),
    }));
  };

  const handleYearsChange = (selectedOptions: any) => {
    setSelectedYears(selectedOptions); // Update the state with selected options
    setSelectedFilterValues((prev: any) => ({
      ...prev,
      yearOfRelease: selectedOptions.map((item: any) => item.value),
    }));
  };

  // Handle multi-value change for content types and rights
  const handleMultiValueChange = (name: string, selectedItems: number[]) => {
    if (name === "contentType") {
      setSelectedContentTypes(selectedItems);
    } else if (name === "rights") {
      setSelectedRights(selectedItems);
    } else if (name === "genre") {
      setSelectedGenres(selectedItems);
    } else if (name === "indianRating") {
      setSelectedIndianRating(selectedItems);
    } else if (name === "internationalRating") {
      setSelectedInternationalRating(selectedItems);
    }

    setSelectedFilterValues((prev: any) => ({
      ...prev,
      [name]: selectedItems,
    }));
  };

  return (
    <aside>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Language"}>
              <Select
                // defaultValue={[languageOptions[0]]}
                isMulti
                name="language"
                options={languageOptions}
                className="basic-multi-select"
                classNamePrefix="languageSelect"
                styles={customStyles}
                placeholder="Enter a language"
                value={selectedLanguages}
                onChange={handleLanguageChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Content Type"}>
              <MultivaluesSelection
                data={contentTypes}
                name="contentType"
                selectedItems={selectedContentTypes} // Pass selected items via props
                onMultiValueChange={handleMultiValueChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Genre"}>
              <MultivaluesSelection
                data={genreTypes}
                name="genre"
                selectedItems={selectedGenres} // Pass selected items via props
                onMultiValueChange={handleMultiValueChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Producer"}>
              {producerList && producerList?.length > 0 && (
                <Select
                  // defaultValue={[producerList[0]]}
                  isMulti
                  name="producer"
                  options={producerList}
                  className="basic-multi-select"
                  classNamePrefix="languageSelect"
                  styles={customStyles}
                  value={selectedProducer}
                  placeholder="Enter producer name"
                  onChange={handleProducerChange}
                />
              )}
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Director"}>
              {directorList && directorList?.length > 0 && (
                <Select
                  // defaultValue={[directorOptions[0]]}
                  isMulti
                  name="director"
                  options={directorList}
                  className="basic-multi-select"
                  classNamePrefix="languageSelect"
                  styles={customStyles}
                  value={selectedDirector}
                  placeholder="Enter director name"
                  onChange={handleDirectorChange}
                />
              )}
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Starring"}>
              {starList && starList?.length > 0 && (
                <Select
                  // defaultValue={[starOptions[0]]}
                  isMulti
                  name="starring"
                  options={starList}
                  className="basic-multi-select"
                  classNamePrefix="languageSelect"
                  styles={customStyles}
                  value={selectedStarring}
                  placeholder="Enter actors name"
                  onChange={handleStarringChange}
                />
              )}
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Indian Rating"}>
              <MultivaluesSelection
                data={indianRatingTypes}
                name="indianRating"
                selectedItems={selectedIndianRating} // Pass selected items via props
                onMultiValueChange={handleMultiValueChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Duration in Minutes"}>
              <div>
                <RangeSlider
                  defaultValue={[60, 120]}
                  value={rangeValue}
                  onChange={handleRangeChange}
                  min={0}
                  max={180}
                  step={1}
                  graduated
                  progress
                  style={{ marginBottom: 10 }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="spanMin">{rangeValue[0]}</span>
                  <span className="spanMin">{rangeValue[1]}</span>
                </div>
              </div>
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"International Rating"}>
              <MultivaluesSelection
                data={internationalRatingTypes}
                name="internationalRating"
                selectedItems={selectedInternationalRating} // Pass selected items via props
                onMultiValueChange={handleMultiValueChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Rights"}>
              <MultivaluesSelection
                data={rightsTypes}
                name="rights"
                selectedItems={selectedRights} // Pass selected items via props
                onMultiValueChange={handleMultiValueChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Released Status"}>
              <div style={{ display: "flex", gap: "25px" }}>
                {["yes", "no"].map((item: any) => (
                  <div
                    key={item}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="radio"
                      name="myRadio"
                      value={item}
                      className="custom-radio"
                      id={item}
                      onChange={handleRadioChange}
                      checked={selectedValue === item}
                    />
                    <label
                      htmlFor={item}
                      className="releaseLabel"
                      style={{ textTransform: "capitalize" }}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="filterItems">
        <div style={{ background: "#2F144B", borderRadius: "10px" }}>
          <div style={{ padding: "15px" }}>
            <CustomAccordion title={"Year of Release"}>
              <Select
                // defaultValue={[yearOptions[0]]}
                isMulti
                name="yearOfRelease"
                options={yearOptions}
                className="basic-multi-select"
                classNamePrefix="languageSelect"
                styles={customStyles}
                value={selectedYears}
                placeholder="Enter release year"
                onChange={handleYearsChange}
              />
            </CustomAccordion>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterItems;
