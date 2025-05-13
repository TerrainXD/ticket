import { render, screen } from "@testing-library/react";
import TicketStats from "@/app/components/view/TicketStat";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div data-testid="mock-icon" />
}));

describe("TicketStats Component", () => {
  const mockTickets = [
    {
      _id: "1",
      title: "Hardware Issue",
      status: "pending",
      category: "Hardware Problem"
    },
    {
      _id: "2",
      title: "Software Bug",
      status: "accepted",
      category: "Software Problem"
    },
    {
      _id: "3",
      title: "Feature Request",
      status: "resolved",
      category: "Project"
    },
    {
      _id: "4",
      title: "Another Bug",
      status: "accepted",
      category: "Software Problem"
    },
    {
      _id: "5",
      title: "Rejected Feature",
      status: "rejected",
      category: "Project"
    },
  ];

  it("renders nothing when no tickets are provided", () => {
    const { container } = render(<TicketStats tickets={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when tickets prop is undefined", () => {
    const { container } = render(<TicketStats />);
    expect(container.firstChild).toBeNull();
  });

  it("displays the correct total ticket count", () => {
    render(<TicketStats tickets={mockTickets} />);
    expect(screen.getByText("Total Tickets")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays the correct status counts", () => {
    render(<TicketStats tickets={mockTickets} />);
    
    expect(screen.getByText("pending Tickets")).toBeInTheDocument();
    expect(screen.getByText("accepted Tickets")).toBeInTheDocument();
    expect(screen.getByText("resolved Tickets")).toBeInTheDocument();
    expect(screen.getByText("rejected Tickets")).toBeInTheDocument();
    
    const countElements = screen.getAllByText(/[0-9]/);
    expect(countElements).toHaveLength(5); // Total + 4 statuses
    
    const pendingElement = screen.getByText("pending Tickets").closest("div").parentElement;
    expect(pendingElement).toHaveTextContent("1");
    
    const acceptedElement = screen.getByText("accepted Tickets").closest("div").parentElement;
    expect(acceptedElement).toHaveTextContent("2");
  });

  it("renders the correct number of status cards", () => {
    render(<TicketStats tickets={mockTickets} />);
    const iconElements = screen.getAllByTestId("mock-icon");
    expect(iconElements).toHaveLength(5);
  });

  it("handles tickets with missing status gracefully", () => {
    const ticketsWithMissingStatus = [
      ...mockTickets,
      { _id: "6", title: "Missing Status" }
    ];
    
    render(<TicketStats tickets={ticketsWithMissingStatus} />);
    expect(screen.getByText("6")).toBeInTheDocument(); 
  });
});