import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Italiana,
  Playfair_Display,
  Source_Sans_3,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import "@/styles/phomoji-landing.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const phomojiItaliana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-phomoji-italiana",
});

const phomojiPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-phomoji-playfair",
});

const phomojiSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-phomoji-sans",
});

const phomojiSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-phomoji-serif",
});

export const metadata: Metadata = {
  title: "Phomoji — Your forgotten photos, rediscovered.",
  description:
    "You have thousands of photos you never look at. Phomoji picks one and brings it back. Coming soon to iOS and Android.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${phomojiItaliana.variable} ${phomojiPlayfair.variable} ${phomojiSans.variable} ${phomojiSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
