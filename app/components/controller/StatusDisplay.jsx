import { StatusFactory } from "../view/StatusShare";

  const StatusDisplay = ({status}) => {
    return(
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider border ${StatusFactory.getStatusColor(status)}`}>
        {status}
      </span>
    )
  }
  
  export default StatusDisplay;