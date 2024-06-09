import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sentenceCase(str: string): string {
  var myStr = str.split(' ')
  var sentenceStr = ''
  for (let i in myStr) {
    sentenceStr = sentenceStr.concat(" ", myStr[i].charAt(0).toUpperCase() + myStr[i].slice(1).toLowerCase())
  }
  return sentenceStr
}
