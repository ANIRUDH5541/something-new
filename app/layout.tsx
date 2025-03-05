import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { ProductProvider } from './lib/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Something New - Cozy Crochet Store',
  description: 'Handmade crochet items with love and care',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ProductProvider>
            <div
              className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen  px-4 py-12 overflow-hidden"

            >
              <Navbar/>
              <main>{children}</main>
            </div>
            <Toaster />
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}