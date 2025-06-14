'use client';

import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from 'recharts';
import { formatPlaytime } from "@/lib/utils";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface PlaytimeChartProps {
    data: Array<{
        day: string;
        total: number;
        unique_players: number;
        total_sessions: number;
        average_playtime_per_session: number;
    }>;
}

const chartConfig = {
    playtime: {
        label: "Total Playtime",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export default function ServerDailyPlaytime({ data }: PlaytimeChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No chart data available</p>
                <p className="text-xs text-muted-foreground mt-1">Data will appear here once available</p>
            </div>
        );
    }

    // Process data to ensure proper formatting
    const processedData = data.map(item => ({
        day: item.day,
        playtime: Number(item.total) || 0,
        players: item.unique_players,
        sessions: item.total_sessions
    })).reverse();

    // Check if all playtime values are 0
    const hasValidData = processedData.some(item => item.playtime > 0);

    if (!hasValidData) {
        return (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No playtime data to display</p>
                <p className="text-xs text-muted-foreground mt-1">All recorded sessions show zero playtime</p>
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
                accessibilityLayer
                data={processedData}
                margin={{
                    right: 15,
                    top: 15,
                }}
            >
                <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted"
                />

                <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        });
                    }}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    domain={[0, 'dataMax']}
                    allowDecimals={false}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                        const seconds = Number(value);

                        const days = Math.floor(seconds / (24 * 3600));
                        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
                        const minutes = Math.floor((seconds % 3600) / 60);

                        if (days > 0) {
                            return `${days}d`;
                        } else if (hours > 0) {
                            return `${hours}h`;
                        } else if (minutes > 0) {
                            return `${minutes}m`;
                        } else {
                            return "0m";
                        }
                    }}
                />

                <ChartTooltip
                    cursor={{stroke: "var(--muted-foreground)", strokeWidth: 1, strokeDasharray: "3 3"}}
                    content={({active, payload, label}) => {
                        if (!active || !payload || payload.length === 0) return null;

                        const data = payload[0].payload;

                        return (
                            <div
                                className="bg-background/95 backdrop-blur-sm border border-border rounded-md shadow-lg p-3 min-w-[200px]">
                                {/* Compact header with full date */}
                                <div className="pb-2 mb-2 border-b border-border/50">
                                    <p className="font-semibold text-foreground text-xs">
                                        {new Date(label).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>

                                {/* Compact metrics with vertical bars */}
                                <div className="space-y-2">
                                    {/* Total Playtime */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-1 h-4 rounded-sm"
                                                style={{backgroundColor: chartConfig.playtime.color}}
                                            />
                                            <span className="text-xs text-muted-foreground">Total Playtime</span>
                                        </div>
                                        <span
                                            className="font-semibold text-xs"
                                            style={{color: chartConfig.playtime.color}}
                                        >
                                            {formatPlaytime(data.playtime)}
                                        </span>
                                    </div>

                                    {/* Players */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 rounded-sm bg-emerald-500"/>
                                            <span className="text-xs text-muted-foreground">Players</span>
                                        </div>
                                        <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">
                                            {data.players.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Sessions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 rounded-sm bg-violet-500"/>
                                            <span className="text-xs text-muted-foreground">Sessions</span>
                                        </div>
                                        <span className="font-semibold text-xs text-violet-600 dark:text-violet-400">
                                            {data.sessions.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Average per session */}
                                    {data.sessions > 0 && (
                                        <div className="flex items-center justify-between pt-1 border-t border-border/30">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-4 rounded-sm bg-amber-500"/>
                                                <span className="text-xs text-muted-foreground">Avg. per session</span>
                                            </div>
                                            <span className="font-semibold text-xs text-amber-600 dark:text-amber-400">
                                                {formatPlaytime(Math.round(data.playtime / data.sessions))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }}
                />

                <Area
                    dataKey="playtime"
                    type="natural"
                    fill={chartConfig.playtime.color}
                    fillOpacity={0.2}
                    stroke={chartConfig.playtime.color}
                    strokeWidth={2}
                />

            </AreaChart>
        </ChartContainer>
    );
}
