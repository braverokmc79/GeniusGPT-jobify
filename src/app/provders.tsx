"use client";
import ThemeProvider from "@/components/theme-provider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";


interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >        
        {children}
        <Toaster position="top-center"   />
      </ThemeProvider>
    </>
  );
};

export default Providers;
