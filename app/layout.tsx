import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MineScreen - AI Mining Due Diligence | PDAC 2026",
  description:
    "Reduce mining technical report analysis from weeks to hours. AI-powered due diligence for NI 43-101, JORC, and S-K 1300 reports. Visit us at PDAC 2026, March 1-4, Toronto.",
  keywords: [
    "mining due diligence",
    "NI 43-101",
    "JORC",
    "S-K 1300",
    "PDAC 2026",
    "mining investment",
    "AI mining analysis",
    "technical report analysis",
  ],
  openGraph: {
    title: "MineScreen - AI Mining Due Diligence | PDAC 2026",
    description:
      "Reduce mining technical report analysis from weeks to hours. Visit us at PDAC 2026, March 1-4, Toronto.",
    type: "website",
    url: "https://minescreen.ai",
    siteName: "MineScreen",
  },
  twitter: {
    card: "summary_large_image",
    title: "MineScreen - AI Mining Due Diligence | PDAC 2026",
    description:
      "Reduce mining technical report analysis from weeks to hours. Visit us at PDAC 2026.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
