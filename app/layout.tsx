import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./(components)/nav/Nav";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noah",
  description: "Dev_park blog",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  icons: {
    icon: "/icon-logo-192x192.png",
    apple: "/icon-logo-512x512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black`}
        >
          <Nav />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
