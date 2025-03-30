import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
import Nav from "@/app/components/Nav";

// Mock dependencies
jest.mock("next/font/google", () => ({
  Geist: jest.fn().mockReturnValue({
    variable: "mock-geist-sans",
  }),
  Geist_Mono: jest.fn().mockReturnValue({
    variable: "mock-geist-mono",
  }),
}));

jest.mock("@/app/components/Nav", () =>
  jest
    .fn()
    .mockImplementation(() => <div data-testid="mock-nav">Mock Navigation</div>)
);

jest.mock("@fortawesome/fontawesome-svg-core", () => ({
  config: {
    autoAddCss: true,
  },
}));

describe("RootLayout", () => {
  it("should render layout with children", () => {
    // Arrange
    const mockChildren = <div data-testid="mock-children">Test Children</div>;

    // Act
    render(<RootLayout>{mockChildren}</RootLayout>);

    // Assert
    expect(screen.getByTestId("mock-nav")).toBeInTheDocument();
    expect(screen.getByTestId("mock-children")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.className).toBe("dark");
  });

  it("should include appropriate class names and styles", () => {
    // Arrange
    const mockChildren = <div>Test Children</div>;

    // Act
    render(<RootLayout>{mockChildren}</RootLayout>);
    const bodyElement = screen.getByText("Test Children").closest("body");

    // Assert
    expect(bodyElement).toHaveClass("mock-geist-sans");
    expect(bodyElement).toHaveClass("mock-geist-mono");
    expect(bodyElement).toHaveClass("antialiased");
  });
});
