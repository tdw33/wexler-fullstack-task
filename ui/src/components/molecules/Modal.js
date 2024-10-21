import React from "react";
import Button from "../atoms/Button";

const Modal = ({ isOpen, onClose, onSubmit, children, title = "" }) => {
  console.log("hello");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 mt-0 self-start">{title}</h2>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="mb-4 w-full">{children}</div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
