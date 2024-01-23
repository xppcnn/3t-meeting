import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProviders from "@/providers/ReactQueryProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3T Meeting",
  description: "3T Meeting, best meeting software!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProviders>
          {children}
          <Toaster position="top-center" />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
