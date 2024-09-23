import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/app/[locale]/page'; // Adjust path as necessary
import { getData } from '../src/api/getAllProducts';
import '@testing-library/jest-dom';

// Mock the getData function
jest.mock('../src/api/getAllProducts', () => ({
  getData: jest.fn(),
}));

jest.mock('../src/app/components/objectList', () => ({ rows }: { rows: any[] }) => (
  <div>{rows.length > 0 ? 'ObjectList Rendered' : 'No Data'}</div>
));

describe('Home Page', () => {
  it('fetches data and renders ObjectList', async () => {
    // Mock the resolved value of getData
    (getData as jest.Mock).mockResolvedValue([{ id: 1, name: 'Product 1' }]);

    render(await Home());

    // Wait for the ObjectList to render with the fetched data
    await waitFor(() => expect(screen.getByText('ObjectList Rendered')).toBeInTheDocument());
  });

  it('handles empty data', async () => {
    // Mock getData to return an empty array
    (getData as jest.Mock).mockResolvedValue([]);

    render(await Home());

    // Wait for the ObjectList to render with no data
    await waitFor(() => expect(screen.getByText('No Data')).toBeInTheDocument());
  });


});