import React from "react";

import Select from "react-select";
import { customStyles2, languageOptions } from "../../utils/data";

interface LanguageSelectProps {
  options?: any;
  defaultValue?: any;
  isMulti?: boolean;
  onChange?: (selectedOptions: any) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  options = languageOptions,
  defaultValue = null,
  // defaultValue = [languageOptions[1], languageOptions[2]],
  isMulti = true,
  onChange,
}) => {
  return (
    <div>
      <div style={{ marginTop: "12px" }}>
        <Select
          defaultValue={defaultValue}
          isMulti={isMulti}
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="languageSelect"
          styles={customStyles2}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default LanguageSelect;
