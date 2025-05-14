"use client";

import { useState, useEffect } from "react";

interface Ticket {
  _id: number;
  status: string;
  category: string;
}

interface ClientDashboardControllerReturn {
  tickets: Ticket[];
  selectedStatus: string | null;
  uniqueStatuses: string[];
  uniqueCategories: string[];
  getFilteredTickets: (category: string) => Ticket[];
  getStatusColor: (status: string, isSelected: boolean) => string;
  handleStatusSelect: (status: string) => void;
}

const ClientDashboardController = (
  initialTickets: Ticket[] = []
): ClientDashboardControllerReturn => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets || []);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    console.log("Initial tickets received:", initialTickets);
  }, [initialTickets]);

  // Filter statuses and categories
  const uniqueStatuses: string[] = [
    ...new Set(tickets?.map(({ status }) => status).filter(Boolean)),
  ];
  const uniqueCategories: string[] = [
    ...new Set(tickets?.map(({ category }) => category).filter(Boolean)),
  ];

  const getFilteredTickets = (category: string): Ticket[] => {
    return tickets
      .filter((ticket) => ticket.category === category)
      .filter((ticket) => !selectedStatus || ticket.status === selectedStatus);
  };

  const getStatusColor = (status: string, isSelected: boolean): string => {
    const baseColors: Record<string, string> = {
      pending: "bg-red-800 text-white",
      accepted: "bg-yellow-800 text-white",
      resolved: "bg-green-800 text-white",
      rejected: "bg-gray-800 text-white",
    };

    return isSelected
      ? baseColors[status]
      : "bg-blue-950 text-blue-300 hover:bg-blue-900";
  };

  const handleStatusSelect = (status: string): void => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  return {
    tickets,
    selectedStatus,
    uniqueStatuses,
    uniqueCategories,
    getFilteredTickets,
    getStatusColor,
    handleStatusSelect,
  };
};

export default ClientDashboardController;