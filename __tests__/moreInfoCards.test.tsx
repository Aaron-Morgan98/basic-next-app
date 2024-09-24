import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like "toBeInTheDocument"
import MoreInfoCards from '../src/app/components/moreInfoCards'; // Adjust the import path
import { useRouter } from 'next/navigation';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MoreInfoCards', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders correctly with provided data', () => {
    //Arrange
    const mockData = { key1: 'value1', key2: 'value2' };

    //Act
    render(<MoreInfoCards id="123" name="Test Item" data={mockData} />);

    //Assert
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    expect(screen.getByText(/NAME/i)).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    expect(screen.getByText(/DETAILS/i)).toBeInTheDocument();
    expect(screen.getByText('key1: value1')).toBeInTheDocument();
    expect(screen.getByText('key2: value2')).toBeInTheDocument();
  });

  it('renders "No ID available" if id is null', () => {
    render(<MoreInfoCards id={null} name="Test Item" data={{}} />);
    
    expect(screen.getByText('No ID available')).toBeInTheDocument();
  });

  it('renders "No name available" if name is empty', () => {
    render(<MoreInfoCards id="123" name="" data={{}} />);
    
    expect(screen.getByText('No name available')).toBeInTheDocument();
  });

  it('navigates back when the button is clicked', () => {
    const mockData = { key1: 'value1' };
    render(<MoreInfoCards id="123" name="Test Item" data={mockData} />);

    const backButton = screen.getByRole('button', { name: /BACK_BUTTON/i });

    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});