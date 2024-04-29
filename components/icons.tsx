"use client"

import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CaretDown,
  DiscordLogo,
  IconProps,
  List,
  Moon,
  PatreonLogo,
  Sun,
  YoutubeLogo,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react"

export type Icon = PhosphorIcon

export const Icons = {
  sun: Sun,
  moon: Moon,
  youtube: YoutubeLogo,
  patreon: PatreonLogo,
  discord: DiscordLogo,
  hamburgermenu: List,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,
  external_link: ArrowSquareOut,
  expand: CaretDown,
}
