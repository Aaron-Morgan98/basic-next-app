import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import DefaultButton from '../src/app/components/defaultButton'; 
describe('DefaultButton', () => {
  it('renders with the correct translation', () => {
    render(<DefaultButton click={jest.fn()} translation="Click Me" />);
    
    // Check if the button displays the correct translation
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('triggers the click handler when clicked', () => {
    const handleClick = jest.fn(); // Mock click handler
    render(<DefaultButton click={handleClick} translation="Click Me" />);

    const buttonElement = screen.getByRole('button', { name: /Click Me/i });

    // Simulate button click
    fireEvent.click(buttonElement);

    // Check if the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});