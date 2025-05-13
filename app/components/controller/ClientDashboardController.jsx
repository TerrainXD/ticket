"use client";

import { useState, useEffect } from "react";

const ClientDashboardController = (initialTickets) => {
  const [tickets, setTickets] = useState(initialTickets || []);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    console.log("Initial tickets received:", initialTickets);
  }, [initialTickets]);

  // Filter statuses and categories
  const uniqueStatuses = [
    ...new Set(tickets?.map(({ status }) => status).filter(Boolean)),
  ];
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category).filter(Boolean)),
  ];

  const getFilteredTickets = (category) => {
    return tickets
      .filter((ticket) => ticket.category === category)
      .filter((ticket) => !selectedStatus || ticket.status === selectedStatus);
  };

  const getStatusColor = (status, isSelected) => {
    const baseColors = {
      pending: "bg-red-800 text-white",
      accepted: "bg-yellow-800 text-white",
      resolved: "bg-green-800 text-white",
      rejected: "bg-gray-800 text-white",
    };

    return isSelected
      ? baseColors[status]
      : "bg-blue-950 text-blue-300 hover:bg-blue-900";
  };

  const handleStatusSelect = (status) => {
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