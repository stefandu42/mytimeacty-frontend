import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ToastProvider from "@/providers/toast.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mytimeacty",
  description: "Site to spend time on playing activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
