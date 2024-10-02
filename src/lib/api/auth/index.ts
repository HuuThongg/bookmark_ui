import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import {
	getSession,
	preferences as preferences$,
	resetSavedUser,
	session,
	user as user$
} from '$lib/stores/user.store';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { AppRoute } from '$lib/constants';
import { RefreshToken } from '../token/refreshToken';

export interface AuthOptions {
	admin?: true;
	public?: true;
}

export const loadUser = async () => {
	try {
		let user = get(user$);
		let preferences = get(preferences$);

		if (!user && hasAuthCookie()) {
			const user = await getMyUser();
			user$.set(user);
			//preferences$.set(preferences);
		}
		return user;
	} catch {
		return null;
	}
};

const hasAuthCookie = (): boolean => {
	if (!browser) {
		return false;
	}

	for (const cookie of document.cookie.split('; ')) {
		const [name] = cookie.split('=');
		if (name === 'is_authenticated') {
			return true;
		}
	}
	return false;
};

export const authenticate = async (options?: AuthOptions) => {
	const { public: publicRoute, admin: adminRoute } = options || {};
	const user = await loadUser();

	if (publicRoute) {
		return;
	}
	console.log('user', user);

	if (!user) {
		redirect(302, AppRoute.ACCOUNT_LOGIN);
	}
	const access_token = getSession().access_token;
	if (!access_token) return;
	console.log('access_token', access_token);
	await checkIfIsAuthenticated(access_token);
	if (adminRoute && user) {
		//redirect(302, AppRoute.APP);
	}
};

async function checkIfIsAuthenticated(access_token: string) {
	const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/checkIfIsAuthenticated`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'omit',
		headers: {
			'Content-Type': 'application/json'
			//authorization: `Bearer${get(session).access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			token: access_token
		}) // body data type must match "Content-Type" header
	});
	const result = await response.json();
	console.log('result', result);
	if (result.message !== 'user logged in') {
		await RefreshToken(getSession());

		return;
	}
}

export const handleLogout = async (redirectUri: string) => {
	try {
		if (redirectUri.startsWith('/')) {
			await goto(redirectUri);
		} else {
			window.location.href = redirectUri;
		}
	} finally {
		resetSavedUser();
		document.cookie = '';
	}
};

export async function getMyUser() {
	try {
		const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/account/signin`);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'An error occurred during signup');
		}

		return await response.json();
	} catch (error) {
		throw new Error('Error connecting to the server.');
	}
}
