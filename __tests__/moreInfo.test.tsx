import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoreInfo from '../src/app/[locale]/moreInfo/[id]/page';
import { getDataById } from '../src/api/getProductById'

jest.mock('../../../../api/getProductById');

const mockedGetDataById = getDataById as jest.MockedFunction<typeof getDataById>;

describe('MoreInfo component', () => {
  it('renders MoreInfoCards with data from getDataById', async () => {
    const mockData = { id: '1', name: 'Product 1', data: 'Some data' };
    mockedGetDataById.mockResolvedValueOnce(mockData);

    render(<MoreInfo params={{ id: '1' }} />);

    const card = await screen.findByText('Product 1');
    expect(card).toBeInTheDocument();
  });

  it('renders no data message when no data is found', async () => {
    mockedGetDataById.mockResolvedValueOnce(null);

    render(<MoreInfo params={{ id: '1' }} />);

    const message = await screen.findByText('No data found for ID: 1');
    expect(message).toBeInTheDocument();
  });
});
