import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

export const dynamic = 'force-dynamic';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BusinessFirst Admin',
  description: 'Professional Admin Panel for BusinessFirst News',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}