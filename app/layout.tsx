import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ToastProvider from "@/providers/toast.provider";
import Header from "@/components/header";
import ReduxProvider from "@/providers/redux.provider";

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
        <ReduxProvider>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
