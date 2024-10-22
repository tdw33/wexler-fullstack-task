import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal Component", () => {
  it("renders when isOpen is true", () => {
    const { getByText } = render(
      <Modal isOpen={true} title="Test Modal">
        Modal Content
      </Modal>
    );
    expect(getByText("Test Modal")).toBeInTheDocument();
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} title="Test Modal">
        Modal Content
      </Modal>
    );
    expect(queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Modal Content
      </Modal>
    );
    fireEvent.click(getByText("✕"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when onSubmitDisabled is true", () => {
    const { getByText } = render(
      <Modal isOpen={true} onSubmitDisabled={true} title="Test Modal">
        Modal Content
      </Modal>
    );
    expect(getByText("Submit")).toBeDisabled();
  });
});
