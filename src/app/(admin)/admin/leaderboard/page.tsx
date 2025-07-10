'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Crown, Coins, Target, Clock, TrendingUp, ArrowRight, Medal, Award, Activity, User } from 'lucide-react';
import { useLeaderboards } from '@/hooks/use-admin-data';
import { useUsers } from '@/hooks/use-thorny-user';
import { cn } from '@/lib/utils';

interface LeaderboardsPageProps {
    selectedGuildId: string;
    setSelectedGuildId: (id: string) => void;
}

const leaderboardTypes = [
    {
        id: 'playtime',
        label: 'Playtime',
        icon: Clock,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        hasMonth: true,
        formatValue: (value: number) => {
            const days = Math.floor(value / 86400);
            const hours = Math.floor((value % 86400) / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            if (days > 0) return `${days}d ${hours}h`;
            if (hours > 0) return `${hours}h ${minutes}m`;
            return `${minutes}m`;
        }
    },
    {
        id: 'levels',
        label: 'Levels',
        icon: TrendingUp,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
        hasMonth: false,
        formatValue: (value: number) => `Lv. ${value.toLocaleString()}`
    },
    {
        id: 'currency',
        label: 'Currency',
        icon: Coins,
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        hasMonth: false,
        formatValue: (value: number) => `${value.toLocaleString()}`
    },
    {
        id: 'quests',
        label: 'Quests',
        icon: Target,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        hasMonth: false,
        formatValue: (value: number) => `${value.toLocaleString()}`
    }
];

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1: return <Crown className="h-4 w-4 text-yellow-500" />;
        case 2: return <Medal className="h-4 w-4 text-slate-400" />;
        case 3: return <Award className="h-4 w-4 text-amber-600" />;
        default: return <span className="text-xs font-bold text-muted-foreground">#{rank}</span>;
    }
};

const LeaderboardCard = ({ entry, rank, userData, isUserLoading, currentLeaderboard, onClick }: {
    entry: any;
    rank: number;
    userData: any;
    isUserLoading: boolean;
    currentLeaderboard: any;
    onClick: () => void;
}) => {
    const isTopThree = rank <= 3;

    return (
        <div
            className={cn(
                "group flex items-center gap-3 p-3 border rounded-lg bg-card/50 hover:bg-accent/50 hover:border-primary/20 cursor-pointer transition-all duration-200 hover:shadow-sm",
                isTopThree && "bg-primary/5 border-primary/20"
            )}
            onClick={onClick}
        >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(rank)}
            </div>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <div className={cn(
                    "w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2",
                    userData?.patron
                        ? "border-pink-500 bg-gradient-to-br from-pink-500/20 to-pink-400/10"
                        : "border-primary/10"
                )}>
                    {isUserLoading ? (
                        <Skeleton className="w-8 h-8 rounded-full" />
                    ) : (
                        <span className={cn(
                            "text-sm font-semibold",
                            userData?.patron ? "text-pink-600" : "text-primary"
                        )}>
                            {userData?.username?.slice(0, 2).toUpperCase() || entry.thorny_id.toString().slice(-2)}
                        </span>
                    )}
                </div>

                {/* Rank Badge for Top 3 */}
                {isTopThree && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">{rank}</span>
                    </div>
                )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
                {isUserLoading ? (
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ) : (
                    <>
                        {/* Name and Badges */}
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-foreground truncate">
                                {userData?.whitelist || userData?.username || `Player ${entry.thorny_id}`}
                            </h4>

                            {/* Top Rank Badge */}
                            {isTopThree && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                    Top {rank}
                                </Badge>
                            )}

                            {/* Patron Badge */}
                            {userData?.patron && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
                                    Patron
                                </Badge>
                            )}
                        </div>

                        {/* User Details */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {userData?.role && (
                                <>
                                    <span className="flex items-center gap-1">
                                        <User size={12} />
                                        {userData.role}
                                    </span>
                                    <span>•</span>
                                </>
                            )}

                            {userData?.level && (
                                <>
                                    <span className="flex items-center gap-1">
                                        <TrendingUp size={12} />
                                        Lv. {userData.level}
                                    </span>
                                    <span>•</span>
                                </>
                            )}

                            <span className="truncate">ID: {entry.thorny_id}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Value */}
            <div className="flex-shrink-0 text-right mr-2">
                <div className={cn("font-bold text-sm", currentLeaderboard?.color)}>
                    {currentLeaderboard?.formatValue(entry.value)}
                </div>
                <div className="text-xs text-muted-foreground">
                    Rank #{rank}
                </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
                <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                />
            </div>
        </div>
    );
};

