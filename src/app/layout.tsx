import type { Metadata } from "next";
import { Iceland, Big_Shoulders } from "next/font/google";
import "./globals.css";

const iceland = Iceland({
  variable: "--font-iceland",
  subsets: ["latin"],
  weight: "400",
});

const bigShoulder = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // Big Shoulders lacks fallback metrics in Next's map; skip adjustment to silence warnings.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baseer Ahmed Khan | Portfolio",
  description: "Frontend developer portfolio for Baseer Ahmed Khan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${iceland.variable} ${bigShoulder.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
