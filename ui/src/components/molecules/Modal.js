import React from "react";
import Button from "../atoms/Button";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  title = "",
  onSubmitDisabled,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div className="mb-4">{children}</div>
        <div className="modal-action flex justify-center">
          <Button
            onClick={onSubmit}
            variation="filled"
            disabled={onSubmitDisabled || isLoading}
            color="primary"
            className={`mr-2`}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button
            disabled={isLoading}
            onClick={onClose}
            color="error"
            variation="outlined"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
