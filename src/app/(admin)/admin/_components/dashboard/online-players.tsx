import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, ExternalLink, Gamepad2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDistanceToNow} from "date-fns";
import {parseUTCTimestamp} from "@/lib/utils";
import {GuildPlaytime, OnlineUser, ServerStatus} from "@/types/admin";
import {useRouter} from "next/navigation";

interface Props {
    playtime?: GuildPlaytime;
    playtimeLoading: boolean;
    players: OnlineUser[];
    playersLoading: boolean;
    status?: ServerStatus;
    statusLoading: boolean;
}

export default function OnlinePlayers({
    playtime,
    playtimeLoading,
    playersLoading,
    players,
    statusLoading,
    status
}: Props) {
    const router = useRouter();

    const viewUserProfile = (thornyId: number) => {
        router.push(`/admin/users/${thornyId}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Online Players ({players?.length || 0})
                </CardTitle>
                <CardDescription>Currently active players in the guild</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players?.map((player) => (
                        <div
                            key={player.thorny_id}
                            className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => viewUserProfile(player.thorny_id)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Player ID {player.thorny_id}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Discord: {player.discord_id}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        <Gamepad2 className="h-3 w-3 mr-1" />
                                        Online
                                    </Badge>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Connected: {formatDistanceToNow(new Date(parseUTCTimestamp(player.session)), { addSuffix: true })}
                            </p>
                        </div>
                    ))}
                </div>
                {players?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No players currently online
                    </div>
                )}
            </CardContent>
        </Card>
    )
}