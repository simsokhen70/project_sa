"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import "react-modal-video/css/modal-video.css";
import "../styles/index.css";
import CheckTelegramId from "@/components/Other/CheckTelegramId";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <Script src="https://accounts.google.com/gsi/client" />
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black font-myText`}>
          <Providers>
            <Header />
            <Toaster position="top-center" />
            {children}
            <ScrollToTop />
            <CheckTelegramId />
          </Providers>
      </body>
    </html>
  );
}
