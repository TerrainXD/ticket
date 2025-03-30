import { GET, PUT } from "@/app/api/Tickets/[id]/route";
import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

// Mock dependencies
jest.mock("@/app/models/Ticket", () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      options,
    })),
  },
}));

describe("Ticket [id] API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET handler", () => {
    it("should return a ticket by id with 200 status on success", async () => {
      // Arrange
      const mockTicket = { _id: "123", title: "Test Ticket" };
      const mockParams = { id: "123" };
      Ticket.findOne.mockResolvedValue(mockTicket);

      // Act
      const response = await GET({}, { params: Promise.resolve(mockParams) });

      // Assert
      expect(Ticket.findOne).toHaveBeenCalledWith({ _id: "123" });
      expect(NextResponse.json).toHaveBeenCalledWith(
        { foundTicket: mockTicket },
        { status: 200 }
      );
    });

    it("should return error with 500 status when exception occurs", async () => {
      // Arrange
      const mockError = new Error("Database error");
      const mockParams = { id: "123" };
      Ticket.findOne.mockRejectedValue(mockError);

      // Act
      const response = await GET({}, { params: Promise.resolve(mockParams) });

      // Assert
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Error", error: mockError },
        { status: 500 }
      );
    });
  });

  describe("PUT handler", () => {
    it("should update a ticket and return 200 status on success", async () => {
      // Arrange
      const mockId = "123";
      const mockFormData = {
        title: "Updated Ticket",
        description: "Updated Description",
      };
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ formData: mockFormData }),
      };
      const mockParams = { id: mockId };
      Ticket.findByIdAndUpdate.mockResolvedValue(mockFormData);
      console.log = jest.fn(); // Mock console.log to prevent actual logging

      // Act
      const response = await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockRequest.json).toHaveBeenCalledTimes(1);
      expect(Ticket.findByIdAndUpdate).toHaveBeenCalledWith(mockId, {
        ...mockFormData,
      });
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Ticket Updated" },
        { status: 200 }
      );
    });

    it("should return error with 500 status when exception occurs", async () => {
      // Arrange
      const mockError = new Error("Database error");
      const mockRequest = {
        json: jest.fn().mockRejectedValue(mockError),
      };
      const mockParams = { id: "123" };
      console.log = jest.fn(); // Mock console.log to prevent actual logging

      // Act
      const response = await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockRequest.json).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(mockError);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Error", error: mockError },
        { status: 500 }
      );
    });
  });
});
