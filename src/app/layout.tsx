import type { Metadata, Viewport } from "next"
import { Lexend, Inter } from "next/font/google"
import { AppProviders } from "@/providers/AppProviders"
import "./globals.css"

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Ulcer Classification System",
    template: "%s | Ulcer Classification System",
  },
  description: "Ulcer image classification and reporting for doctors and administrators.",
  icons: {
    icon: "/favicon.ico",
  },
  // Internal clinical tool, not a public marketing site — keep it out of
  // search engines. Flip to true if that assumption is wrong.
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${inter.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
