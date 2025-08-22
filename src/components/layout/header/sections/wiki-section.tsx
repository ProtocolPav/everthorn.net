// components/layout/header/sections/wiki-section.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ListItem } from "../list-item"

const wikiLinks = [
    {
        href: '/wiki',
        title: 'Wiki Homepage',
        description: 'Enter the main Everthorn Wiki, the place to see everything'
    },
    {
        href: '/wiki/projects',
        title: 'Project Pages',
        description: 'View a list of every project page, and nothing else'
    },
    {
        href: '/map',
        title: 'World Map',
        description: 'View an interactive world map of our current world'
    },
]

export function WikiSection() {
    return (
        <div className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <Card className="bg-gradient-to-bl from-background to-cyan-400/20">
                <CardHeader>
                    <h3>Everthorn Wiki</h3>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">
                        The one-stop-shop for everything Everthorn. <br/>
                        View, edit or create new pages. Write to your heart's content
                    </p>
                </CardContent>
            </Card>

            <ul className="grid">
                {wikiLinks.map(({ href, title, description }) => (
                    <ListItem key={href} href={href} title={title}>
                        {description}
                    </ListItem>
                ))}
            </ul>
        </div>
    )
}
