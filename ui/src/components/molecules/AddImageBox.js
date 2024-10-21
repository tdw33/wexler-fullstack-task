import React from "react";
import Button from "../atoms/Button";

const AddImageBox = ({ onClick }) => {
  return (
    <div className="w-48 h-48 m-2 border-2 border-dashed border-gray-300 flex items-center justify-center">
      <Button onClick={onClick}>Add Image</Button>
    </div>
  );
};

export default AddImageBox;
