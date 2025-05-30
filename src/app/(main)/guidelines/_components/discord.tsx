import GuidelineItem from "./guideline-item";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {CheckCircle, Info, ShieldCheck, Person, Fire, Smiley} from "@phosphor-icons/react";
import * as React from "react";
import Link from "next/link";

export default function DiscordRules() {
    return (
        <GuidelineItem name={'Discord Rules'}>
            <div className="grid gap-6">
                <Alert variant={'info'}>
                    <Info weight={'duotone'} className="size-4" />
                    <AlertDescription>
                        <div>
                            <div className="font-semibold mb-2">Platform Rules</div>
                            Follow <Link href="https://discord.com/tos" className="text-blue-600 underline hover:text-blue-800">Discord Terms of Service</Link> at all times.
                        </div>
                    </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                        <Smiley weight={'duotone'} className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Keep It Friendly</h5>
                            <p className="text-sm">Take arguments to DMs. We maintain a positive environment for everyone.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Fire weight={'duotone'} className="size-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Controversial Topics</h5>
                            <p className="text-sm md:max-w-5/6">
                                We allow for discussion on "controversial" topics such as politics, religion, and the likes,
                                but we ask that you are respectful of others' opinions and keep a level head.
                                Let's not turn a discussion into an argument
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldCheck weight={'duotone'} className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>Content Standards</h5>
                            <p className="text-sm">No NSFW content. Community Managers have final discretion on what qualifies.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Person weight={'duotone'} className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5>One Account Policy</h5>
                            <p className="text-sm">Alt accounts aren't allowed. We're happy with just one of you! 😊</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuidelineItem>
    )
}
