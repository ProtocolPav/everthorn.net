// admin/page.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGuildPlaytime, useOnlinePlayers, useServerStatus } from '@/hooks/use-admin-data';
import ServerControlPanel from './_components/dashboard/ServerControlPanel';
import CardOverview from "@/app/(admin)/admin/_components/dashboard/card-overview";
import Statistics from "@/app/(admin)/admin/_components/dashboard/statistics";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Info} from "@phosphor-icons/react";
import * as React from "react";

export default function AdminPage() {
    const [selectedGuildId, setSelectedGuildId] = useState('611008530077712395');

    const { playtime, isLoading: playtimeLoading } = useGuildPlaytime(selectedGuildId);
    const { players, isLoading: playersLoading } = useOnlinePlayers(selectedGuildId);
    const { status, isLoading: statusLoading } = useServerStatus();

    return (
        <section className="grid items-center gap-6 pb-8 md:px-4">
            {/* Overview Cards */}
            <CardOverview
                playtime={playtime}
                playtimeLoading={playtimeLoading}
                players={players}
                playersLoading={playersLoading}
                status={status}
                statusLoading={statusLoading}
            />

            {/* Main Content Tabs */}
            <Statistics
                playtime={playtime}
                playtimeLoading={playtimeLoading}
                players={players}
                playersLoading={playersLoading}
                status={status}
                statusLoading={statusLoading}
            />

            <Select value={selectedGuildId} onValueChange={setSelectedGuildId}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Guild" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="611008530077712395">Everthorn</SelectItem>
                    <SelectItem value="1213827104945471538">Local Test Server</SelectItem>
                </SelectContent>
            </Select>
        </section>
    );
}
