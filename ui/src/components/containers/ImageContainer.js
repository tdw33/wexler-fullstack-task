import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import ImageGrid from "../organisms/ImageGrid";
import Modal from "../molecules/Modal";
import SkeletonCard from "../molecules/SkeletonCard";

const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

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

  const handleFileChange = (files) => {
    setSelectedFiles(files);
    setUploadedFileNames(Array.from(files).map((file) => file.name));
  };

  const handleRemoveFile = (fileName) => {
    const updatedFiles = Array.from(selectedFiles).filter(
      (file) => file.name !== fileName
    );
    setSelectedFiles(updatedFiles);
    setUploadedFileNames(updatedFiles.map((file) => file.name));
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
      setSelectedFiles(null);
      setUploadedFileNames([]);
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
          setUploadedFileNames([]);
          setIsModalOpen(false);
        }}
        onSubmit={handleUpload}
        title="Upload Images"
        onSubmitDisabled={!selectedFiles || selectedFiles.length === 0}
        isLoading={isUploading}
      >
        <div className="w-full">
          <FileUploader
            multiple={true}
            handleChange={handleFileChange}
            name="file"
            types={["JPG", "PNG", "JPEG"]}
            disabled={isUploading}
          >
            <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-500">
                  Drag & Drop files here
                </p>
                <p className="text-sm text-gray-400">
                  or click to select files
                </p>
              </div>
            </div>
          </FileUploader>
          <span className="mt-3 text-sm block text-center">
            {selectedFiles
              ? `${selectedFiles.length} file(s) selected`
              : "No file chosen"}
          </span>
          {uploadedFileNames.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Selected Files:</h4>
              <div className="flex flex-wrap gap-2">
                {uploadedFileNames.map((fileName, index) => (
                  <div
                    key={`${fileName}-${index}`}
                    className="flex items-center bg-gray-100 rounded-md p-2"
                  >
                    <span className="text-sm text-gray-600 mr-2">
                      {fileName}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(fileName)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ImageContainer;
