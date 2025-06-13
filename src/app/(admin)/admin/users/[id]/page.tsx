// admin/users/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePlayerPlaytime, usePlayerQuest } from '@/hooks/use-admin-data';
import { Clock, Target, Calendar, ArrowLeft, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {formatPlaytime} from "@/lib/utils";

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const thornyId = parseInt(params.id as string);

    const { playtime, isLoading: playtimeLoading } = usePlayerPlaytime(thornyId);
    const { quest, isLoading: questLoading } = usePlayerQuest(thornyId);

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <User className="h-8 w-8" />
                            Player {thornyId}
                        </h1>
                        <p className="text-muted-foreground">Detailed player statistics and information</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Playtime Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Playtime Statistics
                            </CardTitle>
                            <CardDescription>Player activity and session data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {playtimeLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : playtime ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                            <p className="text-sm text-muted-foreground">Total Playtime</p>
                                            <p className="text-2xl font-bold">{formatPlaytime(playtime.total)}</p>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <p className="text-sm text-muted-foreground">Current Session</p>
                                            <p className="text-lg font-semibold">
                                                {formatDistanceToNow(new Date(playtime.session), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-3 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Recent Daily Activity
                                        </h4>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {playtime.daily?.slice(0, 14).map((day) => (
                                                <div key={day.day} className="flex justify-between items-center p-2 hover:bg-accent rounded">
                                                    <span className="text-sm">{new Date(day.day).toLocaleDateString()}</span>
                                                    <span className="font-medium">{formatPlaytime(day.playtime)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-3">Monthly Summary</h4>
                                        <div className="space-y-2">
                                            {playtime.monthly?.slice(0, 6).map((month) => (
                                                <div key={month.month} className="flex justify-between items-center p-2 hover:bg-accent rounded">
                                                    <span className="text-sm">{new Date(month.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                                                    <span className="font-medium">{formatPlaytime(month.playtime)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No playtime data available</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quest Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Active Quest
                            </CardTitle>
                            <CardDescription>Current quest progress and objectives</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {questLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : quest ? (
                                <div className="space-y-6">
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="font-medium text-lg">Quest #{quest.quest_id}</p>
                                                <Badge variant={quest.status === 'in_progress' ? 'default' : 'secondary'}>
                                                    {quest.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                            <div>
                                                <p>Started: {formatDistanceToNow(new Date(quest.started_on), { addSuffix: true })}</p>
                                            </div>
                                            <div>
                                                <p>Accepted: {formatDistanceToNow(new Date(quest.accepted_on), { addSuffix: true })}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-3">Objectives ({quest.objectives.length})</h4>
                                        <div className="space-y-4">
                                            {quest.objectives.map((objective) => (
                                                <div key={objective.objective_id} className="p-3 border rounded-lg space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">Objective #{objective.objective_id}</span>
                                                        <Badge variant={objective.status === 'completed' ? 'default' : objective.status === 'in_progress' ? 'secondary' : 'destructive'}>
                                                            {objective.status.replace('_', ' ')}
                                                        </Badge>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>Progress</span>
                                                            <span>{objective.completion}%</span>
                                                        </div>
                                                        <Progress value={objective.completion} className="h-2" />
                                                    </div>

                                                    {objective.start && objective.end && (
                                                        <div className="text-xs text-muted-foreground">
                                                            <p>Duration: {formatDistanceToNow(new Date(objective.start), { addSuffix: false })} to {formatDistanceToNow(new Date(objective.end), { addSuffix: false })}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No active quest</p>
                                    <p className="text-sm">This player doesn't have any active quests</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
