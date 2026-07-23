import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KINGSCOUT",
  description: "Registro de eventos ao vivo — Kings League",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
