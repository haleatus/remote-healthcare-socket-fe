import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/navigation/header";

import { Inter, Roboto_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Remote Healthcare",
  description: "RHSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-[#E6EBF9] to-[#F3F5F9] max-w-8xl mx-auto px-4 md:px-8 ${inter.variable} ${roboto_mono.variable} ${spaceGrotesk.variable}`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
