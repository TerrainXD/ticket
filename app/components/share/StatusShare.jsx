import { 
    faHourglass, faCheckCircle, faCheck, faTimesCircle, faTicket, faFire
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  export const StatusFactory = {
    getStatusColor(status) {
      const normalizedStatus = status?.toLowerCase() || "unknown";
      switch (normalizedStatus) {
        case "resolved": return "bg-green-500/20 text-green-400 border-green-500/30";
        case "accepted": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "pending": return "bg-red-500/20 text-red-400 border-red-500/30";
        case "rejected": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default: return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      }
    },
    
    getStatusIcon(status) {
      const normalizedStatus = status?.toLowerCase() || "unknown";
      switch (normalizedStatus) {
        case "pending": return faHourglass;
        case "accepted": return faCheckCircle;
        case "resolved": return faCheck;
        case "rejected": return faTimesCircle;
        default: return faTicket;
      }
    },
    
    getStatusBackgroundGradient(status) {
      const normalizedStatus = status?.toLowerCase() || "unknown";
      switch (normalizedStatus) {
        case "pending": return "from-red-500/20 to-red-600/30 text-red-400";
        case "accepted": return "from-yellow-500/20 to-yellow-600/30 text-yellow-400";
        case "resolved": return "from-green-500/20 to-green-600/30 text-green-400";
        case "rejected": return "from-gray-500/20 to-gray-600/30 text-gray-400";
        default: return "from-blue-500/20 to-blue-600/30 text-blue-400";
      }
    }
  };

  export const StatusDisplay = ({status}) => {
    return(
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider border ${StatusFactory.getStatusColor(status)}`}>
        {status}
      </span>
    )
  };


  export const PriorityDisplay = ({ priority }) => {
    return (
      <div className="flex justify-start align-baseline">
        <FontAwesomeIcon
          icon={faFire}
          className={`pr-1 ${priority > 0 ? "text-red-400" : "text-slate-400"}`}
        />
        <FontAwesomeIcon
          icon={faFire}
          className={`pr-1 ${priority > 1 ? "text-red-400" : "text-slate-400"}`}
        />
        <FontAwesomeIcon
          icon={faFire}
          className={`pr-1 ${priority > 2 ? "text-red-400" : "text-slate-400"}`}
        />
        <FontAwesomeIcon
          icon={faFire}
          className={`pr-1 ${priority > 3 ? "text-red-400" : "text-slate-400"}`}
        />
        <FontAwesomeIcon
          icon={faFire}
          className={`pr-1 ${priority > 4 ? "text-red-400" : "text-slate-400"}`}
        />
      </div>
    );
  };

  export const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Not available";

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

  export default{
    StatusDisplay,
    StatusFactory,
    PriorityDisplay,
    formatTimestamp
  }