import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Header from "../components/header";
import Footer from "../components/footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onboarding exercise",
  description: "Practice using Next.js",
};

interface RootLayoutProps{
  children: React.ReactNode;
  params: {
    locale: string;
  }
}


export default async function RootLayout({
  children,
  params: {locale},
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();
  return(
      <html lang={locale}>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>         
            <Header />
            {children}
            <Footer />
          </AppRouterCacheProvider>
          </NextIntlClientProvider>
        </body>
      </html>
  );
}
