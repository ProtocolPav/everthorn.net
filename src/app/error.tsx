'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ServerErrorScreen} from "@/components/screens/server-error";

export default function Error({error, reset,}: {error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return <ServerErrorScreen />
}