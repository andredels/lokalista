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
  const themeInitializer = `
    (() => {
      try {
        const stored = localStorage.getItem('lokalista-theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem('lokalista-theme', theme);
      } catch (error) {
        console.warn('Theme initialization failed:', error);
      }
    })();
  `;

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <div className="min-h-dvh flex flex-col">
          <ConditionalHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
