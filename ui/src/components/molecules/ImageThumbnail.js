import React from "react";

const ImageThumbnail = ({
  src,
  alt,
  fileName,
  width = "w-48",
  height = "h-64",
}) => {
  return (
    <div
      className={`card ${width} ${height} bg-base-100 shadow-xl m-2 overflow-hidden`}
    >
      <figure className="h-48">
        {" "}
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body p-2 h-16 flex items-center justify-center">
        {" "}
        <h2 className="card-title text-sm text-center truncate">{fileName}</h2>
      </div>
    </div>
  );
};

export default ImageThumbnail;
