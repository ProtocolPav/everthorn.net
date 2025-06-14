'use client';

import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from 'recharts';
import { formatPlaytime } from "@/lib/utils";
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface WeeklyPlaytimeChartProps {
    data: Array<{
        week: number;
        total: number;
        unique_players: number;
        total_sessions: number;
        average_playtime_per_session: number;
    }>;
}

const chartConfig = {
    playtime: {
        label: "Weekly Playtime",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export default function ServerWeeklyPlaytime({ data }: WeeklyPlaytimeChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No weekly data available</p>
                <p className="text-xs text-muted-foreground mt-1">Weekly playtime data will appear here</p>
            </div>
        );
    }

    // Process data to ensure proper formatting
    const processedData = data.map(item => ({
        week: item.week,
        playtime: Number(item.total) || 0,
        players: item.unique_players,
        sessions: item.total_sessions,
        avgSession: item.average_playtime_per_session
    })).reverse();

    // Check if all playtime values are 0
    const hasValidData = processedData.some(item => item.playtime > 0);

    if (!hasValidData) {
        return (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No weekly playtime data to display</p>
                <p className="text-xs text-muted-foreground mt-1">All recorded weeks show zero playtime</p>
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-72 w-full">
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
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => `Week ${value}`}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    width={80}
                    domain={[0, 'auto']}
                    allowDecimals={false}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => formatPlaytime(value)}
                />

                <ChartTooltip
                    cursor={{ fill: 'var(--muted)', opacity: 0.7 }}
                    content={({active, payload, label}) => {
                        if (!active || !payload || payload.length === 0) return null;

                        const data = payload[0].payload;

                        // Calculate week date range using proper ISO week format
                        const getWeekDateRange = (year: number, week: number) => {
                            // ISO week starts on Monday and week 1 contains January 4th
                            const jan4 = new Date(year, 0, 4); // January 4th
                            const jan4Day = jan4.getDay(); // 0 = Sunday, 1 = Monday, etc.

                            // Find the Monday of week 1 (the Monday of the week containing Jan 4th)
                            const week1Monday = new Date(jan4);
                            week1Monday.setDate(jan4.getDate() - (jan4Day === 0 ? 6 : jan4Day - 1));

                            // Calculate the start date of the target week
                            const startDate = new Date(week1Monday);
                            startDate.setDate(week1Monday.getDate() + (week - 1) * 7);

                            // End date is 6 days after start date
                            const endDate = new Date(startDate);
                            endDate.setDate(startDate.getDate() + 6);

                            return {
                                start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            };
                        };


                        const currentYear = new Date().getFullYear();
                        const weekRange = getWeekDateRange(currentYear, data.week);

                        return (
                            <div
                                className="bg-background/70 backdrop-blur-sm border border-border rounded-md shadow-lg p-3 pt-0 min-w-[200px]">
                                {/* Compact header with week number and date range */}
                                <div className="pb-2 mb-2 border-b border-border/50">
                                    <p className="font-semibold text-foreground text-xs">
                                        Week {label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {weekRange.start} - {weekRange.end}, {currentYear}
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
                                            <span className="text-xs text-muted-foreground">Unique Players</span>
                                        </div>
                                        <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">
                            {data.players.toLocaleString()}
                        </span>
                                    </div>

                                    {/* Sessions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 rounded-sm bg-violet-500"/>
                                            <span className="text-xs text-muted-foreground">Total Sessions</span>
                                        </div>
                                        <span className="font-semibold text-xs text-violet-600 dark:text-violet-400">
                            {data.sessions.toLocaleString()}
                        </span>
                                    </div>

                                    {/* Average per session */}
                                    <div className="flex items-center justify-between pt-1 border-t border-border/30">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 rounded-sm bg-amber-500"/>
                                            <span className="text-xs text-muted-foreground">Avg. per session</span>
                                        </div>
                                        <span className="font-semibold text-xs text-amber-600 dark:text-amber-400">
                            {formatPlaytime(data.avgSession)}
                        </span>
                                    </div>
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
