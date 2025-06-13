// admin/components/PlaytimeChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {formatPlaytime} from "@/lib/utils";

interface PlaytimeChartProps {
    data: Array<{
        day: string;
        total: number;
        unique_players: number;
        total_sessions: number;
        average_playtime_per_session: number;
    }>;
}

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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-popover border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
                    <div className="border-b border-border pb-2 mb-3">
                        <p className="font-medium text-popover-foreground">
                            {new Date(label).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-muted-foreground">Total Playtime</span>
                            </div>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{formatPlaytime(data.playtime)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-muted-foreground">Players</span>
                            </div>
                            <span className="font-medium text-green-600 dark:text-green-400">{data.players}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span className="text-sm text-muted-foreground">Sessions</span>
                            </div>
                            <span className="font-medium text-purple-600 dark:text-purple-400">{data.sessions}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={"h-72 w-full"}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={processedData}
                    margin={{ top: 10, right: 10 }}
                >
                    <defs>
                        <linearGradient id="playtimeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted-foreground/20"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="day"
                        className="text-muted-foreground"
                        tick={{
                            fontSize: 11,
                            fontWeight: 500
                        }}
                        tickLine={{ className: "stroke-muted-foreground/30" }}
                        axisLine={{ className: "stroke-muted-foreground/30" }}
                        tickFormatter={(value) => {
                            try {
                                return new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                });
                            } catch {
                                return value;
                            }
                        }}
                        interval="preserveStartEnd"
                    />

                    <YAxis
                        className="text-muted-foreground"
                        tick={{
                            fontSize: 11,
                            fontWeight: 500
                        }}
                        tickLine={{ className: "stroke-muted-foreground/30" }}
                        axisLine={{ className: "stroke-muted-foreground/30" }}
                        tickFormatter={(value) => {
                            if (value === 0) return '0';
                            const hours = Math.floor(value / 3600);
                            if (hours < 1) return `${Math.floor(value / 60)}m`;
                            if (hours < 24) return `${hours}h`;
                            return `${Math.floor(hours / 24)}d`;
                        }}
                        domain={['dataMin', 'dataMax']}
                        width={60}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="playtime"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#playtimeGradient)"
                        dot={{
                            fill: '#3b82f6',
                            strokeWidth: 2,
                            r: 4,
                            stroke: '#ffffff'
                        }}
                        activeDot={{
                            r: 6,
                            fill: '#3b82f6',
                            stroke: '#ffffff',
                            strokeWidth: 2
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
