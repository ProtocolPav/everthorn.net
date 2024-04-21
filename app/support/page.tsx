'use client'

import { permanentRedirect } from 'next/navigation'
import {siteConfig} from "@/config/site";

export default function redirect() {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }
  permanentRedirect(siteConfig.links.patreon) // Navigate to the new user profile
}