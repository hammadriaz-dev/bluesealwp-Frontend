import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ReactNode } from "react";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Blue Seal - Premium Waterproofing & Insulation Solutions",
    template: "%s | Blue Seal",
  },
  description: "Blue Seal is a leading waterproofing and insulation contractor in Dubai. Professional GRP lining, thermal insulation, polyurea coatings, and industrial protection services.",
  keywords: [
    "waterproofing dubai",
    "thermal insulation",
    "GRP lining",
    "polyurea coatings",
    "construction solutions",
    "building protection",
  ],
  authors: [{ name: "Blue Seal Insulation Contracting" }],
  metadataBase: new URL("https://blueseal.ae"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blueseal.ae",
    siteName: "Blue Seal",
    title: "Blue Seal - Premium Waterproofing & Insulation Solutions",
    description: "Professional waterproofing, insulation, and protective coating services in Dubai and UAE.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0EA5E9" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/assets/patterns/construction-grid.svg"
          as="image"
          type="image/svg+xml"
        />
        
        {/* Inline CSS for animations to avoid styled-jsx */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes grid-scroll {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
            @keyframes float-element {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-20px) rotate(120deg); }
              66% { transform: translateY(10px) rotate(240deg); }
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.1; }
              50% { opacity: 0.15; }
            }
            @keyframes pulse-slower {
              0%, 100% { opacity: 0.08; }
              50% { opacity: 0.12; }
            }
            .animate-pulse-slow {
              animation: pulse-slow 8s ease-in-out infinite;
            }
            .animate-pulse-slower {
              animation: pulse-slower 12s ease-in-out infinite;
            }
          `
        }} />
      </head>

      <body
        className={`${inter.className} antialiased bg-white text-gray-900 flex flex-col min-h-screen`}
      >
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Construction-themed background animations */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 112, 243, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 112, 243, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-scroll 120s linear infinite',
            }}
          />
          
          {/* Floating construction elements */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-[0.03]"
                style={{
                  left: `${(i * 15) % 100}%`,
                  top: `${(i * 20) % 100}%`,
                  animation: `float-element ${20 + i * 5}s ease-in-out infinite`,
                  animationDelay: `${i * 2}s`,
                }}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full" />
              </div>
            ))}
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse-slower" />
        </div>

        {/* Responsive layout wrapper */}
        <div className="flex flex-col min-h-screen overflow-x-hidden relative z-10">
          <Navbar />
          <main
            id="main-content"
            className="flex-grow w-full overflow-x-hidden"
          >
            {children}
          </main>
          <Footer />
        </div>

        {/* WhatsApp Button */}
        <WhatsAppButton 
          phoneNumber="+97142270123"
          message="Hello Blue Seal, I'm interested in your waterproofing and insulation services. Could you provide more information?"
          companyName="Blue Seal"
          workingHours={{ start: 8, end: 18 }}
        />
      </body>
    </html>
  );
}