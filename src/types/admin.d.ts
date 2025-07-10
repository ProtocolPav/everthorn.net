// types/admin.ts
export interface OnlineUser {
    thorny_id: number;
    discord_id: number;
    session: string;
}

export interface LeaderboardEntry {
    value: number;
    thorny_id: number;
    discord_id: number;
}

export interface PlaytimeData {
    thorny_id: number;
    total: number;
    session: string;
    daily: Array<{
        day: string;
        playtime: number;
    }>;
    monthly: Array<{
        month: string;
        playtime: number;
    }>;
}

export interface UserObjective {
    start: string;
    end: string;
    completion: number;
    status: 'in_progress' | 'completed' | 'failed';
    thorny_id: number;
    quest_id: number;
    objective_id: number;
}

export interface UserQuest {
    accepted_on: string;
    started_on: string;
    status: 'in_progress' | 'completed' | 'failed';
    thorny_id: number;
    quest_id: number;
    objectives: UserObjective[];
}

export interface GuildPlaytime {
    total_playtime: number;
    total_unique_players: number;
    daily_playtime: Array<{
        day: string;
        total: number;
        unique_players: number;
        total_sessions: number;
        average_playtime_per_session: number;
    }>;
    weekly_playtime: Array<{
        week: number;
        total: number;
        unique_players: number;
        total_sessions: number;
        average_playtime_per_session: number;
    }>;
    monthly_playtime: Array<{
        month: string;
        total: number;
    }>;
    peak_playtime_periods: any;
    peak_active_periods: any;
    daily_playtime_distribution: any;
    anomalies: any;
    predictive_insights: any;
}

export interface ServerStatus {
    server_online: boolean;
    server_status: string;
    status_check: boolean;
    update: boolean;
    server_start: string;
    uptime: string;
    usage: any;
    last_backup: string;
}
