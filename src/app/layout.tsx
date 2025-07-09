"use client";


import * as React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        {/* Animated Grid Pattern Background Global */}
        <div className="fixed inset-0 z-[-1] w-screen h-screen pointer-events-none">
          {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
          {typeof window !== "undefined" &&
            (React.createElement(require("@/components/magicui/animated-grid-pattern").AnimatedGridPattern, {
              className: "w-full h-full min-w-screen min-h-screen text-primary/20 dark:text-primary/10",
              width: 80,
              height: 80,
              numSquares: 400
            }))}
        </div>
        <Providers>
          {/* <Header /> */}
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

