import React from "react";
import ImageThumbnail from "../molecules/ImageThumbnail";
import AddImageBox from "../molecules/AddImageBox";

const ImageGrid = ({ images, onAddImage }) => {
  return (
    <div className="flex flex-wrap">
      {images.map((image) => (
        <ImageThumbnail key={image.id} src={image.url} alt={image.name} />
      ))}
      <AddImageBox onClick={onAddImage} />
    </div>
  );
};

export default ImageGrid;
