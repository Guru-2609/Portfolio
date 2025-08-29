import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Guru's Portfolio",
  keywords: "software developer, web developer, react, next.js, portfolio, fresher developer",
  authors: [{ name: "DevQueens" }],
  openGraph: {
    title: "Guru's Portfolio",
    description: "Professional portfolio showcasing projects and skills",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.ico",
},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
