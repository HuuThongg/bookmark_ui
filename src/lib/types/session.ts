import type { User } from './user';

export interface Session {
	account: User;
	access_token: string;
	refresh_token: string;
	expiry: Date;
}
