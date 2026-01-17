import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Calm Form",
  description: "Premium clean skincare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
