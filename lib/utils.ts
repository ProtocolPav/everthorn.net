import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeCase(str: string): string {
  var myStr = str.split(' ')
  var sentenceStr = ''
  for (let i in myStr) {
    sentenceStr = sentenceStr.concat(" ", myStr[i].charAt(0).toUpperCase() + myStr[i].slice(1).toLowerCase())
  }
  return sentenceStr
}

export function minecraftItemStringToWords(string: string): string {
  return capitalizeCase(String(string).replace('minecraft:', '').replaceAll('_', ' '))
}

export function formatDateToAPI(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
