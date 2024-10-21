import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageGrid from "../organisms/ImageGrid";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";

const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:9001/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleAddImage = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleChooseFiles = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file");
      return;
    }

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
      fetchImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images");
    }
  };

  return (
    <div>
      <ImageGrid images={images} onAddImage={handleAddImage} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpload}
        title="Upload Images"
      >
        <div className="flex items-center justify-center w-full">
          <Button
            onClick={handleChooseFiles}
            className="bg-gray-500 hover:bg-gray-600 text-white"
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
