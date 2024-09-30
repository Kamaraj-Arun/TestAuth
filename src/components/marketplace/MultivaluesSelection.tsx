import React from "react";

const MultivaluesSelection = ({
  data,
  name,
  selectedItems,
  onMultiValueChange,
}: any) => {
  const handleCheckboxChange = (item: string) => {
    const updatedItems =
      selectedItems && selectedItems.includes(item)
        ? selectedItems.filter((selectedItem: string) => selectedItem !== item) // Deselect the item
        : [...selectedItems, item]; // Select the item

    onMultiValueChange(name, updatedItems); // Pass updated items to parent
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {data.map((type: any) => (
          <div
            key={type.item}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              id={`checkbox-${type.item}`}
              value={type.item}
              checked={selectedItems?.includes(type.item)} // Use item value for comparison
              onChange={() => handleCheckboxChange(type.item)}
              style={{ display: "none" }}
            />
            <label
              htmlFor={`checkbox-${type.item}`}
              style={{
                padding: "5px 14px",
                cursor: "pointer",
                backgroundColor: selectedItems?.includes(type.item)
                  ? "#4F1787"
                  : "#1B0036",
                color: "white",
                borderRadius: "5px",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              {type.item === "Action" ? "Action" : type.item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultivaluesSelection;
