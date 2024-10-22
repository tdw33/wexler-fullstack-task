import React from "react";
import Button from "../atoms/Button";

const AddImageBox = ({ onClick, width = "w-48", height = "h-48" }) => {
  return (
    <div
      className={`${width} ${height} m-2 border-2 border-dashed border-gray-300 flex items-center justify-center`}
    >
      <Button color="primary" variation="outlined" onClick={onClick}>
        Add Image
      </Button>
    </div>
  );
};

export default AddImageBox;
