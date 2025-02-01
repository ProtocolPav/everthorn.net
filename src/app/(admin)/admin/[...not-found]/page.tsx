import Link from 'next/link'

export default function Page() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/home">Return Home</Link>
        </div>
    )
}