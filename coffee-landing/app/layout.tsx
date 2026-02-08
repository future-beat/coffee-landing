import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Craft Coffee | Modern Specialty Coffee Experience",
  description: "Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.",
  metadataBase: new URL('https://coffee-landing-9t0iizvjq-hesams-projects-432a48c6.vercel.app'),
  keywords: ['coffee shop', 'specialty coffee', 'craft coffee'],
  authors: [{ name: 'Craft Coffee' }],
  openGraph: {
    title: "Craft Coffee | Modern Specialty Coffee Experience",
    description: "Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.",
    url: '/',
    siteName: 'Craft Coffee',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft Coffee - Modern specialty coffee shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Craft Coffee | Modern Specialty Coffee Experience",
    description: "Where every cup is a journey.",
    images: ['/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-cream text-brand-espresso font-sans">
        {children}
      </body>
    </html>
  );
}
