import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";
import { Tajawal } from "next/font/google";

import "@/globals.css";
const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  preload: false,
  subsets: ["arabic"],
});
export const metadata = {
  title: "Muse Matrix",
  description: "A Matrix for Musing Ideas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`dark:bg-[#161513] ${tajawal.className}`}>
        <Providers>
          <div id="modal"></div>
          {/* <Header /> */}
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
