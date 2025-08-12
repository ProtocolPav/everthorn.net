'use client';

import { XAxis, YAxis, CartesianGrid, Bar, BarChart, Cell, Rectangle, ResponsiveContainer } from 'recharts';
import { formatPlaytime } from "@/lib/utils";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@/components/ui/chart';
import {Badge} from "@/components/ui/badge";
import {Minus, TrendUp, TrendDown, ChartBar} from "@phosphor-icons/react";

interface MonthlyPlaytimeChartProps {
    data: Array<{
        month: string;
        total: number;
    }>;
}

const chartConfig = {
    actual: {
        label: "Actual Playtime",
        color: "var(--chart-2)",
    },
    predicted: {
        label: "Predicted Playtime",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export default function ServerMonthlyPlaytime({ data }: MonthlyPlaytimeChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No monthly data available</p>
                <p className="text-xs text-muted-foreground mt-1">Monthly playtime data will appear here</p>
            </div>
        );
    }

    // Calculate prediction for current month
    const calculatePrediction = (data: Array<{month: string; total: number}>) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentDay = currentDate.getDate();

        // Find current month data
        const currentMonthData = data.find(item => {
            const itemDate = new Date(item.month);
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
        });

        if (!currentMonthData || currentMonthData.total === 0) return null;

        // Calculate daily average and predict remaining days
        const dailyAverage = currentMonthData.total / currentDay;
        const remainingDays = daysInCurrentMonth - currentDay;
        const predictedRemaining = dailyAverage * remainingDays;

        return {
            currentMonth: currentMonthData.month,
            actual: currentMonthData.total,
            predicted: Math.max(0, predictedRemaining)
        };
    };

    const prediction = calculatePrediction(data);

    // Process data to include predictions - FIX: Keep original values for non-current months
    const processedData = data.map(item => {
        const isCurrentMonth = prediction && item.month === prediction.currentMonth;

        return {
            month: item.month,
            actual: isCurrentMonth ? prediction.actual : Number(item.total) || 0,
            predicted: isCurrentMonth ? prediction.predicted : 0,
            isCurrentMonth
        };
    }).reverse();

    // Check if all playtime values are 0
    const hasValidData = processedData.some(item => item.actual > 0 || item.predicted > 0);

    if (!hasValidData) {
        return (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-border">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No monthly playtime data to display</p>
                <p className="text-xs text-muted-foreground mt-1">All recorded months show zero playtime</p>
            </div>
        );
    }

    const formatTimeAxis = (value: number) => {
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
    };

    return (
        <ResponsiveContainer>
            <BarChart
                accessibilityLayer
                data={processedData}
                margin={{
                    right: 15,
                    top: 15,
                }}
            >
                <defs>
                    <pattern
                        id="diagonalCross"
                        patternUnits="userSpaceOnUse"
                        width="10"
                        height="10"
                    >
                        {/* Background fill */}
                        <rect
                            width="10"
                            height="10"
                            fill={chartConfig.predicted.color}
                            opacity="0.3"
                        />

                        <line
                            x1="0"
                            y1="10"
                            x2="10"
                            y2="0"
                            stroke={chartConfig.predicted.color}
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                        <line
                            x1="-2"
                            y1="2"
                            x2="2"
                            y2="-2"
                            stroke={chartConfig.predicted.color}
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                        <line
                            x1="8"
                            y1="12"
                            x2="12"
                            y2="8"
                            stroke={chartConfig.predicted.color}
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                    </pattern>
                </defs>

                <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted"
                />

                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            year: '2-digit'
                        });
                    }}
                />

                {/*<YAxis*/}
                {/*    tickLine={false}*/}
                {/*    axisLine={false}*/}
                {/*    tickMargin={4}*/}
                {/*    domain={[0, 'dataMax + 259200']}*/}
                {/*    allowDecimals={false}*/}
                {/*    className="text-xs fill-muted-foreground"*/}
                {/*    tickFormatter={formatTimeAxis}*/}
                {/*/>*/}

                <ChartTooltip
                    cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
                    content={({active, payload, label}) => {
                        if (!active || !payload || payload.length === 0) return null;

                        const data = payload[0].payload;
                        const actualValue = data.actual || 0;
                        const predictedValue = data.predicted || 0;
                        const total = actualValue + predictedValue;

                        return (
                            <div className="bg-background/70 backdrop-blur-sm border border-border rounded-md shadow-lg p-3 pt-0 min-w-[200px]">
                                <div className="pb-2 mb-2 border-b border-border/50">
                                    <p className="font-semibold text-foreground text-xs flex gap-1 items-center">
                                        {new Date(label).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                        {data.isCurrentMonth && (
                                            <Badge variant={"info"}>Ongoing</Badge>
                                        )}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {actualValue > 0 && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-1 h-4 rounded-sm"
                                                    style={{backgroundColor: chartConfig.actual.color}}
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {data.isCurrentMonth ? "Current" : "Total"}
                                                </span>
                                            </div>
                                            <span
                                                className="font-semibold text-xs"
                                                style={{color: chartConfig.actual.color}}
                                            >
                                                {formatPlaytime(actualValue)}
                                            </span>
                                        </div>
                                    )}

                                    {predictedValue > 0 && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-1 h-4 rounded-sm"
                                                    style={{backgroundColor: chartConfig.predicted.color}}
                                                />
                                                <span className="text-xs text-muted-foreground">Estimate</span>
                                            </div>
                                            <span
                                                className="font-semibold text-xs"
                                                style={{color: chartConfig.predicted.color}}
                                            >
                                                + {formatPlaytime(predictedValue)}
                                            </span>
                                        </div>
                                    )}

                                    {predictedValue > 0 && (
                                        <div className="flex items-center justify-between pt-1 border-t border-border/50">
                                            <span className="text-xs text-muted-foreground">Predicted Total</span>
                                            <span className="font-semibold text-xs text-foreground">
                                                {formatPlaytime(total)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }}
                />

                <Bar dataKey="actual" stackId="a" fill={chartConfig.actual.color}>
                    {processedData.map((entry, index) => (
                        <Cell
                            key={`cell-actual-${index}`}
                            radius={entry.predicted > 0 ? [0, 0, 8, 8] as any : 8}
                        />
                    ))}
                </Bar>

                <Bar
                    dataKey="predicted"
                    stackId="a"
                    fill={chartConfig.predicted.color}
                    opacity={0.8}
                >
                    {processedData.map((entry, index) => (
                        <Cell
                            key={`cell-predicted-${index}`}
                            fill="url(#diagonalCross)"
                            radius={entry.predicted > 0 ? [8, 8, 0, 0] as any : 0}
                        />
                    ))}
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    );
}
