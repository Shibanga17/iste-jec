import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // <-- 1. IMPORT ADDED HERE
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- PREMIUM SEO & METADATA ---
export const metadata: Metadata = {
  title: "ISTE JEC | Empowering Future Engineers",
  description: "The official Indian Society for Technical Education (ISTE) Students' Chapter at Jorhat Engineering College. Join us for hackathons, workshops, and open-source project building.",
  keywords: ["ISTE", "JEC", "Jorhat Engineering College", "Tech Society", "Hackathon", "Assam", "Engineering", "Coding", "Hardware"],
  openGraph: {
    title: "ISTE JEC - Tech Society of Jorhat Engineering College",
    description: "Join the premier technical society of JEC. Explore workshops, hackathons, and a community of innovators.",
    url: "https://iste-jec.vercel.app", 
    siteName: "ISTE JEC",
    images: [
      {
        url: "/iste-logo.jpeg", 
        width: 800,
        height: 800,
        alt: "ISTE JEC Cover Image",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISTE JEC | Tech Society",
    description: "The official ISTE Students' Chapter at Jorhat Engineering College.",
    images: ["/iste-logo.jpeg"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth"> 
      <body className={inter.className}>
        {children}
        <Analytics /> {/* <-- 2. COMPONENT ADDED HERE! */}
      </body>
    </html>
  );
}