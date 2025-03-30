import TicketForm from "@/app/components/TicketForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

TicketForm;

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock FontAwesomeIcon
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: function MockFontAwesomeIcon(props) {
    return <i data-testid="mock-icon" className={props.className}></i>;
  },
}));

describe("TicketForm Component", () => {
  const mockRouter = {
    refresh: jest.fn(),
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("New Ticket Form", () => {
    beforeEach(() => {
      render(<TicketForm ticket={{ _id: "new" }} />);
    });
    // it("renders the create form with empty fields", async () => {
    //     render(<TicketForm ticket={{ _id: "new" }} />);  // For create mode

    //     // Wait for the "Create Your Ticket" text to appear
    //     expect(await screen.findByText("Create Your Ticket")).toBeInTheDocument();

    //     // Wait for the Title and Description fields to be rendered
    //     const titleInput = await screen.findByLabelText("Title");
    //     const descriptionInput = await screen.findByLabelText("Description");

    //     // Check that Title and Description are empty
    //     expect(titleInput).toHaveValue("");
    //     expect(descriptionInput).toHaveValue("");
    //   });

    it("updates form values when user types", () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Test Ticket" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Test description" },
      });

      expect(screen.getByLabelText("Title")).toHaveValue("New Test Ticket");
      expect(screen.getByLabelText("Description")).toHaveValue(
        "Test description"
      );
    });

    it("handles form submission correctly", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Ticket Created" }),
      });

      // Fill form
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Test Ticket" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Test description" },
      });

      // Use getByRole to select the button more reliably
      fireEvent.click(
        await screen.findByRole("button", { name: /create your ticket/i })
      );

      // Wait for fetch to be called
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/Tickets", {
          method: "POST",
          body: expect.stringContaining('"title":"New Test Ticket"'),
          headers: {
            "content-type": "application/json",
          },
        });
      });

      // Verify router was called to redirect
      expect(mockRouter.refresh).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });

    it("shows error on failed submission", async () => {
      // Mock failed fetch response
      global.fetch.mockResolvedValueOnce({
        ok: false, // Simulate failure
      });

      // Fill and submit form
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Test Ticket" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Test description" },
      });
      fireEvent.click(
        await screen.findByRole("button", { name: /create your ticket/i })
      );

      // Wait for alert to be called
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("Failed to create ticket.");
      });
    });
  });

  describe("View/Edit Ticket Details", () => {
    const mockExistingTicket = {
      _id: "123",
      title: "Existing Ticket",
      description: "This is an existing ticket",
      category: "Software Problem",
      priority: 3,
      status: "pending",
      createdAt: "2023-01-01T12:00:00Z",
      contactName: "John Doe",
      contactEmail: "john@example.com",
      contactPhone: "123-456-7890",
    };

    it("renders ticket details in read-only mode", () => {
      render(<TicketForm ticket={mockExistingTicket} />);

      // Check that we're in read-only mode
      expect(screen.getByText("Ticket Details")).toBeInTheDocument();

      // Check ticket info is displayed
      expect(screen.getByText("Existing Ticket")).toBeInTheDocument();
      expect(
        screen.getByText("This is an existing ticket")
      ).toBeInTheDocument();
      expect(screen.getByText("Software Problem")).toBeInTheDocument();
      expect(screen.getByText("pending")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    });

    it("shows the correct action buttons for pending status", () => {
      render(<TicketForm ticket={mockExistingTicket} />);

      // For pending status, should have Accept and Reject buttons
      expect(screen.getByText("Accept")).toBeInTheDocument();
      expect(screen.getByText("Reject")).toBeInTheDocument();
    });

    it("updates status when Accept button is clicked", async () => {
      // Mock successful fetch response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Ticket Updated" }),
      });

      render(<TicketForm ticket={mockExistingTicket} />);

      // Click Accept button
      fireEvent.click(screen.getByText("Accept"));

      // Wait for fetch to be called with correct data
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(`/api/Tickets/123`, {
          method: "PUT",
          body: expect.stringContaining('"status":"accepted"'),
          headers: {
            "content-type": "application/json",
          },
        });
      });

      // Verify router was called
      expect(mockRouter.refresh).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });

    it("shows different action buttons for accepted status", () => {
      const acceptedTicket = { ...mockExistingTicket, status: "accepted" };
      render(<TicketForm ticket={acceptedTicket} />);

      // For accepted status, should only have Resolve button
      expect(screen.getByText("Resolve")).toBeInTheDocument();
      expect(screen.queryByText("Accept")).not.toBeInTheDocument();
      expect(screen.queryByText("Reject")).not.toBeInTheDocument();
    });

    it("does not show action buttons for resolved status", () => {
      const resolvedTicket = { ...mockExistingTicket, status: "resolved" };
      render(<TicketForm ticket={resolvedTicket} />);

      // For resolved status, should have no action buttons
      expect(screen.queryByText("Resolve")).not.toBeInTheDocument();
      expect(screen.queryByText("Accept")).not.toBeInTheDocument();
      expect(screen.queryByText("Reject")).not.toBeInTheDocument();
    });

    it("shows error when status update fails", async () => {
      // Mock failed fetch response
      global.fetch.mockResolvedValueOnce({
        ok: false,
      });

      render(<TicketForm ticket={mockExistingTicket} />);

      // Click Accept button
      fireEvent.click(screen.getByText("Accept"));

      // Wait for alert to be called
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith(
          "Failed to update ticket status."
        );
      });
    });
  });
});
