"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Construction, ExternalLink } from "lucide-react"

export default function IndexPage() {
    return (
        <div className="container min-h-screen flex flex-col items-center justify-center py-10 space-y-8">
            <div className="text-center space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                    <Construction className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Under Construction</h1>
                    <p className="text-xl text-muted-foreground">
                        The new Everthorn Wiki is being built
                    </p>
                </div>
            </div>

            <div className="w-full max-w-md space-y-6">
                <Alert>
                    <AlertDescription className="text-center">
                        We're working hard to bring you an improved wiki experience.
                        Please check back soon!
                    </AlertDescription>
                </Alert>

                <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        In the meantime, you can access the previous version:
                    </p>

                    <Link
                        href="https://everthorn.fandom.com/wiki/Everthorn_Wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="w-full" variant="outline" size="lg">
                            Visit Old Wiki
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
