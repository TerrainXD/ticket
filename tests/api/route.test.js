import { GET, POST } from '@/app/api/Tickets/route';
import Ticket from '@/app/models/Ticket';
import { NextResponse } from 'next/server';

// Mock dependencies
jest.mock('@/app/models/Ticket', () => ({
  find: jest.fn(),
  create: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      options,
    })),
  },
}));

describe('Tickets API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('should return all tickets with 200 status on success', async () => {
      // Arrange
      const mockTickets = [
        { _id: '1', title: 'Ticket 1' },
        { _id: '2', title: 'Ticket 2' },
      ];
      Ticket.find.mockResolvedValue(mockTickets);

      // Act
      const response = await GET();

      // Assert
      expect(Ticket.find).toHaveBeenCalledTimes(1);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { tickets: mockTickets },
        { status: 200 }
      );
    });

    it('should return error with 500 status when exception occurs', async () => {
      // Arrange
      const mockError = new Error('Database error');
      Ticket.find.mockRejectedValue(mockError);
      console.log = jest.fn(); // Mock console.log to prevent actual logging

      // Act
      const response = await GET();

      // Assert
      expect(Ticket.find).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(mockError);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Error', err: mockError },
        { status: 500 }
      );
    });
  });

  describe('POST handler', () => {
    it('should create a ticket and return 201 status on success', async () => {
      // Arrange
      const mockFormData = {
        title: 'New Ticket',
        description: 'Description',
        category: 'Bug',
        priority: 1,
      };
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ formData: mockFormData }),
      };
      Ticket.create.mockResolvedValue(mockFormData);

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(mockRequest.json).toHaveBeenCalledTimes(1);
      expect(Ticket.create).toHaveBeenCalledWith(mockFormData);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Ticket Created' },
        { status: 201 }
      );
    });

    it('should return error with 500 status when exception occurs', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const mockRequest = {
        json: jest.fn().mockRejectedValue(mockError),
      };
      console.log = jest.fn(); // Mock console.log to prevent actual logging

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(mockRequest.json).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(mockError);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Error', err: mockError },
        { status: 500 }
      );
    });
  });
});