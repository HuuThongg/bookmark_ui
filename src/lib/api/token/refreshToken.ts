import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { goto } from '$app/navigation';
import { type Session } from '$lib/types/session';
import { setSession } from '$lib/stores/user.store';
import { AppRoute } from '$lib/constants';

export const RefreshToken = async (s: Partial<Session>) => {
	const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/refreshToken`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			refresh_token: s.refresh_token
		}) // body data type must match "Content-Type" header
	});

	const data = await response.json();

	if (data.message) {
		// handle this error
		console.log(data.message);
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	s = data[0];

	if (s === null) return;

	setSession(s);

	//window.localStorage.removeItem('session');

	//window.localStorage.setItem('session', JSON.stringify(s));

	goto(AppRoute.APP);
};
