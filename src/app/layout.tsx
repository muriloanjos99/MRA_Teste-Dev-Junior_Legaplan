import type { Metadata } from "next";
import "./globals.scss";
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({
  weight: ["400", "500"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FocalPoint"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${interTight.className}`}>
        {children}
      </body>
    </html>
  );
}
