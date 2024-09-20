import type { Metadata } from "next";
import "./globals.scss";

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
      <body>
        {children}
      </body>
    </html>
  );
}
