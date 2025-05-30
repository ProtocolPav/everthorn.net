import GuidelineItem from "./guideline-item";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Sparkle, Crown, Gift, Eye, MagicWand} from "@phosphor-icons/react";
import * as React from "react";

export default function ServerAddons() {
    return (
        <GuidelineItem name={'Server Addons'}>
            <div className="grid gap-6">
                <div className="grid gap-4">
                    <Alert variant={'info'}>
                        <Sparkle weight={'duotone'} className="size-4" />
                        <AlertDescription>
                            <div className="font-semibold mb-2">Enhanced Experience</div>
                            Everthorn features custom addons and items that enhance gameplay beyond vanilla Minecraft
                        </AlertDescription>
                    </Alert>

                    <div className="flex items-start gap-3">
                        <Sparkle weight={'duotone'} className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Third-Party Addons</h5>
                            <p className="text-sm mb-3">We use popular community addons to enhance the building experience:</p>
                            <ul className="text-sm grid gap-2 list-disc pl-6 space-y-1">
                                <li><strong>Foxy's Mob Heads</strong> - Collect decorative mob heads from defeated enemies</li>
                                <li><strong>Mini Blocks</strong> - Place smaller versions of blocks for detailed builds</li>
                                <li><strong>Armor Stands</strong> - Enhanced armor stand customization and positioning</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye weight={'duotone'} className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Custom Server Software</h5>
                            <p className="text-sm mb-3">Our proprietary addon provides essential server functionality:</p>
                            <ul className="text-sm grid gap-2 list-disc pl-6 space-y-1">
                                <li>Connection logging and playtime tracking</li>
                                <li>In-game interaction monitoring and moderation tools</li>
                                <li>Quest system for community events and challenges</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Crown weight={'duotone'} className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Tournament Rewards</h5>
                            <p className="text-sm mb-3">Exclusive items awarded to tournament champions:</p>
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg p-3">
                                <p className="text-sm font-medium mb-1">Champions Armour Set</p>
                                <p className="text-xs text-muted-foreground">Glowing armor with particle effects (currently only chestplate awarded)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Gift weight={'duotone'} className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Special Event Items</h5>
                            <p className="text-sm mb-3">Unique items from seasonal events and special occasions:</p>
                            <ul className="text-sm grid gap-2 list-disc pl-6 space-y-1">
                                <li><strong>Totem of Togetherness</strong> - Christmas gift that grants extra hearts when near other players (up to 10 hearts)</li>
                                <li><strong>Whoopee Cushion</strong> - April Fools' prank item that makes amusing sound effects</li>
                            </ul>
                        </div>
                    </div>

                    {/*<div className="flex items-start gap-3">*/}
                    {/*    <MagicWand weight={'duotone'} className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />*/}
                    {/*    <div>*/}
                    {/*        <h5>End Dimension Features</h5>*/}
                    {/*        <p className="text-sm mb-3">Custom content exclusive to The End dimension:</p>*/}
                    {/*        <div className="grid gap-3">*/}
                    {/*            <div>*/}
                    {/*                <h5 className="font-medium mb-2">The Altar</h5>*/}
                    {/*                <p className="text-xs text-muted-foreground mb-2">Expand the End border by sacrificing items of personal value</p>*/}
                    {/*            </div>*/}
                    {/*            <div>*/}
                    {/*                <h5 className="font-medium mb-2">Custom End Mobs</h5>*/}
                    {/*                <ul className="text-xs text-muted-foreground grid gap-1 list-disc pl-4">*/}
                    {/*                    <li><strong>The Breath</strong> - Blinds players near its projectiles</li>*/}
                    {/*                    <li><strong>Endstone Golem</strong> - Powerful guardian creature</li>*/}
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </GuidelineItem>
    )
}
