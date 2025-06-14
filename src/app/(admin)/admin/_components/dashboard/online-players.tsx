// admin/_components/dashboard/OnlinePlayersList.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Users, Gamepad2 } from 'lucide-react';
import { OnlineUser } from '@/types/admin';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";

interface OnlinePlayersListProps {
    players: OnlineUser[];
    playersLoading: boolean;
}

const parseUTCTimestamp = (utcTimestamp: string) => {
    const utcString = utcTimestamp.includes('Z') ? utcTimestamp : utcTimestamp + 'Z';
    return new Date(utcString);
};

export default function OnlinePlayersList({ players, playersLoading }: OnlinePlayersListProps) {
    const router = useRouter();

    const viewUserProfile = (thornyId: number) => {
        router.push(`/admin/users/${thornyId}`);
    };

    // Loading state
    if (playersLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center h-72 justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-20 mb-1" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-4" />
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (!players || players.length === 0) {
        return (
            <div className="h-72 text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No players online</p>
                <p className="text-xs">Players will appear here when they join</p>
            </div>
        );
    }

    // Main content
    return (
        <div className="space-y-2 h-72">
            {players.slice(0, 8).map((player) => (
                <div
                    key={player.thorny_id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => viewUserProfile(player.thorny_id)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium">
                                {player.thorny_id.toString().slice(-2)}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Player {player.thorny_id}</p>
                            <p className="text-xs text-muted-foreground">
                                Session: {formatDistanceToNow(parseUTCTimestamp(player.session), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4 text-green-500" />
                    </div>
                </div>
            ))}

            {/* Show more indicator */}
            {players.length > 8 && (
                <div className="text-center pt-3 border-t border-border/30">
                    <p className="text-xs text-muted-foreground">
                        +{players.length - 8} more players online
                    </p>
                </div>
            )}
        </div>
    );
}
