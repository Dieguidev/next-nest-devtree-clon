import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: {
    template: "%s | Devtree Clon",
    default: "Devtree Clon",
  },
  description: "A platform to share and discover developer portfolios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={inter.className}
        >
          {children}
        </body>
      </html>
      <Toaster />
    </>
  );
}
