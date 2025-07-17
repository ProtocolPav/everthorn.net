"use client"
import {useSession} from "next-auth/react";
import LogInPrompt from "./_components/login";
import ApplicationForm from "./_components/form";


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
        <div className={'flex justify-center py-0'}>
            <ApplicationForm/>
        </div>
    )
}
