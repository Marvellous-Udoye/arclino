import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arclino - Real-time flowcharts for teams that ship",
  description:
    "Arclino is a real-time collaborative flowchart workspace for product, engineering, and operations teams.",
  keywords: [
    "flowcharts",
    "collaboration",
    "architecture",
    "system design",
    "workflow",
    "real-time",
  ],
  authors: [{ name: "Arclino" }],
  creator: "Arclino Team",
  publisher: "Arclino",
  applicationName: "Arclino",
  formatDetection: {
    telephone: false,
    address: false,
    email: true,
  },
  appleWebApp: {
    capable: true,
    title: "Arclino",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Arclino - Real-time flowcharts for teams that ship",
    description:
      "A collaborative canvas where product, engineering, and operations teams map systems together with clarity and speed.",
    url: "https://arclino.com",
    siteName: "Arclino",
    images: [
      {
        url: "https://arclino.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arclino preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arclino - Real-time flowcharts for teams that ship",
    description:
      "A collaborative canvas where product, engineering, and operations teams map systems together with clarity and speed.",
    images: ["https://arclino.com/og-image.png"],
    site: "@ArclinoHQ",
  },
  alternates: {
    canonical: "https://arclino.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arclino",
              url: "https://arclino.com",
              logo: "https://arclino.com/og-image.png",
              description:
                "Arclino is a real-time collaborative flowchart workspace for product, engineering, and operations teams.",
              sameAs: [
                "https://www.linkedin.com",
                "https://www.instagram.com",
                "https://x.com",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} antialiased bg-black text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

        <Script id="analytics-placeholder" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
      </body>
    </html>
  );
}





