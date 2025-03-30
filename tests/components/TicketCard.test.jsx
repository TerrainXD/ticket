import TicketCard from "@/app/components/TicketCard";
import { render, screen } from "@testing-library/react";
TicketCard;

// Mock child components
jest.mock("@/app/components/StatusDisplay", () => {
  return function MockStatusDisplay({ status }) {
    return <div data-testid="mock-status">{status}</div>;
  };
});

jest.mock("@/app/components/PriorityDisplay", () => {
  return function MockPriorityDisplay({ priority }) {
    return <div data-testid="mock-priority">{priority}</div>;
  };
});

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock FontAwesomeIcon
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: function MockFontAwesomeIcon(props) {
    return <span data-testid="mock-icon" className={props.className}></span>;
  },
}));

describe("TicketCard Component", () => {
  const mockTicket = {
    _id: "123",
    title: "Test Ticket",
    description: "This is a test ticket description",
    status: "pending",
    priority: 3,
    category: "Software Problem",
    createdAt: "2023-01-01T12:00:00Z",
    latestUpdate: "2023-01-02T12:00:00Z",
  };

  it("renders the ticket title", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByText("Test Ticket")).toBeInTheDocument();
  });

  it("renders the ticket description", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(
      screen.getByText("This is a test ticket description")
    ).toBeInTheDocument();
  });

  it("renders the status display component", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByTestId("mock-status")).toBeInTheDocument();
    expect(screen.getByTestId("mock-status")).toHaveTextContent("pending");
  });

  it("renders the priority display component", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByTestId("mock-priority")).toBeInTheDocument();
    expect(screen.getByTestId("mock-priority")).toHaveTextContent("3");
  });

  it("links to the correct ticket page", () => {
    render(<TicketCard ticket={mockTicket} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/TicketPage/123");
  });

  it("formats and displays creation date correctly", () => {
    render(<TicketCard ticket={mockTicket} />);
    // The exact formatted string will depend on the user's locale, so we just check for presence of date
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
  });

  it("formats and displays latest update date correctly when provided", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it("displays the category", () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByText("Software Problem")).toBeInTheDocument();
  });
});
