import { render, screen, fireEvent } from "@testing-library/react";
import ClientDashboard from "@/app/components/ClientDashboard";

jest.mock("@/app/components/TicketCard", () => {
  return function MockTicketCard({ ticket }) {
    return (
      <div data-testid="mock-ticket-card">
        {ticket.title} - {ticket.status} - {ticket.category}
      </div>
    );
  };
});

describe("ClientDashboard Component", () => {
  const mockTickets = [
    {
      _id: "1",
      title: "Hardware Issue",
      description: "My computer won't turn on",
      status: "pending",
      priority: 4,
      category: "Hardware Problem",
    },
    {
      _id: "2",
      title: "Software Bug",
      description: "Application crashes on startup",
      status: "accepted",
      priority: 3,
      category: "Software Problem",
    },
    {
      _id: "3",
      title: "Feature Request",
      description: "Would like to add a new feature",
      status: "resolved",
      priority: 2,
      category: "Project",
    },
  ];

  it("shows message when no tickets are available", () => {
    render(<ClientDashboard initialTickets={[]} />);
    expect(screen.getByText(/No tickets found/i)).toBeInTheDocument();
  });

  it("renders all tickets when no filter is applied", () => {
    render(<ClientDashboard initialTickets={mockTickets} />);
    const ticketCards = screen.getAllByTestId("mock-ticket-card");
    expect(ticketCards).toHaveLength(3);
  });

  it("displays status filter buttons for unique statuses", () => {
    render(<ClientDashboard initialTickets={mockTickets} />);
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText("accepted")).toBeInTheDocument();
    expect(screen.getByText("resolved")).toBeInTheDocument();
  });

  it("displays category headers for tickets", () => {
    render(<ClientDashboard initialTickets={mockTickets} />);
    expect(screen.getByText("Hardware Problem")).toBeInTheDocument();
    expect(screen.getByText("Software Problem")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
  });

  it("filters tickets by status when status button is clicked", () => {
    render(<ClientDashboard initialTickets={mockTickets} />);

    fireEvent.click(screen.getByText("pending"));

    const ticketCards = screen.getAllByTestId("mock-ticket-card");
    expect(ticketCards).toHaveLength(1);
    expect(ticketCards[0]).toHaveTextContent(
      "Hardware Issue - pending - Hardware Problem"
    );

    expect(screen.getByText("Hardware Problem")).toBeInTheDocument();
    expect(screen.queryByText("Software Problem")).not.toBeInTheDocument();
    expect(screen.queryByText("Project")).not.toBeInTheDocument();
  });

  it("clears filter when the same status button is clicked again", () => {
    render(<ClientDashboard initialTickets={mockTickets} />);

    fireEvent.click(screen.getByText("pending"));

    expect(screen.getAllByTestId("mock-ticket-card")).toHaveLength(1);

    fireEvent.click(screen.getByText("pending"));

    expect(screen.getAllByTestId("mock-ticket-card")).toHaveLength(3);
    expect(screen.getByText("Hardware Problem")).toBeInTheDocument();
    expect(screen.getByText("Software Problem")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
  });

  it("calls console.log with initial tickets on mount", () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();

    render(<ClientDashboard initialTickets={mockTickets} />);

    expect(console.log).toHaveBeenCalledWith(
      "Initial tickets received:",
      mockTickets
    );

    console.log = originalConsoleLog;
  });
});
