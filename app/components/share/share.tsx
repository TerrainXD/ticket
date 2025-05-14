import {
  faHourglass,
  faCheckCircle,
  faCheck,
  faTimesCircle,
  faTicket,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class StatusCreator {
  createStatus(statusType: string) {
    const status = this._createStatus(statusType);
    return status;
  }

  _createStatus(statusType: string): Status {
    throw new Error("Method '_createStatus' must be implemented.");
  }
}

class TicketStatusCreator extends StatusCreator {
  _createStatus(statusType: string): Status {
    const normalizedStatus = statusType?.toLowerCase() || "unknown";
    switch (normalizedStatus) {
      case "resolved":
        return new ResolvedStatus();
      case "accepted":
        return new AcceptedStatus();
      case "pending":
        return new PendingStatus();
      case "rejected":
        return new RejectedStatus();
      default:
        return new UnknownStatus();
    }
  }
}

//Interface
class Status {
  constructor() {
    if (this.constructor === Status) {
      throw new Error("Can not be instantiated");
    }
  }
  getColor() {
    throw new Error("Method 'getColor' must be implemented.");
  }
  getIcon() {
    throw new Error("Method 'getInfo' must be implemented.");
  }
  getBackgroundGradient() {
    throw new Error("Method 'getBackgroundGradient' must be implemented.");
  }
}

class PendingStatus extends Status {
  getColor() {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }
  getIcon() {
    return faHourglass;
  }
  getBackgroundGradient() {
    return "from-red-500/20 to-red-600/30 text-red-400";
  }
}

class AcceptedStatus extends Status {
  getColor() {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
  getIcon() {
    return faCheckCircle;
  }
  getBackgroundGradient() {
    return "from-yellow-500/20 to-yellow-600/30 text-yellow-400";
  }
}

class ResolvedStatus extends Status {
  getColor() {
    return "bg-green-500/20 text-green-400 border-green-500/30";
  }
  getIcon() {
    return faCheck;
  }
  getBackgroundGradient() {
    return "from-green-500/20 to-green-600/30 text-green-400";
  }
}

class RejectedStatus extends Status {
  getColor() {
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
  getIcon() {
    return faTimesCircle;
  }
  getBackgroundGradient() {
    return "from-gray-500/20 to-gray-600/30 text-gray-400";
  }
}

class UnknownStatus extends Status {
  getColor() {
    return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
  }
  getIcon() {
    return faTicket;
  }
  getBackgroundGradient() {
    return "from-blue-500/20 to-blue-600/30 text-blue-400";
  }
}

export const StatusFactory = {
  creator: new TicketStatusCreator(),

  getStatusColor(status: string) {
    return this.creator.createStatus(status).getColor();
  },

  getStatusIcon(status: string) {
    return this.creator.createStatus(status).getIcon();
  },

  getStatusBackgroundGradient(status: string) {
    return this.creator.createStatus(status).getBackgroundGradient();
  },
};

export const StatusDisplay = ({ status }: { status: string }) => {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider border ${StatusFactory.getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export const PriorityDisplay = ({ priority }: { priority: number }) => {
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

export const formatTimestamp = (timestamp : number) => {
  if (!timestamp) return "Not available";

  const options: Intl.DateTimeFormatOptions = {
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