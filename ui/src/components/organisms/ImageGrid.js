import React from "react";
import ImageThumbnail from "../molecules/ImageThumbnail";
import AddImageBox from "../molecules/AddImageBox";

const ImageGrid = ({ images, onAddImage }) => {
  return (
    <div className="flex flex-wrap">
      {images.map((image) => (
        <ImageThumbnail
          key={image.id}
          src={image.url}
          alt={image.name}
          fileName={image.name}
          width="w-48"
          height="h-64"
        />
      ))}
      <AddImageBox onClick={onAddImage} width="w-48" height="h-64" />
    </div>
  );
};

export default ImageGrid;
