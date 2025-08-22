"use client"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    SparkleIcon,
    CrownIcon,
    GiftIcon,
    EyeIcon,
    MagicWandIcon,
    GearIcon,
    ShieldIcon,
    GameControllerIcon,
    TrophyIcon
} from "@phosphor-icons/react";
import * as React from "react";

export default function TechnicalPage() {
    return (
        <div className="mx-5 grid gap-8 pt-6 md:mx-10 md:pb-10 xl:mx-20">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                    <GearIcon weight="duotone" className="w-6 h-6 text-white"/>
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Technical Features</h1>
                    <p className="text-muted-foreground">Enhanced gameplay through custom addons, items, and server technology</p>
                </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
                <SparkleIcon weight="duotone" className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <div className="font-semibold mb-1">Enhanced Experience</div>
                    Everthorn features custom addons and items that enhance gameplay beyond vanilla Minecraft
                </AlertDescription>
            </Alert>

            {/* Third-Party Addons Section */}
            <section className="grid gap-6">
                <div className="flex items-center gap-3">
                    <SparkleIcon weight="duotone" className="size-6 text-blue-600" />
                    <h2 className="text-xl font-semibold">Third-Party Addons</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-md flex items-center justify-center">
                                    {/* Placeholder for mob head icon */}
                                    <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                                </div>
                                Foxy's Mob Heads
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-3">
                                Collect decorative mob heads from defeated enemies to enhance your builds with unique trophies.
                            </p>
                            {/* Placeholder image */}
                            <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                Mob Heads Showcase Image
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center">
                                    {/* Placeholder for mini blocks icon */}
                                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                </div>
                                Mini Blocks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-3">
                                Place smaller versions of blocks for incredibly detailed builds and intricate architectural features.
                            </p>
                            {/* Placeholder image */}
                            <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                Mini Blocks Example Image
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Custom Server Software Section */}
            <section className="grid gap-6">
                <div className="flex items-center gap-3">
                    <EyeIcon weight="duotone" className="size-6 text-green-600" />
                    <h2 className="text-xl font-semibold">Custom Server Software</h2>
                </div>

                <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldIcon weight="duotone" className="size-5 text-green-600" />
                            Everthorn Core System
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Our proprietary server addon provides essential functionality and enhanced gameplay features built specifically for the Everthorn community.
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <GameControllerIcon weight="duotone" className="size-4 text-blue-500" />
                                    Player Systems
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Connection logging and playtime tracking</li>
                                    <li>• Player statistics and achievements</li>
                                    <li>• Custom player data management</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <ShieldIcon weight="duotone" className="size-4 text-red-500" />
                                    Moderation Tools
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Real-time interaction monitoring</li>
                                    <li>• Advanced grief protection</li>
                                    <li>• Automated rule enforcement</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <TrophyIcon weight="duotone" className="size-4 text-yellow-500" />
                                    Quest System
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Dynamic community events</li>
                                    <li>• Progressive challenges</li>
                                    <li>• Reward distribution system</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <MagicWandIcon weight="duotone" className="size-4 text-purple-500" />
                                    Custom Features
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Dynamic world generation</li>
                                    <li>• Custom mob behaviors</li>
                                    <li>• Enhanced item systems</li>
                                </ul>
                            </div>
                        </div>

                        {/* Placeholder image */}
                        <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground mt-4">
                            Server Dashboard Screenshot
                        </div>
                    </CardContent>
                </Card>
            </section>

            <Separator />

            {/* Custom Items Section */}
            <section className="grid gap-6">
                <div className="flex items-center gap-3">
                    <GiftIcon weight="duotone" className="size-6 text-purple-600" />
                    <h2 className="text-xl font-semibold">Custom Items</h2>
                </div>

                {/* Tournament Rewards */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <CrownIcon weight="duotone" className="size-5 text-yellow-600" />
                        <h3 className="text-lg font-medium">Tournament Rewards</h3>
                        <Badge variant="secondary">Exclusive</Badge>
                    </div>

                    <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:border-yellow-800 dark:from-yellow-950/20 dark:to-orange-950/20">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <CrownIcon weight="duotone" className="size-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Champions Armour Set</h4>
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                                        Exclusive glowing armor with stunning particle effects, awarded only to tournament champions.
                                    </p>
                                    <Badge variant="outline" className="text-xs">Currently: Chestplate Only</Badge>
                                </div>
                            </div>
                            {/* Placeholder image */}
                            <div className="w-full h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-md flex items-center justify-center text-xs text-yellow-700 dark:text-yellow-300 mt-4">
                                Champions Armour Preview Image
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Special Event Items */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <GiftIcon weight="duotone" className="size-5 text-red-600" />
                        <h3 className="text-lg font-medium">Special Event Items</h3>
                        <Badge variant="secondary">Seasonal</Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {/* Heart icon placeholder */}
                                        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Totem of Togetherness</h4>
                                        <p className="text-xs text-muted-foreground mb-2">Christmas 2024</p>
                                        <p className="text-sm text-muted-foreground">
                                            Grants extra hearts when near other players (up to 10 hearts total)
                                        </p>
                                    </div>
                                </div>
                                {/* Placeholder image */}
                                <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground mt-3">
                                    Totem of Togetherness Image
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {/* Sound icon placeholder */}
                                        <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Whoopee Cushion</h4>
                                        <p className="text-xs text-muted-foreground mb-2">April Fools 2024</p>
                                        <p className="text-sm text-muted-foreground">
                                            Prank item that creates amusing sound effects
                                        </p>
                                    </div>
                                </div>
                                {/* Placeholder image */}
                                <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground mt-3">
                                    Whoopee Cushion Image
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Separator />

            {/* End Dimension Features */}
            <section className="grid gap-6">
                <div className="flex items-center gap-3">
                    <MagicWandIcon weight="duotone" className="size-6 text-purple-600" />
                    <h2 className="text-xl font-semibold">End Dimension Features</h2>
                </div>

                <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 dark:border-purple-800 dark:from-purple-950/20 dark:to-indigo-950/20">
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-6">
                            Experience exclusive custom content in The End dimension, featuring unique mechanics and creatures.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-purple-500 rounded-md"></div>
                                    The Altar
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    A mystical structure that allows players to expand The End's borders by sacrificing items of personal value. The more meaningful the sacrifice, the greater the expansion.
                                </p>
                                {/* Placeholder image */}
                                <div className="w-full h-24 bg-purple-100 dark:bg-purple-900/20 rounded-md flex items-center justify-center text-xs text-purple-700 dark:text-purple-300">
                                    The Altar Screenshot
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-indigo-500 rounded-md"></div>
                                    Custom End Mobs
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <h5 className="text-sm font-medium">The Breath</h5>
                                        <p className="text-xs text-muted-foreground">Ethereal creature that blinds players near its shadow projectiles</p>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium">Endstone Golem</h5>
                                        <p className="text-xs text-muted-foreground">Massive guardian creature made of End stone blocks</p>
                                    </div>
                                </div>
                                {/* Placeholder image */}
                                <div className="w-full h-24 bg-indigo-100 dark:bg-indigo-900/20 rounded-md flex items-center justify-center text-xs text-indigo-700 dark:text-indigo-300 mt-3">
                                    Custom End Mobs Image
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Footer notice */}
            <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/20 px-2 py-1.5 sm:px-3 sm:py-2 rounded border">
                <SparkleIcon weight="duotone" className="size-3 sm:size-4 text-blue-500 mt-0.5 flex-shrink-0"/>
                <span className="leading-tight">
                    <strong className="text-foreground">Note:</strong> Technical features are continuously updated.
                    New addons and items may be added based on community feedback and server events.
                </span>
            </div>
        </div>
    );
}
