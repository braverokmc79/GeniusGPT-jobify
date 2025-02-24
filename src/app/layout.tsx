import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { koKR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./provders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobify Dev",
  description: "Job application tracking system for job hunters",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider localization={koKR}>
          <Providers  >
             {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
