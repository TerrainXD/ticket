import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket Tracker",
  description: "Modern ticket management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-900`}
      >
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Nav />
          <main className="flex-grow bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
