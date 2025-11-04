import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Book My Trip",
  description: "Make travel easy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}
