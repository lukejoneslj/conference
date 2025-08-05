import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATNS 2025 Conference - Boulder, Colorado",
  description: "Join the Association for the Treatment of Neuroplastic Symptoms (ATNS) 2025 Conference, September 28-30 in Boulder, Colorado. Featuring expert sessions on neuroplastic pain, mind-body medicine, and innovative treatment approaches.",
  keywords: [
    "ATNS 2025",
    "neuroplastic symptoms",
    "mind-body medicine", 
    "chronic pain",
    "TMS treatment",
    "Boulder conference",
    "neuroplastic pain",
    "medical conference 2025"
  ],
  authors: [{ name: "Association for the Treatment of Neuroplastic Symptoms" }],
  creator: "ATNS",
  publisher: "ATNS",
  openGraph: {
    title: "ATNS 2025 Conference - Boulder, Colorado",
    description: "Join leading experts in neuroplastic symptoms treatment at the ATNS 2025 Conference, September 28-30 in Boulder, Colorado.",
    url: "https://atns2025.vercel.app",
    siteName: "ATNS 2025 Conference",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATNS 2025 Conference - Boulder, Colorado",
    description: "Join leading experts in neuroplastic symptoms treatment at the ATNS 2025 Conference, September 28-30 in Boulder, Colorado.",
    creator: "@ATNS",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
