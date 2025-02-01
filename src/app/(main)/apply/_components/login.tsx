"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {DiscordAvatar} from "@/components/layout/header/discord-avatar";

export default function LogInPrompt() {
    return (
        <div className={'container py-28'}>
            <Card className={'mx-auto md:w-1/3'}>
                <CardHeader><h2 className={'text-center'}>Let's Log In</h2></CardHeader>
                <CardContent className={'grid grid-cols-1 gap-4 text-center'}>
                    <p>
                        How Exciting! You're about to start your journey to joining Everthorn.
                        We use Discord for communication.
                        We also have Discord deeply integrated into all our systems.
                    </p>
                    <p>
                        After you apply to join Everthorn, we will contact you via Discord.
                        To ensure we contact the correct person, please log in.
                    </p>

                    <DiscordAvatar className={'mx-auto'}/>

                </CardContent>
            </Card>
        </div>
    )
}