import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkeletonCard from "../SkeletonCard";

describe("SkeletonCard Component", () => {
  it("renders correctly with the expected classes", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toHaveClass(
      "w-48 h-48 m-2 bg-gray-200 rounded-lg overflow-hidden relative"
    );
  });

  it("renders child elements", () => {
    const { container } = render(<SkeletonCard />);
    const childElements = container.firstChild.children;
    expect(childElements.length).toBeGreaterThan(0);
  });

  it("applies animation classes to child elements", () => {
    const { container } = render(<SkeletonCard />);
    const childElements = container.firstChild.children;
    Array.from(childElements).forEach((element) => {
      expect(element).toHaveClass(
        "inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse-gradient"
      );
    });
  });
});
