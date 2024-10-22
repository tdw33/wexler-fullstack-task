import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImageGrid from "../ImageGrid";

describe("ImageGrid Component", () => {
  const mockImages = [
    { id: "1", url: "test1.jpg", name: "Test Image 1" },
    { id: "2", url: "test2.jpg", name: "Test Image 2" },
  ];

  it("renders images correctly", () => {
    const { getAllByRole } = render(
      <ImageGrid images={mockImages} onAddImage={() => {}} />
    );
    const images = getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "test1.jpg");
    expect(images[1]).toHaveAttribute("src", "test2.jpg");
  });

  it("calls onAddImage when Add Image button is clicked", () => {
    const handleAddImage = jest.fn();
    const { getByText } = render(
      <ImageGrid images={mockImages} onAddImage={handleAddImage} />
    );
    fireEvent.click(getByText("Add Image"));
    expect(handleAddImage).toHaveBeenCalledTimes(1);
  });
});
