// admin/components/CompactBedrockConsole.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
    Server, Play, Square, RotateCcw, Database, MessageSquare, Gift, UserX, UserPlus,
    Terminal, Settings, Shield, Zap, Clock, FileText, Activity, Download, Upload,
    Trash2, Users, Package, Cpu, HardDrive, Wifi, RefreshCw, Sun, CloudRain,
    Smartphone, Gamepad2, Globe, Eye, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface BedrockMetrics {
    tps: number;
    cpuUsage: number;
    memoryUsage: number;
    onlinePlayers: number;
    maxPlayers: number;
    chunks: number;
    entities: number;
    version: string;
    protocolVersion: number;
    allowlistEnabled: boolean;
    cheatsEnabled: boolean;
}

// Mock Bedrock-specific data
const mockMetrics: BedrockMetrics = {
    tps: 19.2,
    cpuUsage: 34,
    memoryUsage: 58,
    onlinePlayers: 5,
    maxPlayers: 20,
    chunks: 892,
    entities: 167,
    version: '1.21.51',
    protocolVersion: 671,
    allowlistEnabled: true,
    cheatsEnabled: false
};

const mockLogs = [
    'INFO: Server started on 0.0.0.0:19132',
    'INFO: IPv4 supported, port: 19132',
    'INFO: IPv6 supported, port: 19133',
    'INFO: Player connected: Steve[/127.0.0.1:52847]',
    'WARN: Player movement validation failed for Alex'
];

