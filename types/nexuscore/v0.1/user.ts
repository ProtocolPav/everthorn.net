export interface ThornyUser {
  thorny_id: number,
  user_id: number,
  guild_id: number,
  username: string,
  join_date: string,
  birthday: string,
  balance: number,
  active: boolean,
  role: string,
  patron: boolean,
  level: number,
  xp: number,
  required_xp: number,
  last_message: string,
  gamertag: string,
  whitelist: string,
}

export interface ThornyProfile {
  slogan: string,
  aboutme: string,
  lore: string,
  character_name: string,
  character_age: number,
  character_race: string,
  character_role: string,
  character_origin: string,
  character_beliefs: string,
  agility: number,
  valor: number,
  strength: number,
  charisma: number,
  creativity: number,
  ingenuity: number,
}

export interface ThornyPlaytime {
  total: number,
  session: string,
  daily: ThornyDailyPlaytime[],
  monthly: ThornyMonthlyPlaytime[]
}

export interface ThornyDailyPlaytime {
  day: string,
  playtime: number,
}

export interface ThornyMonthlyPlaytime {
  month: string,
  playtime: number,
}

export interface User {
  user: ThornyUser,
  profile: ThornyProfile,
  playtime: ThornyPlaytime
}
