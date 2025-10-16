import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "./ui/ConditionalHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lokalista — Find the perfect local spots",
  description:
    "Lokalista is an AI-powered guide to nearby restaurants, cafes, and events based on your preferences and location. Open access; no payment needed.",
  metadataBase: new URL("https://lokalista.app"),
  openGraph: {
    title: "Lokalista — Find the perfect local spots",
    description:
      "Open access; no payment needed. Discover hidden gems around you with AI-tailored picks for food, coffee, and events.",
    url: "https://lokalista.app",
    siteName: "Lokalista",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokalista — Find the perfect local spots",
    description:
      "Open access; no payment needed. Discover hidden gems around you with AI-tailored picks for food, coffee, and events.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-dvh flex flex-col">
          <ConditionalHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
