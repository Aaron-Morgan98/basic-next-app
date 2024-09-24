import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/app/[locale]/page';
import { getData } from '../src/api/getAllProducts';
import '@testing-library/jest-dom';

// Mock getData
jest.mock('../src/api/getAllProducts', () => ({
  getData: jest.fn(),
}));

jest.mock('../src/app/components/objectList', () => ({ rows }: { rows: any[] }) => (
  <div>{rows.length > 0 ? 'ObjectList Rendered' : 'No Data'}</div>
));

describe('Home Page', () => {
  it('fetches data and renders ObjectList', async () => {
    // Arrange
    (getData as jest.Mock).mockResolvedValue([{ id: 1, name: 'Product 1' }]);

    //Act
    render(await Home());

    // Assert
    await waitFor(() => expect(screen.getByText('ObjectList Rendered')).toBeInTheDocument());
  });

  it('handles empty data', async () => {
    // Arrange
    (getData as jest.Mock).mockResolvedValue([]);
    //Act
    render(await Home());

    // Assert
    await waitFor(() => expect(screen.getByText('No Data')).toBeInTheDocument());
  });


});