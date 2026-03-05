import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";

import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "AF - Portfolio",
  description: "Something in between breaking and building things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
