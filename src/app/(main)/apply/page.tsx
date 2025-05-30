"use client"
import {useSession} from "next-auth/react";
import LogInPrompt from "@/app/(main)/apply/_components/login";
import ApplicationForm from "@/app/(main)/apply/_components/form";
import {Card, CardHeader, CardContent} from "@/components/ui/card";


export default function MyForm() {

    const { data: session, status } = useSession()

    if (
        ["unauthenticated", "loading"].includes(status)
    ) {
        return (
            <LogInPrompt/>
        )
    }

    return (
        <div className={'flex justify-center py-10'}>
            <Card className={'md:w-1/2'}>
                <CardHeader><h2 className={'text-center'}>Everthorn Application Form</h2></CardHeader>
                    <CardContent className={'grid grid-cols-1 gap-4'}>
                        <ApplicationForm/>
                    </CardContent>
                </Card>
        </div>
    )
}
