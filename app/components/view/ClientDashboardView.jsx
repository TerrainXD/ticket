"use client";

import ClientDashboardController from "../controller/ClientDashboardController";
import TicketCard from "./TicketCard";
import TicketStat from "./TicketStat";

const ClientDashboardView = ({ initialTickets }) => {
  const {
    tickets,
    selectedStatus,
    uniqueStatuses,
    uniqueCategories,
    getFilteredTickets,
    getStatusColor,
    handleStatusSelect,
  } = ClientDashboardController(initialTickets);

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10">
        No tickets found. Create a new ticket to get started.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Add the TicketStats component at the top */}
      <TicketStat tickets={tickets} />

      {/*Select Status */}
      <div className="flex justify-center mb-8 space-x-4">
        {uniqueStatuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusSelect(status)}
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

export default ClientDashboardView;