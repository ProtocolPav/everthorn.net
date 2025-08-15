import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Clock, FileText } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@/hooks/use-thorny-user';
import { interactionTypes, dimensions } from '@/lib/interactions';
import type { Interaction } from '@/types/interactions';

interface InteractionRowProps {
    interaction: Interaction;
}

export function InteractionRow({ interaction }: InteractionRowProps) {
    const {user} = useUser(interaction.thorny_id);
    const typeConfig = interactionTypes[interaction.type as keyof typeof interactionTypes];
    const dimensionConfig = dimensions[interaction.dimension as keyof typeof dimensions];
    const Icon = typeConfig?.icon || FileText;

    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                        {user ? user.username.toUpperCase()[0] : <User className="w-4 h-4" />}
                    </div>
                    <span className="truncate">
                        {user ? user.username : <Skeleton className="w-16 h-4 inline-block" />}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <Badge variant={typeConfig?.variant || 'outline'} className="gap-1">
                    <Icon className="w-3 h-3" />
                    {typeConfig?.label || interaction.type}
                </Badge>
            </TableCell>

            <TableCell>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                    {interaction.reference}
                </code>
            </TableCell>

            <TableCell>
                {interaction.mainhand ? (
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                        {interaction.mainhand}
                    </code>
                ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                )}
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-1">
                    <Image
                        src={dimensionConfig.img}
                        alt={dimensionConfig.label}
                        width={24}
                        height={24}
                        className="object-cover rounded-sm"
                    />
                    <code className="text-xs">
                        [{interaction.coordinates.join(', ')}]
                    </code>
                </div>
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">
                        {new Date(interaction.time.replace(' ', 'T') + 'Z').toLocaleString()}
                    </span>
                </div>
            </TableCell>
        </TableRow>
    );
}
