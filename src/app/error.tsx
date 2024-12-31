'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className={'container mx-auto my-auto items-center text-center'}>
            <h2>Something went wrong!</h2>
            <Link href='/home'>
                <Button className={'my-5'}>Go Home</Button>
            </Link>
        </div>
    )
}