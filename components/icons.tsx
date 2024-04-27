"use client"

import {
  IconProps,
  PatreonLogo,
  YoutubeLogo,
  DiscordLogo,
  Moon,
  Sun,
  List,
  ArrowSquareOut,
  ArrowRight,
  CaretDown,
  type Icon as PhosphorIcon
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
  external_link: ArrowSquareOut,
  expand: CaretDown
}
