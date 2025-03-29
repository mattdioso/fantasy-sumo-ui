import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@components/navbar";
import { SidebarProvider } from "@components/ui/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantasy Sumo",
  description: "An application to track our fantasy sumo league",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`h-full w-full antialiased`}
      >
        <SidebarProvider className="dark bg-zinc-900 place-content-center text-white">
          <AppSidebar variant="inset" />
          <div className="border border-white m-36 p-4 w-full rounded-xl">
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
