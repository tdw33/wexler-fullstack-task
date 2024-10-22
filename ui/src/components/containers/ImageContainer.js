import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageGrid from "../organisms/ImageGrid";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import SkeletonCard from "../molecules/SkeletonCard";

const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://localhost:9001/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddImage = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      alert("Only image files are allowed");
    }
    setSelectedFiles(validFiles);
  };

  const handleChooseFiles = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("http://localhost:9001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Images uploaded successfully");
      setSelectedFiles(null);
      setIsModalOpen(false);
      await fetchImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {isFetching ? (
        <div className="flex flex-wrap">
          {[...Array(5)].map((_, index) => (
            <SkeletonCard key={index} width="w-48" height="h-48" />
          ))}
        </div>
      ) : (
        <ImageGrid images={images} onAddImage={handleAddImage} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedFiles(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleUpload}
        title="Upload Images"
        onSubmitDisabled={!selectedFiles || selectedFiles.length === 0}
        isLoading={isUploading}
      >
        <div className="flex items-center justify-center w-full">
          <Button
            onClick={handleChooseFiles}
            variation="filled"
            color="primary"
            disabled={isUploading}
          >
            Choose files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
          <span className="ml-3 text-sm">
            {selectedFiles
              ? `${selectedFiles.length} file(s) selected`
              : "No file chosen"}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ImageContainer;
