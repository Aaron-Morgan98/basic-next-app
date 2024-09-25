import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import MoreInfoCards from '../src/app/components/moreInfoCards'; 
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
    const mockData = { id: 123, title: 'Test Item', body: 'Some details about the item' };

    //Act
    render(<MoreInfoCards id={mockData.id} title={mockData.title} body={mockData.body} />);

    //Assert
    expect(screen.getByText(/MORE_INFORMATION/i)).toBeInTheDocument();

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(123)).toBeInTheDocument();

    expect(screen.getByText(/NAME/i)).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();


    expect(screen.getByText('Some details about the item')).toBeInTheDocument();
  });

  it('renders "No ID available" if id is null', () => {
    render(<MoreInfoCards id={null} title="Test Item" body="Some details" />);
    
    expect(screen.getByText('No ID available')).toBeInTheDocument();
  });

  it('renders "No name available" if title is empty', () => {
    const mockData = { id: 123, title: '', body: 'Some details' };
    render(<MoreInfoCards id={mockData.id} title={mockData.title} body={mockData.body} />);
    
    expect(screen.getByText('No name available')).toBeInTheDocument();
  });

  it('navigates back when the button is clicked', () => {
    const mockData = { id: 123, title: 'Test Item', body: 'Some details' };
    render(<MoreInfoCards id={mockData.id} title={mockData.title} body={mockData.body} />);

    const backButton = screen.getByRole('button', { name: /BACK_BUTTON/i });

    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
