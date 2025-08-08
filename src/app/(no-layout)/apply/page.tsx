"use client"
import {useSession} from "next-auth/react";
import LogInPrompt from "@/components/application_form/login";
import ApplicationForm from "@/components/application_form/form";


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
        <ApplicationForm/>
    )
}
