import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/[locale]/page';
import { getData } from '../src/api/getAllProducts';

jest.mock('../src/api/getAllProducts');

const mockedGetData = getData as jest.MockedFunction<typeof getData>;

describe('Home component', () => {
  it('renders ObjectList with data from getData', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    mockedGetData.mockResolvedValueOnce(mockData);

    render(<Home />);

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(mockData.length);
    mockData.forEach((item, index) => {
      expect(items[index]).toHaveTextContent(item.name);
    });
  });
});

