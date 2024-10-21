import React from "react";

const ImageThumbnail = ({ src, alt }) => {
  return (
    <div className="w-48 h-48 m-2">
      <img src={src} alt={alt} className="w-full h-full object-cover rounded" />
    </div>
  );
};

export default ImageThumbnail;
