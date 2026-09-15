import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/app/providers";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-sans-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business First",
  description: "News Platform",
  icons: {
    icon: [
      { url: '/logo/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/logo/logo.svg'],
    apple: ['/logo/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansDisplay.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
