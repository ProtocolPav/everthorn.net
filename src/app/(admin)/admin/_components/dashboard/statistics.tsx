import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ServerDailyPlaytime from "@/app/(admin)/admin/_components/dashboard/charts/server-daily-playtime";
import {formatPlaytime} from "@/lib/utils";
import {GuildPlaytime, OnlineUser, ServerStatus} from "@/types/admin";
import ServerMonthlyPlaytime from "@/app/(admin)/admin/_components/dashboard/charts/server-monthly-playtime";
import {ClockCountdown, ChartBar, Minus, TrendUp, TrendDown, Calendar} from "@phosphor-icons/react";
import {Badge} from "@/components/ui/badge";

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
    // Calculate trend percentage
    const calculateTrend = (data: Array<{month: string; total: number}>) => {
        if (data.length < 2) return null;

        const sortedData = [...data].sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
        const currentMonth = sortedData[sortedData.length - 1];
        const previousMonth = sortedData[sortedData.length - 2];

        if (!currentMonth || !previousMonth || previousMonth.total === 0) return null;

        const percentChange = ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100;
        return Math.round(percentChange);
    };

    const trendPercentage = calculateTrend(playtime?.monthly_playtime || []);

    const getTrendIcon = (percentage: number | null) => {
        if (percentage === null) return <Minus />;
        if (percentage > 0) return <TrendUp />;
        if (percentage < 0) return <TrendDown />;
        return <Minus />;
    };

    const getTrendVariant = (percentage: number | null) => {
        if (percentage === null) return "default";
        if (percentage > 0) return "info";
        if (percentage < 0) return "red";
        return "default";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="lg:col-span-2 p-4 bg-card/40">
                <CardHeader className="px-0">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                                <ClockCountdown />
                                Monthly Playtime
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                Compare monthly playtime and see trends
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={'outline'}>
                                <ChartBar />
                                Showing last 12 months
                            </Badge>

                            {trendPercentage !== null && (
                                <Badge variant={getTrendVariant(trendPercentage)}>
                                    {getTrendIcon(trendPercentage)}
                                    {trendPercentage > 0 ? '+' : ''}{trendPercentage}%
                                    vs last month
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-0 grid gap-3">
                    <ServerMonthlyPlaytime data={playtime?.monthly_playtime || []} />

                    {/* Enhanced footer with additional context */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-sm bg-chart-2" />
                                <span>Monthly Playtime</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-sm bg-chart-3 opacity-80" />
                                <span>Predictions</span>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground/70 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                            Live data • Updated {new Date().toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="p-4 bg-card/40">
                <CardHeader className="px-0">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                                <Calendar />
                                Daily Playtime
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                See the current trends and plan accordingly
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={'outline'}>
                                <ChartBar />
                                Showing last 7 days
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-0 grid gap-3">
                    <ServerDailyPlaytime data={playtime?.daily_playtime || []} />

                    {/* Enhanced footer with additional context */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-sm bg-chart-1" />
                                <span>Daily Playtime</span>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground/70 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                            Live data • Updated {new Date().toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                        </div>
                    </div>
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