import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MotionDirector from "@/components/providers/MotionDirector";
import AmbientWorld from "@/components/effects/AmbientWorld";
import AudioController from "@/components/effects/AudioController";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Mary",
  description: "A cinematic birthday experience for someone special.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <AudioController />
          <AmbientWorld />
          <MotionDirector>
            {children}
          </MotionDirector>
        </SmoothScroll>
      </body>
    </html>
  );
}
