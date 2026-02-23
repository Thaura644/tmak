import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tmak.co.ke"),
  title: {
    default: "The Mango Association of Kenya (T-MAK) | National Authority",
    template: "%s | T-MAK",
  },
  description: "National coordinating authority, value chain platform, and market linkage enabler for Kenya's mango industry.",
  openGraph: {
    title: "The Mango Association of Kenya (T-MAK)",
    description: "National coordinating authority, value chain platform, and market linkage enabler for Kenya's mango industry.",
    url: "https://tmak.co.ke",
    siteName: "T-MAK",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mango Association of Kenya (T-MAK)",
    description: "National coordinating authority for Kenya's mango industry.",
    images: ["/hero.png"],
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-slate-800`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Mango Association of Kenya",
              "alternateName": "T-MAK",
              "url": "https://tmak.co.ke",
              "logo": "https://tmak.co.ke/logo.png",
              "description": "National coordinating authority for Kenya's mango industry.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KE"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
