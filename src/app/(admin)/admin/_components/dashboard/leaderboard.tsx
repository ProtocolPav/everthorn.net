import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ExternalLink, TrendingUp} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatPlaytime} from "@/lib/utils";
import {useState} from "react";
import {useLeaderboard} from "@/hooks/use-admin-data";
import {useRouter} from "next/navigation";

interface Props {
    selectedGuildId: string
}

export default function Leaderboard({ selectedGuildId }: Props) {
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`;
    });

    const { leaderboard, isLoading: leaderboardLoading } = useLeaderboard(selectedGuildId, selectedMonth);

    const router = useRouter();

    const viewUserProfile = (thornyId: number) => {
        router.push(`/admin/users/${thornyId}`);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Playtime Leaderboard
                        </CardTitle>
                        <CardDescription>Top players by playtime</CardDescription>
                    </div>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {(() => {
                                const months = [];
                                const currentDate = new Date();

                                for (let i = 0; i < 12; i++) {
                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                                    const value = date.toISOString().split('T')[0].substring(0, 8) + '01';
                                    const label = date.toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    });

                                    months.push(
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    );
                                }

                                return months;
                            })()}
                        </SelectContent>
                    </Select>

                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {leaderboard?.map((entry, index) => (
                        <div
                            key={entry.thorny_id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => viewUserProfile(entry.thorny_id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-medium">Player {entry.thorny_id}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Discord: {entry.discord_id}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="font-bold">{formatPlaytime(entry.value)}</p>
                                    <p className="text-sm text-muted-foreground">playtime</p>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    ))}
                </div>
                {leaderboard?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No leaderboard data available for this month
                    </div>
                )}
            </CardContent>
        </Card>
    )
}