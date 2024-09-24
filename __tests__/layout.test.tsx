import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import RootLayout from '../src/app/[locale]/layout';

// Mock getMessages 
jest.mock('next-intl/server', () => ({
  getMessages: jest.fn().mockResolvedValue({
    greeting: 'Hello',
  }),
}));


jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@mui/material-nextjs/v13-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../src/app/components/header', () => () => <header>Header Component</header>);
jest.mock('../src/app/components/footer', () => () => <footer>Footer Component</footer>);

describe('RootLayout', () => {
  it('renders Header, Footer, and children', async () => {
    const mockChildren = <main>Main Content</main>;

    // Mock  locale
    const props = { children: mockChildren, params: { locale: 'en' } };



  });

  it('sets the correct language attribute on the html element', async () => {
    const mockChildren = <main>Main Content</main>;


    const props = { children: mockChildren, params: { locale: 'fr' } };


    render(await RootLayout(props));

  });
});