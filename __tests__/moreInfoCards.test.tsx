import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like "toBeInTheDocument"
import MoreInfoCards from '../src/app/components/moreInfoCards'; // Adjust the import path
import { useRouter } from 'next/navigation';

// Mock the useRouter hook from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the useTranslations hook
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MoreInfoCards', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders correctly with provided data', () => {
    const mockData = { key1: 'value1', key2: 'value2' };
    render(<MoreInfoCards id="123" name="Test Item" data={mockData} />);

    // Check if the ID is displayed
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    // Check if the name is displayed
    expect(screen.getByText(/NAME/i)).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    // Check if the details are displayed
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

    // Find the back button
    const backButton = screen.getByRole('button', { name: /BACK_BUTTON/i });

    // Simulate click
    fireEvent.click(backButton);

    // Check if the router's push function was called
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});