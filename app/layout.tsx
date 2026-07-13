import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maharnab Naha | Academic Research",
  description:
    "Research, working papers, and academic resources from Maharnab Naha.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Maharnab Naha | Academic Research",
    description:
      "Research, working papers, and academic resources from Maharnab Naha.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
