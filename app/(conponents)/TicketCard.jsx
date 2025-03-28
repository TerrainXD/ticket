import Link from "next/link";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";

const TicketCard = ({ ticket }) => {
  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="group">
      <Link 
        href={`/TicketPage/${ticket._id}`} 
        className="block"
      >
        <div className="bg-gray-800 hover:bg-gray-700 rounded-2xl shadow-lg p-5 m-3 border border-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center mb-4">
            <PriorityDisplay priority={ticket.priority} />
            <StatusDisplay status={ticket.status} className="ml-auto" />
          </div>
          
          <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {ticket.title}
          </h4>
          
          <hr className="border-gray-700 mb-3" />
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {ticket.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{formatTimestamp(ticket.createdAt)}</span>
            <span className="font-medium text-gray-500">{ticket.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;