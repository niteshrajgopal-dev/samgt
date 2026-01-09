import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GT7 Racing League | Gran Turismo 7 Championship",
  description: "Premier Gran Turismo 7 racing league on PlayStation 5. Join competitive races, track your stats, and compete for championship glory.",
  keywords: "Gran Turismo 7, GT7, racing league, PlayStation 5, PS5, sim racing, championship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} antialiased bg-black text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
