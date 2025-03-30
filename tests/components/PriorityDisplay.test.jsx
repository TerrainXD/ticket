import PriorityDisplay from '@/app/components/PriorityDisplay';
import { render } from '@testing-library/react';
PriorityDisplay

// Need to mock FontAwesomeIcon for these tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: function MockFontAwesomeIcon(props) {
    return <div data-testid="mock-icon" className={props.className}></div>;
  }
}));

describe('PriorityDisplay Component', () => {
  it('renders 5 fire icons', () => {
    const { getAllByTestId } = render(<PriorityDisplay priority={3} />);
    const icons = getAllByTestId('mock-icon');
    expect(icons).toHaveLength(5);
  });

  it('renders correct number of active icons based on priority 0', () => {
    const { getAllByTestId } = render(<PriorityDisplay priority={0} />);
    const icons = getAllByTestId('mock-icon');
    
    // All icons should be inactive (gray) for priority 0
    icons.forEach(icon => {
      expect(icon).toHaveClass('text-slate-400');
      expect(icon).not.toHaveClass('text-red-400');
    });
  });

  it('renders correct number of active icons based on priority 3', () => {
    const { getAllByTestId } = render(<PriorityDisplay priority={3} />);
    const icons = getAllByTestId('mock-icon');
    
    // First 3 icons should be active (red)
    for (let i = 0; i < 3; i++) {
      expect(icons[i]).toHaveClass('text-red-400');
    }
    
    // Last 2 icons should be inactive (gray)
    for (let i = 3; i < 5; i++) {
      expect(icons[i]).toHaveClass('text-slate-400');
    }
  });

  it('renders all active icons for priority 5', () => {
    const { getAllByTestId } = render(<PriorityDisplay priority={5} />);
    const icons = getAllByTestId('mock-icon');
    
    // All icons should be active (red) for priority 5
    icons.forEach(icon => {
      expect(icon).toHaveClass('text-red-400');
      expect(icon).not.toHaveClass('text-slate-400');
    });
  });
});