import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,

} from "@fortawesome/free-solid-svg-icons";
import { StatusFactory } from "../share/share";

const TicketStats = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return null;
  }

  const totalTickets = tickets.length;

  const statusCounts = tickets.reduce((counts, ticket) => {
    const status = ticket.status || "unknown";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  const statusOrder = ["pending", "accepted", "resolved", "rejected"];

  const orderedStatuses = statusOrder.map((status) => ({
    status,
    count: statusCounts[status] || 0,
  }));

  return (
    <div className="mb-10 p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
      <h2 className="text-2xl text-emerald-400 mb-6 pb-2 border-b border-slate-800">
        Ticket Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total tickets card */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-sm text-emerald-300">Total Tickets</div>
            <div className="text-3xl font-bold text-white">{totalTickets}</div>
          </div>
          <div className="bg-emerald-500/30 p-3 rounded-xl">
            <FontAwesomeIcon
              icon={faTicket}
              className="text-2xl text-emerald-400"
            />
          </div>
        </div>

        {/* Status cards in specific order */}
        {orderedStatuses.map(({ status, count }) => (
        <div
          key={status}
          className={`bg-gradient-to-br ${StatusFactory.getStatusBackgroundGradient(status)} p-4 rounded-2xl border border-${status.toLowerCase()}-500/30 flex items-center justify-between`}
        >
          <div>
            <div className="text-sm capitalize">{status} Tickets</div>
            <div className="text-3xl font-bold text-white">{count}</div>
          </div>
          <div className={`bg-${status.toLowerCase()}-500/30 p-3 rounded-xl`}>
            <FontAwesomeIcon
              icon={StatusFactory.getStatusIcon(status)}
              className="text-2xl"
            />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TicketStats;
