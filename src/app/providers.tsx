"use client";

import { ThemeProvider } from "next-themes";
// import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
    </ChakraProvider>
  );
}
