import type { Link } from '$lib/types/link';
import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { allLinks, trashLinks } from '$lib/stores/link.store';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';
import type { Fetch } from '$lib/types';

export async function getAllDeletedLinks(fetch: Fetch): Promise<Partial<Link[]> | undefined> {
	const s = getSession();
	if (!s || (s && !s.access_token)) {
		toast.error('session is timeout');
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	let url = `${PUBLIC_API_ENDPOINT}/private/link/getAllDeletedLinks`;
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
	let trashLinksList: Partial<Link[]> = [];

	if (result.length > 0) {
		trashLinksList = result[0]; // Assuming you want the first element
		trashLinks.set(trashLinksList);
	} else {
		trashLinks.set([]);
	}
}
