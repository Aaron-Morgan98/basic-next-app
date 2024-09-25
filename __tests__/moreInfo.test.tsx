import { render, screen, waitFor } from '@testing-library/react';
import MoreInfo from '../src/app/[locale]/moreInfo/[id]/page';
import { getDataById } from '../src/api/getProductById';
import '@testing-library/jest-dom';

// Mock getDataById 
jest.mock('../src/api/getProductById', () => ({
  getDataById: jest.fn(),
}));

jest.mock('../src/app/components/moreInfoCards', () => ({ id, title, body }: { id: number, title: string, body: any }) => (
  <div>{`MoreInfoCards rendered for ${title}`}</div>
));

describe('MoreInfo Page', () => {
  it('renders MoreInfoCards when data is available', async () => {
    // Arrange
    (getDataById as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Sample product',
      body: "Some data"
    });

    // Act
    render(await MoreInfo({ params: { id: 1 } }));

    // Assert
    await waitFor(() => expect(screen.getByText('MoreInfoCards rendered for Sample product')).toBeInTheDocument());
  });

  it('displays a "No data found" message when data is not available', async () => {
    // Arrange
    (getDataById as jest.Mock).mockResolvedValue(null);

    // Act
    render(await MoreInfo({ params: { id: 100 } }));

    // Assert
    await waitFor(() => expect(screen.getByText('No data found for ID: 100')).toBeInTheDocument());
  });

  it('handles empty data correctly', async () => {
    // Arrange
    (getDataById as jest.Mock).mockResolvedValue({ id: 1, title: '', body: '' });

    // Act
    render(await MoreInfo({ params: { id: 1 } }));

    // Assert
    await waitFor(() => expect(screen.queryByText('No data found')).not.toBeInTheDocument());
  });
});
