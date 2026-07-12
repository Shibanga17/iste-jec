import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    url: "https://yourwebsite.com", // <-- Update this later when you get your real domain!
    siteName: "ISTE JEC",
    images: [
      {
        url: "/og-image.jpg", // We will add this image in Step 2!
        width: 1200,
        height: 630,
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
    images: ["iste-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}