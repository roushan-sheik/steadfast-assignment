import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import Providers from "@/Providers";
import CartHydrator from "@/components/cart/CartHydrator";

export const metadata: Metadata = {
  title: "Steadfast LTD",
  description: "Steadfast web",
};

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <Providers>
          <CartHydrator />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
