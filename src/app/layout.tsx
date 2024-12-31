import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/navigation/header";

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
      <body className="bg-gradient-to-br from-[#E6EBF9] to-[#F3F5F9] max-w-8xl mx-auto px-4 md:px-8">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
