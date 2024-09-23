import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like "toBeInTheDocument"
import RootLayout from '../src/app/[locale]/layout'; // Adjust the import path

// Mock the getMessages function to simulate fetching translations
jest.mock('next-intl/server', () => ({
  getMessages: jest.fn().mockResolvedValue({
    greeting: 'Hello', // Example translation data
  }),
}));

// Mock the NextIntlClientProvider and AppRouterCacheProvider
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

    // Mock params for locale
    const props = { children: mockChildren, params: { locale: 'en' } };



  });

  it('sets the correct language attribute on the html element', async () => {
    const mockChildren = <main>Main Content</main>;

    // Mock params for locale
    const props = { children: mockChildren, params: { locale: 'fr' } };

    // Render the async RootLayout with the "fr" locale
    render(await RootLayout(props));

  });
});