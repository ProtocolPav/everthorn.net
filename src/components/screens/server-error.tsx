import { WarningIcon, HouseIcon, ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ServerErrorScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                    {/* Simple animated icon */}
                    <div className="relative">
                        <WarningIcon
                            size={64}
                            className="text-destructive animate-pulse"
                        />
                        <div className="absolute inset-0 animate-ping">
                            <WarningIcon
                                size={64}
                                className="text-destructive opacity-20"
                            />
                        </div>
                    </div>

                    {/* Error code */}
                    <h1 className="text-6xl font-bold text-destructive font-mono">
                        500
                    </h1>

                    {/* Simple message */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-foreground">
                            Something went wrong
                        </h2>
                        <p className="text-muted-foreground">
                            We're experiencing some technical difficulties. Please try again in a moment.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Link href="/home" className="flex-1">
                            <Button className="w-full" size="default">
                                <HouseIcon className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="default"
                            onClick={() => window.location.reload()}
                            className="flex-1"
                        >
                            <ArrowCounterClockwiseIcon className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