export default function CompactBedrockConsole() {
    const [metrics, setMetrics] = useState<BedrockMetrics>(mockMetrics);
    const [logs, setLogs] = useState<string[]>(mockLogs);
    const [activeTab, setActiveTab] = useState('control');
    const [isLoading, setIsLoading] = useState(false);
    const [commandInput, setCommandInput] = useState('');

    // Form states
    const [gamertag, setGamertag] = useState('');
    const [item, setItem] = useState('minecraft:diamond');
    const [amount, setAmount] = useState('64');
    const [message, setMessage] = useState('');
    const [packFile, setPackFile] = useState('');

    // Server property states
    const [serverName, setServerName] = useState('My Bedrock Server');
    const [gamemode, setGamemode] = useState('survival');
    const [difficulty, setDifficulty] = useState('normal');
    const [maxPlayers, setMaxPlayers] = useState(20);
    const [viewDistance, setViewDistance] = useState([32]);
    const [allowCheats, setAllowCheats] = useState(false);
    const [allowList, setAllowList] = useState(true);
    const [onlineMode, setOnlineMode] = useState(true);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                tps: Math.max(15, Math.min(20, prev.tps + (Math.random() - 0.5) * 0.3)),
                cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 5)),
                memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 3)),
                entities: Math.max(100, Math.min(300, prev.entities + Math.floor((Math.random() - 0.5) * 10)))
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const executeCommand = async (command: string, data?: any) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newLog = `INFO: Executed ${command}${data ? ` - ${JSON.stringify(data)}` : ''}`;
        setLogs(prev => [...prev.slice(-9), newLog]);

        toast.success('Command executed successfully');
        setIsLoading(false);
    };

    const sendConsoleCommand = async () => {
        if (!commandInput.trim()) return;
        await executeCommand('console', { command: commandInput });
        setCommandInput('');
    };

    return (
        <div className="space-y-4 max-w-7xl mx-auto p-4">

            {/* Compact Header with Live Metrics */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Bedrock Console</h1>
                    <p className="text-sm text-muted-foreground">v{metrics.version} • Protocol {metrics.protocolVersion}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={metrics.tps > 18 ? "default" : "destructive"}>
                        {metrics.tps.toFixed(1)} TPS
                    </Badge>
                    <Badge variant={metrics.onlinePlayers > 0 ? "default" : "secondary"}>
                        {metrics.onlinePlayers}/{metrics.maxPlayers} Players
                    </Badge>
                </div>
            </div>

            {/* Compact Metrics Cards */}
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">CPU</p>
                            <p className="text-sm font-bold">{metrics.cpuUsage}%</p>
                        </div>
                        <Cpu className="h-3 w-3 text-blue-500" />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Memory</p>
                            <p className="text-sm font-bold">{metrics.memoryUsage}%</p>
                        </div>
                        <HardDrive className="h-3 w-3 text-green-500" />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Chunks</p>
                            <p className="text-sm font-bold">{metrics.chunks}</p>
                        </div>
                        <Package className="h-3 w-3 text-orange-500" />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Entities</p>
                            <p className="text-sm font-bold">{metrics.entities}</p>
                        </div>
                        <Activity className="h-3 w-3 text-purple-500" />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Allowlist</p>
                            <p className="text-sm font-bold">{metrics.allowlistEnabled ? 'On' : 'Off'}</p>
                        </div>
                        <Shield className={`h-3 w-3 ${metrics.allowlistEnabled ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Cheats</p>
                            <p className="text-sm font-bold">{metrics.cheatsEnabled ? 'On' : 'Off'}</p>
                        </div>
                        <Zap className={`h-3 w-3 ${metrics.cheatsEnabled ? 'text-yellow-500' : 'text-gray-400'}`} />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Xbox Live</p>
                            <p className="text-sm font-bold">Auth</p>
                        </div>
                        <Smartphone className="h-3 w-3 text-cyan-500" />
                    </div>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20 h-16">
                    <div className="p-2 h-full flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Server</p>
                            <p className="text-sm font-bold">Online</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            <Server className="h-3 w-3 text-teal-500" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Console Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                {/* Console Logs - Compact */}
                <Card className="lg:col-span-3 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                Console
                            </CardTitle>
                            <div className="flex gap-1">
                                <Button size="sm" variant="outline" onClick={() => executeCommand('server-start')}>
                                    <Play className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => executeCommand('server-restart')}>
                                    <RotateCcw className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => executeCommand('server-stop')}>
                                    <Square className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <ScrollArea className="h-[200px] w-full bg-slate-900/90 dark:bg-black/50 rounded border p-3 font-mono text-xs">
                            {logs.map((log, index) => (
                                <div key={index} className="text-green-400 mb-1">
                                    [19:32:{(index + 10).toString().padStart(2, '0')}] {log}
                                </div>
                            ))}
                        </ScrollArea>
                        <div className="mt-2 flex gap-2">
                            <Input
                                value={commandInput}
                                onChange={(e) => setCommandInput(e.target.value)}
                                placeholder="Enter command..."
                                className="text-xs font-mono"
                                onKeyPress={(e) => e.key === 'Enter' && sendConsoleCommand()}
                            />
                            <Button size="sm" onClick={sendConsoleCommand} disabled={isLoading}>
                                Send
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions - Compact */}
                <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                        <Button
                            onClick={() => executeCommand('save-world')}
                            disabled={isLoading}
                            className="w-full h-8 text-xs"
                            size="sm"
                        >
                            <Database className="h-3 w-3 mr-1" />
                            Save World
                        </Button>
                        <Button
                            onClick={() => executeCommand('reload-packs')}
                            disabled={isLoading}
                            className="w-full h-8 text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Package className="h-3 w-3 mr-1" />
                            Reload Packs
                        </Button>
                        <Button
                            onClick={() => executeCommand('clear-cache')}
                            disabled={isLoading}
                            className="w-full h-8 text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Clear Cache
                        </Button>
                        <Button
                            onClick={() => executeCommand('force-backup')}
                            disabled={isLoading}
                            className="w-full h-8 text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Download className="h-3 w-3 mr-1" />
                            Force Backup
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Compact Management Tabs */}
            <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-5 h-8">
                            <TabsTrigger value="control" className="text-xs">Control</TabsTrigger>
                            <TabsTrigger value="players" className="text-xs">Players</TabsTrigger>
                            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                            <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
                            <TabsTrigger value="automation" className="text-xs">Auto</TabsTrigger>
                        </TabsList>

                        <TabsContent value="control" className="mt-4 space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div className="space-y-1">
                                    <Label className="text-xs">Gamertag</Label>
                                    <Input
                                        value={gamertag}
                                        onChange={(e) => setGamertag(e.target.value)}
                                        placeholder="Xbox gamertag"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Item</Label>
                                    <Input
                                        value={item}
                                        onChange={(e) => setItem(e.target.value)}
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Amount</Label>
                                    <Input
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Action</Label>
                                    <Button
                                        onClick={() => executeCommand('give-item', { gamertag, item, amount })}
                                        disabled={!gamertag || !item || isLoading}
                                        className="w-full h-8 text-xs"
                                        size="sm"
                                    >
                                        <Gift className="h-3 w-3 mr-1" />
                                        Give
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                <Button
                                    onClick={() => executeCommand('kick-player', { gamertag })}
                                    disabled={!gamertag || isLoading}
                                    variant="destructive"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <UserX className="h-3 w-3 mr-1" />
                                    Kick
                                </Button>
                                <Button
                                    onClick={() => executeCommand('allowlist-add', { gamertag })}
                                    disabled={!gamertag || isLoading}
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Allow
                                </Button>
                                <Button
                                    onClick={() => executeCommand('op-player', { gamertag })}
                                    disabled={!gamertag || isLoading}
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Zap className="h-3 w-3 mr-1" />
                                    OP
                                </Button>
                                <Button
                                    onClick={() => executeCommand('weather-clear')}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Sun className="h-3 w-3 mr-1" />
                                    Clear
                                </Button>
                                <Button
                                    onClick={() => executeCommand('weather-rain')}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <CloudRain className="h-3 w-3 mr-1" />
                                    Rain
                                </Button>
                                <Button
                                    onClick={() => executeCommand('time-day')}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Clock className="h-3 w-3 mr-1" />
                                    Day
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="players" className="mt-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Player Management</Label>
                                    <div className="space-y-1">
                                        <Button
                                            onClick={() => executeCommand('list-players')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-8 text-xs"
                                            size="sm"
                                        >
                                            <Users className="h-3 w-3 mr-1" />
                                            List Online Players
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('allowlist-list')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-8 text-xs"
                                            size="sm"
                                        >
                                            <Shield className="h-3 w-3 mr-1" />
                                            View Allowlist
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('allowlist-reload')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-8 text-xs"
                                            size="sm"
                                        >
                                            <RefreshCw className="h-3 w-3 mr-1" />
                                            Reload Allowlist
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Xbox Live Integration</Label>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                                            <span>Online Mode:</span>
                                            <Badge variant={onlineMode ? "default" : "secondary"}>
                                                {onlineMode ? 'Enabled' : 'Disabled'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                                            <span>Xbox Auth:</span>
                                            <Badge variant="default">Active</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Security Settings</Label>
                                    <div className="space-y-1">
                                        <Button
                                            onClick={() => executeCommand('toggle-allowlist')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-8 text-xs"
                                            size="sm"
                                        >
                                            <Shield className="h-3 w-3 mr-1" />
                                            Toggle Allowlist
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('validate-players')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-8 text-xs"
                                            size="sm"
                                        >
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Validate Players
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="content" className="mt-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Behavior & Resource Packs</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            onClick={() => executeCommand('reload-behavior-packs')}
                                            disabled={isLoading}
                                            className="h-8 text-xs"
                                            size="sm"
                                        >
                                            <Package className="h-3 w-3 mr-1" />
                                            Reload BP
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('reload-resource-packs')}
                                            disabled={isLoading}
                                            className="h-8 text-xs"
                                            size="sm"
                                        >
                                            <Gamepad2 className="h-3 w-3 mr-1" />
                                            Reload RP
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('list-packs')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="h-8 text-xs"
                                            size="sm"
                                        >
                                            <FileText className="h-3 w-3 mr-1" />
                                            List Packs
                                        </Button>
                                        <Button
                                            onClick={() => executeCommand('validate-packs')}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="h-8 text-xs"
                                            size="sm"
                                        >
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Validate
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Content Import</Label>
                                    <div className="space-y-2">
                                        <Input
                                            value={packFile}
                                            onChange={(e) => setPackFile(e.target.value)}
                                            placeholder="Pack file name (.mcpack/.mcworld)"
                                            className="h-8 text-xs"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                onClick={() => executeCommand('import-world', { file: packFile })}
                                                disabled={!packFile || isLoading}
                                                className="h-8 text-xs"
                                                size="sm"
                                            >
                                                <Download className="h-3 w-3 mr-1" />
                                                Import World
                                            </Button>
                                            <Button
                                                onClick={() => executeCommand('import-pack', { file: packFile })}
                                                disabled={!packFile || isLoading}
                                                className="h-8 text-xs"
                                                size="sm"
                                            >
                                                <Upload className="h-3 w-3 mr-1" />
                                                Import Pack
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="mt-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Core Settings</Label>
                                    <div className="space-y-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Server Name</Label>
                                            <Input
                                                value={serverName}
                                                onChange={(e) => setServerName(e.target.value)}
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Max Players</Label>
                                            <Input
                                                value={maxPlayers}
                                                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                                                type="number"
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Gamemode</Label>
                                            <Select value={gamemode} onValueChange={setGamemode}>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="survival">Survival</SelectItem>
                                                    <SelectItem value="creative">Creative</SelectItem>
                                                    <SelectItem value="adventure">Adventure</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Performance</Label>
                                    <div className="space-y-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">View Distance: {viewDistance[0]}</Label>
                                            <Slider
                                                value={viewDistance}
                                                onValueChange={setViewDistance}
                                                min={4}
                                                max={64}
                                                step={4}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Difficulty</Label>
                                            <Select value={difficulty} onValueChange={setDifficulty}>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="peaceful">Peaceful</SelectItem>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Bedrock Features</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded">
                                            <Label className="text-xs">Allow Cheats</Label>
                                            <Switch
                                                checked={allowCheats}
                                                onCheckedChange={setAllowCheats}
                                                size="sm"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded">
                                            <Label className="text-xs">Allowlist Mode</Label>
                                            <Switch
                                                checked={allowList}
                                                onCheckedChange={setAllowList}
                                                size="sm"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded">
                                            <Label className="text-xs">Xbox Live Auth</Label>
                                            <Switch
                                                checked={onlineMode}
                                                onCheckedChange={setOnlineMode}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={() => executeCommand('apply-settings', {
                                        serverName, maxPlayers, gamemode, difficulty,
                                        viewDistance: viewDistance[0], allowCheats, allowList, onlineMode
                                    })}
                                    disabled={isLoading}
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Settings className="h-3 w-3 mr-1" />
                                    Apply Settings
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="automation" className="mt-4 space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <Button
                                    onClick={() => executeCommand('schedule-restart')}
                                    disabled={isLoading}
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Clock className="h-3 w-3 mr-1" />
                                    Auto Restart
                                </Button>
                                <Button
                                    onClick={() => executeCommand('schedule-backup')}
                                    disabled={isLoading}
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Database className="h-3 w-3 mr-1" />
                                    Auto Backup
                                </Button>
                                <Button
                                    onClick={() => executeCommand('performance-monitoring')}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Activity className="h-3 w-3 mr-1" />
                                    Monitor
                                </Button>
                                <Button
                                    onClick={() => executeCommand('auto-cleanup')}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="h-8 text-xs"
                                    size="sm"
                                >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Auto Clean
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Compact Communication Panel */}
            <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Server Communication</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex gap-2">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message to broadcast..."
                            className="flex-1 h-16 text-xs resize-none"
                        />
                        <div className="flex flex-col gap-1">
                            <Button
                                onClick={() => executeCommand('broadcast', { message })}
                                disabled={!message || isLoading}
                                className="h-7 text-xs px-2"
                                size="sm"
                            >
                                <MessageSquare className="h-3 w-3" />
                            </Button>
                            <Button
                                onClick={() => executeCommand('title', { message })}
                                disabled={!message || isLoading}
                                variant="outline"
                                className="h-7 text-xs px-2"
                                size="sm"
                            >
                                <Eye className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
