import { render, screen, waitFor } from '@testing-library/react';
import MoreInfo from '../src/app/[locale]/moreInfo/[id]/page'; // Adjust the path as necessary
import { getDataById } from '../src/api/getProductById';
import '@testing-library/jest-dom'; // for the extended matchers

// Mock the getDataById function
jest.mock('../src/api/getProductById', () => ({
  getDataById: jest.fn(),
}));

jest.mock('../src/app/components/moreInfoCards', () => ({ id, name, data }: { id: string, name: string, data: any }) => (
  <div>{`MoreInfoCards rendered for ${name}`}</div>
));

describe('MoreInfo Page', () => {
  it('renders MoreInfoCards when data is available', async () => {
    // Mock the resolved value of getDataById
    (getDataById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Sample Product',
      data: { detail: 'Some details' }
    });

    render(await MoreInfo({ params: { id: '1' } }));

    // Wait for the MoreInfoCards component to render with the mocked data
    await waitFor(() => expect(screen.getByText('MoreInfoCards rendered for Sample Product')).toBeInTheDocument());
  });

  it('displays a "No data found" message when data is not available', async () => {
    // Mock getDataById to return null
    (getDataById as jest.Mock).mockResolvedValue(null);

    render(await MoreInfo({ params: { id: '999' } }));

    // Wait for the "No data found" message to appear
    await waitFor(() => expect(screen.getByText('No data found for ID: 999')).toBeInTheDocument());
  });

  it('handles empty data correctly', async () => {
    // Mock getDataById to return an empty object
    (getDataById as jest.Mock).mockResolvedValue({});

    render(await MoreInfo({ params: { id: '1' } }));

    // Depending on how MoreInfoCards or the page handles empty data, adjust this check.
    await waitFor(() => expect(screen.queryByText('No data found')).not.toBeInTheDocument());
  });
});