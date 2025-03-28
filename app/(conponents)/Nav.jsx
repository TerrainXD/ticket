import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800/80 shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold text-emerald-400 tracking-tight transition-colors hover:text-emerald-300"
          >
            Helpdesk-Ticket
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="group flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-all"
            >
              <FontAwesomeIcon
                icon={faHome}
                className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:text-emerald-400"
              />
              <span className="text-sm font-medium hidden md:block">Home</span>
            </Link>

            <Link
              href="/TicketPage/new"
              className="group flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-all"
            >
              <FontAwesomeIcon
                icon={faTicket}
                className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:text-emerald-400"
              />
              <span className="text-sm font-medium hidden md:block">
                New Ticket
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;