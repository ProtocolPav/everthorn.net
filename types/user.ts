export interface UserProfile {
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
	whitelist: string
}