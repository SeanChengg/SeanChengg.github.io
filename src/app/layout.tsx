import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sean Cheng - Portfolio",
  description: "Product, Mechatronics, and Game Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/ica-rubrik-black" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/cooper-lt-bt" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet" />
        <style>
          {`
            @font-face {
              font-family: 'Cooper Lt BT';
              src: url('https://fonts.cdnfonts.com/css/cooper-lt-bt') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
          `}
        </style>
      </head>
      <body className={poppins.className} style={{
        backgroundColor: '#000000',
        backgroundImage: 'none'
      }}>
        {children}
      </body>
    </html>
  );
}
