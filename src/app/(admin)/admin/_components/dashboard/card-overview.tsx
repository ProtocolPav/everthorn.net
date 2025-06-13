import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, Clock, Server, Users} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {formatPlaytime} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {GuildPlaytime, OnlineUser, ServerStatus} from "@/types/admin";

interface Props {
    playtime?: GuildPlaytime;
    playtimeLoading: boolean;
    players: OnlineUser[];
    playersLoading: boolean;
    status?: ServerStatus;
    statusLoading: boolean;
}

export default function CardOverview({
    playtime,
    playtimeLoading,
    playersLoading,
    players,
    statusLoading,
    status
}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Card className={'p-4'}>
                <CardHeader className="flex flex-row items-center justify-between px-0">
                    <CardTitle className="text-sm font-medium">Total Playtime</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className={'px-0'}>
                    <div className="text-2xl font-bold">
                        {playtimeLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            formatPlaytime(playtime?.total_playtime || 0)
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        That's {Math.round((playtime?.total_playtime || 0) / 3600)} hours
                    </p>
                </CardContent>
            </Card>

            <Card className={'p-4'}>
                <CardHeader className="flex flex-row items-center justify-between px-0">
                    <CardTitle className="text-sm font-medium">Unique Players</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className={'px-0'}>
                    <div className="text-2xl font-bold">
                        {playtimeLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            playtime?.total_unique_players?.toLocaleString() || '0'
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Total registered players
                    </p>
                </CardContent>
            </Card>

            <Card className={'p-4'}>
                <CardHeader className="flex flex-row items-center justify-between px-0">
                    <CardTitle className="text-sm font-medium">Online Now</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className={'px-0'}>
                    <div className="text-2xl font-bold">
                        {playersLoading ? (
                            <Skeleton className="h-8 w-8" />
                        ) : (
                            players?.length || '0'
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Currently active players
                    </p>
                </CardContent>
            </Card>

            <Card className={'p-4'}>
                <CardHeader className="flex flex-row items-center justify-between px-0">
                    <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                    <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className={'px-0'}>
                    <div className="flex items-center gap-2">
                        {statusLoading ? (
                            <Skeleton className="h-5 w-16" />
                        ) : (
                            <Badge variant={status?.server_online ? "default" : "destructive"}>
                                {status?.server_online ? 'Online' : 'Offline'}
                            </Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {statusLoading ? (
                            <Skeleton className="h-3 w-20" />
                        ) : (
                            status?.uptime ? `Uptime: ${status.uptime}` : 'Server status'
                        )}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}