import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ServerDailyPlaytime from "@/app/(admin)/admin/_components/dashboard/charts/server-daily-playtime";
import {formatPlaytime} from "@/lib/utils";
import {GuildPlaytime, OnlineUser, ServerStatus} from "@/types/admin";
import ServerMonthlyPlaytime from "@/app/(admin)/admin/_components/dashboard/charts/server-monthly-playtime";

interface Props {
    playtime?: GuildPlaytime;
    playtimeLoading: boolean;
    players: OnlineUser[];
    playersLoading: boolean;
    status?: ServerStatus;
    statusLoading: boolean;
}

export default function Statistics({
   playtime,
   playtimeLoading,
   playersLoading,
   players,
   statusLoading,
   status
}: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={'col-span-2 p-4'}>
                <CardHeader className={'px-0'}>
                    <CardTitle>Monthly Playtime</CardTitle>
                    <CardDescription>Player activity over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className={'px-0'}>
                    <ServerMonthlyPlaytime data={playtime?.monthly_playtime || []} />
                </CardContent>
            </Card>

            <Card className={'p-4'}>
                <CardHeader className={'px-0'}>
                    <CardTitle>Daily Playtime Trend</CardTitle>
                    <CardDescription>Player activity over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent className={'px-0'}>
                    <ServerDailyPlaytime data={playtime?.daily_playtime || []} />
                </CardContent>
            </Card>

            <Card className={'p-4'}>
                <CardHeader className={'px-0'}>
                    <CardTitle>Weekly Statistics</CardTitle>
                    <CardDescription>Recent weekly performance</CardDescription>
                </CardHeader>
                <CardContent className={'px-0'}>
                    <div className="space-y-4">
                        {playtime?.weekly_playtime?.slice(0, 3).map((week, index) => (
                            <div key={week.week} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">Week {week.week}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {week.unique_players} players, {week.total_sessions} sessions
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{formatPlaytime(week.total)}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatPlaytime(week.average_playtime_per_session)} avg
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}