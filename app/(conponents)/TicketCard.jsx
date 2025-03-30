import Link from "next/link";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faClock, faUser, faEnvelope, faPhone, faHistory } from "@fortawesome/free-solid-svg-icons";

const TicketCard = ({ ticket }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    
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

  // Determine if we have contact information
  const hasContactInfo = ticket.contactName || ticket.contactEmail || ticket.contactPhone;

  return (
    <div className="group transform transition-all duration-300 hover:-translate-y-2 perspective-1000">
      <Link 
        href={`/TicketPage/${ticket._id}`} 
        className="block"
      >
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden 
        shadow-xl hover:shadow-2xl transition-all duration-300 relative 
        transform hover:scale-[1.02] hover:rotate-1 origin-bottom">
          {/* Top section with status and priority */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <PriorityDisplay priority={ticket.priority} />
            <StatusDisplay status={ticket.status} />
          </div>

          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-900/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content section */}
          <div className="p-6 pt-16 relative z-20">
            <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 
            transition-colors group-hover:text-emerald-400">
              {ticket.title}
            </h4>
            
            <p className="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed 
            group-hover:text-slate-200">
              {ticket.description}
            </p>

          

            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-emerald-500" />
                  <span>Created: {formatTimestamp(ticket.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{ticket.category}</span>
                </div>
              </div>
              
              {ticket.latestUpdate && (
                <div className="flex items-center space-x-2 text-emerald-300 font-medium">
                  <FontAwesomeIcon icon={faHistory} className="w-4 h-4 text-emerald-500" />
                  <span>Last updated: {formatTimestamp(ticket.latestUpdate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;