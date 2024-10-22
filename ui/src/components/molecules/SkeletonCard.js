import React from "react";

const SkeletonCard = ({ width = "w-48", height = "h-48" }) => {
  return (
    <div
      className={`${width} ${height} m-2 bg-gray-200 rounded-lg overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse-gradient"></div>
    </div>
  );
};

export default SkeletonCard;
