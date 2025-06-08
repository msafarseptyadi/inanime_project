import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Utilities/Navbar";
import { ValueProvider } from "@/contexts/ValueContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "INAnime",
  description: "The Best Website of Anime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={"/fav.ico"} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ValueProvider>
          <Navbar/>
          {children}
        </ValueProvider>
      </body>
    </html>
  );
}
