const StatusDisplay = ({ status }) => {
    const getColor = (status) => {
      const normalizedStatus = status.toLowerCase();
      switch (normalizedStatus) {
        case "resolved":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "accepted":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "pending":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        case "rejected":
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default:
          return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      }
    };
  
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider border ${getColor(
          status
        )}`}
      >
        {status}
      </span>
    );
  };
  
  export default StatusDisplay;