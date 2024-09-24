import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import DefaultButton from '../src/app/components/defaultButton'; 

describe('DefaultButton', () => {
  it('renders with the correct translation', () => {
    render(<DefaultButton click={jest.fn()} translation="Click" />);
    
    // Check if the button displays the correct translation
    const buttonElement = screen.getByRole('button', { name: /Click/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click');
  });

  it('triggers onClick when clicked', () => {
    // Arrange
    const handleClick = jest.fn(); //
    render(<DefaultButton click={handleClick} translation="Click" />);

    const buttonElement = screen.getByRole('button', { name: /Click/i });

    //  Act
    fireEvent.click(buttonElement);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});