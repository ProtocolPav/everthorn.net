// components/layout/header/sections/admin-section.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ListItem } from "../list-item"

const adminLinks = [
    {
        href: '/admin',
        title: 'Dashboard',
        description: 'View server statistics, manage players, and more',
    },
    {
        href: '/admin/quests/editor/new',
        title: 'Quest Editor',
        description: 'Create new Quests',
        className: 'bg-gradient-to-tl from-transparent to-yellow-300/10'
    },
    {
        href: '/admin/guidelines',
        title: 'CM Guidelines',
        description: 'All you need to know to be a great Community Manager',
    },
]

export function AdminSection() {
    return (
        <div className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <Card className="bg-gradient-to-br from-background to-purple-400/20">
                <CardHeader>
                    <h3>Admin Dashboard</h3>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">
                        The one place you need to manage everything server-related
                    </p>
                </CardContent>
            </Card>

            <ul className="grid">
                {adminLinks.map(({ href, title, description, className }) => (
                    <ListItem key={href} href={href} title={title} className={className}>
                        {description}
                    </ListItem>
                ))}
            </ul>
        </div>
    )
}
