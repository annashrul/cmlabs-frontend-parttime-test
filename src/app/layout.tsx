import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ViewModeProvider>
          <HeaderSearchProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </HeaderSearchProvider>
        </ViewModeProvider>
        <Footer />
      </body>
    </html>
  );
}
