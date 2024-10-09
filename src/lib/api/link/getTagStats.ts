import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';
import type { Fetch } from '$lib/types';

export async function getTagStats() {
	const s = getSession();
	if (!s || (s && !s.access_token)) {
		toast.error('session is timeout');
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	try {
		let url = `${PUBLIC_API_ENDPOINT}/private/tag/stats`;
		const res = await fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${s.access_token}`
			}
		});
		if (!res.ok) {
			throw new Error('Can get links');
		}

		const result = await res.json();
		const re = result[0];
		if (re.result) {
			return re.tags;
		}
	} catch (error) {
		console.error(error);
		throw new Error('Error: get a link');
	}
}
