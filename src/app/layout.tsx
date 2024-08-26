import "@/styles/globals.css";

import { Tajawal } from "next/font/google";
import { type Metadata } from "next";
import Providers from "@/providers";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  preload: false,
  subsets: ["arabic"],
});
export const metadata: Metadata = {
  title: "Muse Matrix",
  description: "A Matrix for Musing Ideas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.className}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
