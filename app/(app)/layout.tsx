import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import "./styles/waves.css";
import Navbar from "./components/navigation";
import Footer from "./components/footer";
import Script from "next/script";
import { Toaster } from "sonner";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BiMarz",
  description: "BiMarz Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-227HQPE7BD"
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-227HQPE7BD");
          `,
        }}
      />
      <body className={`${vazirmatn.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
