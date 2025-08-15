import { Sword, Pickaxe, Cuboid, Zap, Skull, FileText } from 'lucide-react';

export const interactionTypes = {
    kill: {
        label: 'Kill',
        icon: Sword,
        variant: 'red' as const,
    },
    mine: {
        label: 'Mine',
        icon: Pickaxe,
        variant: 'cyan' as const,
    },
    place: {
        label: 'Place',
        icon: Cuboid,
        variant: 'green' as const,
    },
    use: {
        label: 'Use',
        icon: Zap,
        variant: 'purple' as const,
    },
    die: {
        label: 'Die',
        icon: Skull,
        variant: 'amber' as const,
    },
    scriptevent: {
        label: 'Script Event',
        icon: FileText,
        variant: 'pink' as const,
    },
};

export const dimensions = {
    'minecraft:overworld': { label: 'Overworld', img: '/map/ui/grass_block.png' },
    'minecraft:nether': { label: 'Nether', img: '/map/ui/netherrack.png' },
    'minecraft:the_end': { label: 'End', img: '/map/ui/endstone.png' },
};

export const PAGE_SIZE = 50;

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function buildQuery(params: Record<string, any>): string {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                value.forEach((v) => {
                    const stringValue = String(v).trim();
                    if (stringValue) {
                        query.append(key, stringValue);
                    }
                });
            }
        } else if (value !== undefined && value !== null) {
            const stringValue = String(value).trim();
            if (stringValue && (typeof value === 'number' || stringValue !== '')) {
                query.append(key, stringValue);
            }
        }
    }
    return query.toString()
}

