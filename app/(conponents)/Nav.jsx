import { faHome, faTicket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <FontAwesomeIcon 
              icon={faHome} 
              className="text-2xl group-hover:text-blue-400 transition-colors" 
            />
            <span className="hidden md:block text-sm font-medium">Home</span>
          </Link>
          
          <Link 
            href="/TicketPage/new" 
            className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <FontAwesomeIcon 
              icon={faTicket} 
              className="text-2xl group-hover:text-green-400 transition-colors" 
            />
            <span className="hidden md:block text-sm font-medium">New Ticket</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon 
              icon={faUser} 
              className="text-gray-400 text-xl" 
            />
            <p className="text-sm text-gray-300">terrain@gmail.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;