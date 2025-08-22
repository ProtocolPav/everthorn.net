// admin/page.tsx
'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGuildPlaytime, useServerStatus } from '@/hooks/use-admin-data';
import CardOverview from "@/app/(admin)/admin/_components/dashboard/card-overview";
import Statistics from "@/app/(admin)/admin/_components/dashboard/statistics";
import * as React from "react";
import {usePlayers} from "@/hooks/use-players";

export default function AdminPage() {
    const [selectedGuildId, setSelectedGuildId] = useState('611008530077712395');

    const { playtime, isLoading: playtimeLoading } = useGuildPlaytime(selectedGuildId);
    const { players, isLoading: playersLoading } = usePlayers(selectedGuildId);
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
