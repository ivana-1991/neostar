import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AIChatProvider } from "@/lib/aiChatContext";
import AIChatModal from "@/components/AIChatModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neostar – AI prodajni savjetnik",
  description: "Pametni AI asistent koji pomaže tvojim kupcima pronaći pravi proizvod.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <AIChatProvider>
          {children}
          <AIChatModal />
        </AIChatProvider>
      </body>
    </html>
  );
}
