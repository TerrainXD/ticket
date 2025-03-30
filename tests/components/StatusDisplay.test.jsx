import StatusDisplay from "@/app/components/StatusDisplay";
import { render, screen } from "@testing-library/react";
StatusDisplay

describe("StatusDisplay Component", () => {
  it("renders with the correct text", () => {
    render(<StatusDisplay status="pending" />);
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("applies the correct color class for pending status", () => {
    const { container } = render(<StatusDisplay status="pending" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-red-500/20");
    expect(statusElement).toHaveClass("text-red-400");
    expect(statusElement).toHaveClass("border-red-500/30");
  });

  it("applies the correct color class for resolved status", () => {
    const { container } = render(<StatusDisplay status="resolved" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-green-500/20");
    expect(statusElement).toHaveClass("text-green-400");
    expect(statusElement).toHaveClass("border-green-500/30");
  });

  it("applies the correct color class for accepted status", () => {
    const { container } = render(<StatusDisplay status="accepted" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-yellow-500/20");
    expect(statusElement).toHaveClass("text-yellow-400");
    expect(statusElement).toHaveClass("border-yellow-500/30");
  });

  it("applies the correct color class for rejected status", () => {
    const { container } = render(<StatusDisplay status="rejected" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-gray-500/20");
    expect(statusElement).toHaveClass("text-gray-400");
    expect(statusElement).toHaveClass("border-gray-500/30");
  });

  it("applies default color class for unknown status", () => {
    const { container } = render(<StatusDisplay status="unknown" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-indigo-500/20");
    expect(statusElement).toHaveClass("text-indigo-400");
    expect(statusElement).toHaveClass("border-indigo-500/30");
  });

  it("is case-insensitive for status values", () => {
    const { container } = render(<StatusDisplay status="RESOLVED" />);
    const statusElement = container.firstChild;
    expect(statusElement).toHaveClass("bg-green-500/20");
    expect(statusElement).toHaveClass("text-green-400");
    expect(statusElement).toHaveClass("border-green-500/30");
  });
});
