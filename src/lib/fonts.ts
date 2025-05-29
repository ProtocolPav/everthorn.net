import { Geist_Mono, Geist } from "next/font/google"
import localFont from "next/font/local";

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontMinecraftTen = localFont({
  src: '../../public/fonts/minecraft-ten.woff',
  variable: "--font-minecraft-ten",
})

export const fontMinecraftSeven = localFont({
  src: '../../public/fonts/minecraft-seven.woff2',
  variable: "--font-minecraft-seven",
})
