import { LockIcon, HouseIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DiscordAvatar } from "@/components/layout/header/discord-avatar";

export function AccessDeniedScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                    {/* Simple animated icon */}
                    <div className="relative">
                        <LockIcon
                            size={64}
                            className="text-blue-500 animate-pulse"
                        />
                        <div className="absolute inset-0 animate-ping">
                            <LockIcon
                                size={64}
                                className="text-blue-500 opacity-20"
                            />
                        </div>
                    </div>

                    {/* Error code */}
                    <h1 className="text-6xl font-bold text-blue-500 font-mono">
                        401
                    </h1>

                    {/* Simple message */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-foreground">
                            Access Denied
                        </h2>
                        <p className="text-muted-foreground">
                            You need to be logged in to access this page. Please sign in with your Discord account.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Link href="/home" className="flex-1">
                            <Button variant="outline" className="w-full" size="default">
                                <HouseIcon className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </Link>

                        <DiscordAvatar />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
