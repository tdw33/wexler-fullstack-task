import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText("Test Button")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct classes based on props", () => {
    const { getByRole, rerender } = render(
      <Button color="primary" variation="outlined">
        Test
      </Button>
    );
    expect(getByRole("button")).toHaveClass("btn-primary");
    expect(getByRole("button")).toHaveClass("btn-outline");

    rerender(
      <Button color="error" disabled>
        Test
      </Button>
    );
    expect(getByRole("button")).toHaveClass("btn-error");
    expect(getByRole("button")).toHaveClass("btn-disabled");
  });

  it("shows loading spinner when isLoading is true", () => {
    const { getByRole } = render(<Button isLoading>Loading</Button>);
    const button = getByRole("button");
    expect(button.querySelector(".loading-spinner")).toBeInTheDocument();
  });
});
