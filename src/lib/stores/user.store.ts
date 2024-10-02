import type { Session } from '$lib/types/session';
import type { User } from '$lib/types/user';
import { persisted } from 'svelte-local-storage-store';
import { get, writable } from 'svelte/store';

// Default User value
const defaultUser: User = {
	id: 0,
	fullname: '',
	email: '',
	email_verified: false,
	picture: '',
	create_at: new Date(0).toISOString(),
	intention: '',
	last_login: new Date(0).toISOString()
};

// Default session value
const defaultSession: Session = {
	account: defaultUser, // Use the default user
	access_token: '',
	refresh_token: '',
	expiry: new Date()
};

// Create a writable store with the default session value
export const session = persisted<Session>('session', defaultSession, {
	storage: 'session'
});

// Function to update session
export const setSession = (s: Session) => {
	session.set(s);
	user.set(s.account);
};
export const getSession = () => {
	return get(session);
};

// Function to clear session
export const clearSession = () => {
	session.set(defaultSession);
};

export const user = persisted<User>('user', defaultUser);
export const preferences = writable();

/**
 * Reset the store to its initial undefined value. Make sure to
 * only do this _after_ redirecting to an unauthenticated page.
 */
export const resetSavedUser = () => {
	user.set(undefined as unknown as User);
	preferences.set(undefined);
};
