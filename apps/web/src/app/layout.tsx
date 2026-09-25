import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/app/providers";
import ScrollToTop from "@/components/ScrollToTop";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business First",
  description: "News Platform",
  verification: {
    google: "7pGvKdN-HajcDRziuuSmBLQpU_68TH3Es6n8CfFoIg0",
  },
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
      className={`${merriweather.variable} ${merriweather.className} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col relative font-sans">
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FF43EBK0GL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FF43EBK0GL');
          `}
        </Script>

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
