import { render, screen, waitFor } from '@testing-library/react';
import MoreInfo from '../src/app/[locale]/moreInfo/[id]/page';
import { getDataById } from '../src/api/getProductById';
import '@testing-library/jest-dom';

// Mock getDataById 
jest.mock('../src/api/getProductById', () => ({
  getDataById: jest.fn(),
}));

jest.mock('../src/app/components/moreInfoCards', () => ({ id, name, data }: { id: string, name: string, data: any }) => (
  <div>{`MoreInfoCards rendered for ${name}`}</div>
));

describe('MoreInfo Page', () => {
  it('renders MoreInfoCards when data is available', async () => {
    // Arrange
    (getDataById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Sample Product',
      data: { detail: 'Some details' }
    });
    //Act
    render(await MoreInfo({ params: { id: '1' } }));

    //Assert
    await waitFor(() => expect(screen.getByText('MoreInfoCards rendered for Sample Product')).toBeInTheDocument());
  });

  it('displays a "No data found" message when data is not available', async () => {
    //Arrange
    (getDataById as jest.Mock).mockResolvedValue(null);
    //Act
    render(await MoreInfo({ params: { id: '999' } }));

    //Assert
    await waitFor(() => expect(screen.getByText('No data found for ID: 999')).toBeInTheDocument());
  });

  it('handles empty data correctly', async () => {
    //Arrange
    (getDataById as jest.Mock).mockResolvedValue({});

    //Act
    render(await MoreInfo({ params: { id: '1' } }));

    //Assert
    await waitFor(() => expect(screen.queryByText('No data found')).not.toBeInTheDocument());
  });
});