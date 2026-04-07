import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomBar from "@/components/layout/BottomBar";
import ProgressBar from "@/components/layout/ProgressBar";
import BackToTop from "@/components/ui/BackToTop";
import { HeaderSearchProvider } from "@/context/HeaderSearchContext";
import { ViewModeProvider } from "@/context/ViewModeContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MealExplorer - Discover Recipes by Ingredients",
  description:
    "Explore meals and recipes by ingredients using TheMealDB API",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans pb-16 md:pb-0">
        <Suspense>
          <ProgressBar />
        </Suspense>
        <ViewModeProvider>
          <HeaderSearchProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </HeaderSearchProvider>
        </ViewModeProvider>
        <Footer />
        <BackToTop />
        <BottomBar />
      </body>
    </html>
  );
}
