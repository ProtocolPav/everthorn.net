import { MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes } from "@minecraft/vanilla-data"

export const items = Object.values(MinecraftItemTypes).map((item) => String(item))

export const rewards = Object.values(MinecraftItemTypes).map((item) => String(item))
rewards.unshift('nugs_balance')

export const blocks = Object.values(MinecraftBlockTypes).map((block) => String(block))

export const entities = Object.values(MinecraftEntityTypes).map((entity) => String(entity))

