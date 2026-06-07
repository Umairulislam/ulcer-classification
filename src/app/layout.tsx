import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import store from "@/store/store"
import { ThemeProvider } from "@mui/material/styles"
import theme from "@/theme/theme"
import AppProvider from "@/hoc/AppProvider"
import { CssBaseline } from "@mui/material"
import { Metadata } from "next"
import Providers from "@/hoc/Providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Ulcer Classification System",
    template: "%s | Ulcer Classification System",
  },
  description:
    "A modern platform for classifying ulcer images. Admins manage doctors and patients while doctors classify ulcer images and generate detailed reports.",
  keywords: ["ulcer classification", "medical imaging", "hospital management", "doctor portal"],
  authors: [{ name: "Engr. Umair Ul Islam" }],
  robots: "noindex, nofollow", // private app — keep it off search engines
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
