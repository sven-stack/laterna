import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laterna - Lantern Photography Gallery",
  description: "A beautiful collection of lantern photography from around the world",
  keywords: ["photography", "lanterns", "travel", "gallery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
