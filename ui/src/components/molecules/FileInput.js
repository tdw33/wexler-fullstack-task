import React from "react";
import Button from "../atoms/Button";

const FileInput = ({ onChange }) => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onChange(e.target.files)}
        multiple
        accept="image/*"
        className="hidden"
      />
      <Button onClick={handleClick}>Select Images</Button>
    </div>
  );
};

export default FileInput;