export default function LeaderboardsPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('playtime');
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`;
    });
    const [selectedGuildId, setSelectedGuildId] = useState('611008530077712395');

    const currentLeaderboard = leaderboardTypes.find(lb => lb.id === selectedType);
    const { leaderboard, isLoading: leaderboardLoading } = useLeaderboards(
        selectedGuildId,
        selectedType,
        currentLeaderboard?.hasMonth ? selectedMonth : undefined
    );

    // Extract thorny IDs from leaderboard entries
    const thornyIds = useMemo(() =>
            leaderboard?.map(entry => entry.thorny_id) || [],
        [leaderboard]
    );

    // Fetch user data for all leaderboard entries
    const { users, isLoading: usersLoading } = useUsers(thornyIds);

    // Create a map for quick user lookup
    const userMap = useMemo(() =>
            users.reduce((acc, user) => {
                acc[user.thorny_id] = user;
                return acc;
            }, {} as Record<number, typeof users[0]>),
        [users]
    );

    const isLoading = leaderboardLoading || usersLoading;

    const viewUserProfile = (thornyId: number) => {
        router.push(`/admin/users/${thornyId}`);
    };

    const generateMonthOptions = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 12; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const value = date.toISOString().split('T')[0].substring(0, 8) + '01';
            const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            months.push(<SelectItem key={value} value={value}>{label}</SelectItem>);
        }
        return months;
    };

    return (
        <div className="space-y-4">
            {/* Compact Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Leaderboards</h1>
                    <p className="text-sm text-muted-foreground">Top performing players</p>
                </div>
                <div className="flex gap-2">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {leaderboardTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                    <div className="flex items-center gap-2">
                                        <type.icon className="h-3 w-3" />
                                        {type.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {currentLeaderboard?.hasMonth && (
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>{generateMonthOptions()}</SelectContent>
                        </Select>
                    )}
                </div>
            </div>

            {/* Compact Type Selector */}
            <div className="grid grid-cols-4 gap-2">
                {leaderboardTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "cursor-pointer transition-all p-3",
                            selectedType === type.id
                                ? 'ring-2 ring-primary bg-primary/5'
                                : 'hover:bg-accent'
                        )}
                        onClick={() => setSelectedType(type.id)}
                    >
                        <div className="flex items-center gap-2">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", type.bgColor)}>
                                <type.icon className={cn("h-4 w-4", type.color)} />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{type.label}</p>
                                <p className="text-xs text-muted-foreground">{leaderboard?.length || 0} players</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Leaderboard */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            {currentLeaderboard && (
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", currentLeaderboard.bgColor)}>
                                    <currentLeaderboard.icon className={cn("h-4 w-4", currentLeaderboard.color)} />
                                </div>
                            )}
                            {currentLeaderboard?.label} Rankings
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                            <Trophy className="h-3 w-3 mr-1" />
                            {leaderboard?.length || 0}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    {isLoading ? (
                        <div className="space-y-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-24 mb-1" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>
                    ) : leaderboard?.length > 0 ? (
                        <div className="space-y-1">
                            {leaderboard.map((entry, index) => (
                                <LeaderboardCard
                                    key={entry.thorny_id}
                                    entry={entry}
                                    rank={index + 1}
                                    userData={userMap[entry.thorny_id]}
                                    isUserLoading={usersLoading}
                                    currentLeaderboard={currentLeaderboard}
                                    onClick={() => viewUserProfile(entry.thorny_id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted/20 flex items-center justify-center">
                                <Trophy className="h-8 w-8 opacity-50" />
                            </div>
                            <p className="text-sm text-muted-foreground">No leaderboard data available</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
