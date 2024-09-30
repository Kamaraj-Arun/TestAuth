import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
            color: "white",
          }}
        >
          <p>{title}</p>
          <p
            onClick={() => {
              toggleAccordion();
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {isOpen ? <FaChevronUp /> : <FaAngleDown />}
          </p>
        </div>
        {isOpen && (
          <div
            style={{ paddingTop: "12px" }}
            className={`accordion-content ${isOpen ? "open" : "collapsed"}`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAccordion;
