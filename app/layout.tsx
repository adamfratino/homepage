import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
// import Script from "next/script";
import { Lora, Martel } from "next/font/google";

import "./globals.css";

const display = Martel({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const serif = Lora({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adam Fratino",
  description: "design systems & creative technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" /> */}
      <body className={`${serif.className} ${display.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
