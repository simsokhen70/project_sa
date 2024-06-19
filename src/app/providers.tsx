"use client";

import { ThemeProvider } from "next-themes";
// import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
    {/* <SessionProvider> */}
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    {/* </SessionProvider> */}
    </ChakraProvider>
  );
}
