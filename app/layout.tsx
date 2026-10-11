import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://eydriannn.vercel.app";
const siteName = "Adrian M. De Guzman";
const siteTitle = "Adrian M. De Guzman — Full-Stack Developer";
const siteDescription =
  "Portfolio of Adrian M. De Guzman — full-stack developer and Computer Science graduate crafting detail-oriented web and mobile experiences.";
const siteLogo = "/site-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: `${siteName} Portfolio`,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "Adrian De Guzman",
    "Full-Stack Developer",
    "Mobile Developer",
    "Portfolio",
    "React",
    "Next.js",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: siteLogo, type: "image/png" }],
    shortcut: [siteLogo],
    apple: [{ url: siteLogo, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${siteName} Portfolio`,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteLogo,
        width: 512,
        height: 512,
        alt: "ADG monogram logo — Adrian M. De Guzman",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [siteLogo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#e9e6de",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
