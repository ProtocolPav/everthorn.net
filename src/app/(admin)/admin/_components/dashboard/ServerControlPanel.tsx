// admin/components/ServerControlPanel.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useServerStatus } from '@/hooks/use-admin-data';
import { Server, Play, Square, RotateCcw, Database, MessageSquare, Gift, UserX, UserPlus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export default function ServerControlPanel() {
    const { status, isLoading } = useServerStatus();
    const [gamertag, setGamertag] = useState('');
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const executeCommand = async (endpoint: string, method: 'GET' | 'POST' = 'GET') => {
        setIsExecuting(true);
        try {
            const response = await fetch(`/amethyst/${endpoint}`, { method });
            if (response.ok) {
                toast.success('Command executed successfully');
            } else {
                toast.error('Command failed');
            }
        } catch (error) {
            toast.error('Network error');
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Server Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        Server Status
                    </CardTitle>
                    <CardDescription>Current server information and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : status ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge variant={status.server_online ? "default" : "destructive"}>
                                    {status.server_online ? 'Online' : 'Offline'}
                                </Badge>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Uptime</p>
                                <p className="font-medium">{status.uptime}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Last Backup</p>
                                <p className="font-medium">{status.last_backup}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Update Available</p>
                                <Badge variant={status.update ? "destructive" : "secondary"}>
                                    {status.update ? 'Yes' : 'No'}
                                </Badge>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            Unable to load server status
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Server Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>Server Controls</CardTitle>
                    <CardDescription>Manage server operations and maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={() => executeCommand('server/start')}
                            disabled={isExecuting}
                            className="flex items-center gap-2"
                            variant="default"
                        >
                            <Play className="h-4 w-4" />
                            Start Server
                        </Button>
                        <Button
                            onClick={() => executeCommand('server/stop')}
                            disabled={isExecuting}
                            className="flex items-center gap-2"
                            variant="destructive"
                        >
                            <Square className="h-4 w-4" />
                            Stop Server
                        </Button>
                        <Button
                            onClick={() => executeCommand('server/preempt')}
                            disabled={isExecuting}
                            className="flex items-center gap-2"
                            variant="secondary"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Preempt
                        </Button>
                        <Button
                            onClick={() => executeCommand('server/backup')}
                            disabled={isExecuting}
                            className="flex items-center gap-2"
                            variant="outline"
                        >
                            <Database className="h-4 w-4" />
                            Backup
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Player Management */}
            <Card>
                <CardHeader>
                    <CardTitle>Player Management</CardTitle>
                    <CardDescription>Manage players and whitelist access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="gamertag">Gamertag</Label>
                            <Input
                                id="gamertag"
                                value={gamertag}
                                onChange={(e) => setGamertag(e.target.value)}
                                placeholder="Enter gamertag"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={() => executeCommand(`kick/${gamertag}`)}
                            disabled={!gamertag || isExecuting}
                            className="flex items-center gap-2"
                            variant="destructive"
                        >
                            <UserX className="h-4 w-4" />
                            Kick Player
                        </Button>
                        <Button
                            onClick={() => executeCommand(`whitelist/add/${gamertag}`)}
                            disabled={!gamertag || isExecuting}
                            className="flex items-center gap-2"
                            variant="default"
                        >
                            <UserPlus className="h-4 w-4" />
                            Add to Whitelist
                        </Button>
                        <Button
                            onClick={() => executeCommand(`whitelist/remove/${gamertag}`)}
                            disabled={!gamertag || isExecuting}
                            className="flex items-center gap-2"
                            variant="outline"
                        >
                            <UserMinus className="h-4 w-4" />
                            Remove from Whitelist
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Item Management */}
            <Card>
                <CardHeader>
                    <CardTitle>Item Management</CardTitle>
                    <CardDescription>Give or clear items from players</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="item-gamertag">Gamertag</Label>
                            <Input
                                id="item-gamertag"
                                value={gamertag}
                                onChange={(e) => setGamertag(e.target.value)}
                                placeholder="Enter gamertag"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="item">Item</Label>
                            <Input
                                id="item"
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                                placeholder="Item name/ID"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Quantity"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => executeCommand(`commands/give/${gamertag}/${item}/${amount}`)}
                            disabled={!gamertag || !item || !amount || isExecuting}
                            className="flex items-center gap-2"
                            variant="default"
                        >
                            <Gift className="h-4 w-4" />
                            Give Item
                        </Button>
                        <Button
                            onClick={() => executeCommand(`commands/clear/${gamertag}/${item}/${amount}`)}
                            disabled={!gamertag || !item || !amount || isExecuting}
                            className="flex items-center gap-2"
                            variant="destructive"
                        >
                            Clear Item
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Communication */}
            <Card>
                <CardHeader>
                    <CardTitle>Server Communication</CardTitle>
                    <CardDescription>Send messages and announcements to players</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Input
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter message"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => executeCommand('commands/announce', 'POST')}
                            disabled={!message || isExecuting}
                            className="flex items-center gap-2"
                            variant="default"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Announce
                        </Button>
                        <Button
                            onClick={() => executeCommand('commands/message', 'POST')}
                            disabled={!message || isExecuting}
                            className="flex items-center gap-2"
                            variant="outline"
                        >
                            Send Message
                        </Button>
                        <Button
                            onClick={() => executeCommand('commands/message/schedule', 'POST')}
                            disabled={!message || isExecuting}
                            className="flex items-center gap-2"
                            variant="secondary"
                        >
                            Schedule Message
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
