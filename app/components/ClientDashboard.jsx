"use client";

import { useState, useEffect } from "react";
import TicketCard from "./TicketCard";

const ClientDashboard = ({ initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets || []);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Log tickets on component mount
  useEffect(() => {
    console.log("Initial tickets received:", initialTickets);
  }, [initialTickets]);

  // Determine unique statuses and categories
  const uniqueStatuses = [
    ...new Set(tickets?.map(({ status }) => status).filter(Boolean)),
  ];
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category).filter(Boolean)),
  ];

  // Filter tickets based on category and status
  const getFilteredTickets = (category) => {
    return tickets
      .filter((ticket) => ticket.category === category)
      .filter((ticket) => !selectedStatus || ticket.status === selectedStatus);
  };

  // Render nothing if no tickets
  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10">
        No tickets found. Create a new ticket to get started.
      </div>
    );
  }

  // Status color mapping with dark blue theme
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

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Status Filter Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        {uniqueStatuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setSelectedStatus(selectedStatus === status ? null : status)
            }
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${getStatusColor(
              status,
              selectedStatus === status
            )}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => {
            const filteredTickets = getFilteredTickets(uniqueCategory);

            // Only render category if it has tickets after filtering
            if (filteredTickets.length === 0) return null;

            return (
              <div key={categoryIndex} className="mb-10">
                <h2 className="text-2xl text-blue-200 mb-6 pb-2 border-b border-blue-900">
                  {uniqueCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredTickets.map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={filteredTicket._id || _index}
                      ticket={filteredTicket}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientDashboard;