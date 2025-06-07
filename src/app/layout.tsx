import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ReThread - Give Clothes a Second Life',
  description: 'Recycle your clothes and help designers find unique materials. Join ReThread today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Fonts CDN link is managed by next/font, so no need for manual <link> tags here if using next/font.
            If you prefer manual links, they are already present in the problem description's layout.tsx.
            The Inter font object from next/font will handle injecting the necessary font styles.
        */}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
