import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Builder Cup | NERDCONF",
    template: "%s | AI Builder Cup",
  },
  description:
    "A 60-minute AI build challenge with Hermes Agent and Nebius Token Factory.",
  applicationName: "AI Builder Cup",
  keywords: [
    "AI Builder Cup",
    "AI World Cup",
    "NERDCONF",
    "Hermes Agent",
    "Nebius",
    "Nebius Token Factory",
  ],
  authors: [{ name: "NERDCONF" }],
  openGraph: {
    title: "AI Builder Cup | NERDCONF",
    description:
      "A 60-minute AI build challenge with Hermes Agent and Nebius Token Factory.",
    type: "website",
    siteName: "AI Builder Cup",
  },
  twitter: {
    card: "summary",
    title: "AI Builder Cup | NERDCONF",
    description:
      "Choose a track, start the timer, and ship one tiny AI tool with Hermes Agent and Nebius.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${robotoMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
