// admin/_components/dashboard/OnlinePlayersChart.tsx
'use client';

import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartConfig = {
    players: {
        label: "Online Players",
        color: "var(--chart-2)",
    },
};

interface Props {
    data: Array<{
        time: string;
        players: number;
        hour: number;
    }>;
}

export default function OnlinePlayersChart({ data }: Props) {
    return (
        <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart
                accessibilityLayer
                data={data}
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
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            hour12: true
                        });
                    }}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    width={40}
                    domain={[0, 'auto']}
                    allowDecimals={false}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => `${value}`}
                />

                <ChartTooltip
                    cursor={{ fill: 'var(--muted)', opacity: 0.7 }}
                    content={({active, payload, label}) => {
                        if (!active || !payload || payload.length === 0) return null;

                        const data = payload[0].payload;

                        return (
                            <div className="bg-background/70 backdrop-blur-sm border border-border rounded-md shadow-lg p-3 pt-0 min-w-[200px]">
                                {/* Header with time only */}
                                <div className="pb-2 mb-2 border-b border-border/50">
                                    <p className="font-semibold text-foreground text-xs">
                                        {new Date(label).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>

                                {/* Player count */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-1 h-4 rounded-sm"
                                                style={{backgroundColor: chartConfig.players.color}}
                                            />
                                            <span className="text-xs text-muted-foreground">Online Players</span>
                                        </div>
                                        <span
                                            className="font-semibold text-xs"
                                            style={{color: chartConfig.players.color}}
                                        >
                                            {data.players}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />

                <Area
                    dataKey="players"
                    type="step"
                    fill={chartConfig.players.color}
                    fillOpacity={0.2}
                    stroke={chartConfig.players.color}
                    strokeWidth={2}
                />

            </AreaChart>
        </ChartContainer>
    );
}
