import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/layouts/header/header";
import Footer from "@/app/components/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
