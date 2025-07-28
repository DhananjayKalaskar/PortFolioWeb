import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollProgress } from "@/components/scroll-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alex Chen - VR/Game Developer Portfolio",
  description:
    "Portfolio of Alex Chen, a VR and Game Developer specializing in Unity 3D development and immersive experiences.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}
