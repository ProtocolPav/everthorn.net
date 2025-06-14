// hooks/useUser.ts
import useSWR from 'swr';

export interface ThornyUser {
    username: string;
    birthday: string;
    balance: number;
    active: boolean;
    role: string;
    patron: boolean;
    level: number;
    xp: number;
    required_xp: number;
    last_message: string;
    gamertag: string;
    whitelist: string;
    thorny_id: number;
    user_id: string;
    guild_id: string;
    join_date: string;
    profile: {
        slogan: string;
        aboutme: string;
        lore: string;
        character_name: string;
        character_age: number;
        character_race: string;
        character_role: string;
        character_origin: string;
        character_beliefs: string;
        agility: number;
        valor: number;
        strength: number;
        charisma: number;
        creativity: number;
        ingenuity: number;
        thorny_id: number;
    };
}

const fetcher = async (url: string): Promise<ThornyUser> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};

export function useUser(thornyId: number) {
    const { data, error, isLoading, mutate } = useSWR<ThornyUser>(
        thornyId ? `/nexuscore-api/v0.2/users/${thornyId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 60000, // Cache for 1 minute
        }
    );

    return {
        user: data,
        isLoading,
        isError: error,
        mutate,
    };
}

export function useUsers(thornyIds: number[]) {
    const users = thornyIds.map(id => useUser(id));

    return {
        users: users.map(u => u.user).filter(Boolean) as ThornyUser[],
        isLoading: users.some(u => u.isLoading),
        errors: users.filter(u => u.isError).map(u => u.isError),
        mutateAll: () => users.forEach(u => u.mutate()),
    };
}
