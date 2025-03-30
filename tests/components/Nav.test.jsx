import Nav from '@/app/components/Nav';
import { render, screen } from '@testing-library/react';
Nav

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: function MockFontAwesomeIcon(props) {
    return <span data-testid="mock-icon" className={props.className}></span>;
  }
}));

describe('Nav Component', () => {
  it('renders the site title', () => {
    render(<Nav />);
    expect(screen.getByText('Helpdesk-Ticket')).toBeInTheDocument();
  });

  it('contains link to home page', () => {
    render(<Nav />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('contains link to create new ticket', () => {
    render(<Nav />);
    const newTicketLink = screen.getByText('New Ticket');
    expect(newTicketLink).toBeInTheDocument();
    expect(newTicketLink.closest('a')).toHaveAttribute('href', '/TicketPage/new');
  });

  it('renders two FontAwesome icons', () => {
    const { getAllByTestId } = render(<Nav />);
    const icons = getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2); // One for home, one for ticket
  });
});