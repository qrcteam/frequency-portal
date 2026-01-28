import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Serif_4, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frequency Activator | Quantum Reality Creators",
  description:
    "Activate your frequency across the six notes of creation. Discover what's possible when your energy aligns with your desires.",
  keywords:
    "frequency activation, energy alignment, self-recognition, quantum reality, consciousness, transformation",
  authors: [{ name: "Oz & Mazix" }],
  openGraph: {
    type: "website",
    title: "Frequency Activator | Quantum Reality Creators",
    description:
      "Activate your frequency across the six notes of creation. Discover what's possible when your energy aligns.",
    siteName: "Quantum Reality Creators",
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
        className={`${cormorant.variable} ${sourceSerif.variable} ${dmSans.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
