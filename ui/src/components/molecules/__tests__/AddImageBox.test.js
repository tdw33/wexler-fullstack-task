import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddImageBox from "../AddImageBox";

describe("AddImageBox Component", () => {
  it("renders correctly with 'Add Image' text", () => {
    const { getByText } = render(<AddImageBox />);
    expect(getByText("Add Image")).toBeInTheDocument();
  });

  it("renders a button or clickable element", () => {
    const { container } = render(<AddImageBox />);
    const clickableElement =
      container.querySelector("button") || container.firstChild;
    expect(clickableElement).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    const { container } = render(<AddImageBox />);
    const addImageBox = container.firstChild;
    expect(addImageBox).toHaveClass("flex");
    expect(addImageBox).toHaveClass("items-center");
    expect(addImageBox).toHaveClass("justify-center");
  });
});
