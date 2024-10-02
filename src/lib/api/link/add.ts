import { get } from 'svelte/store';
import type { Link } from '$lib/types/link';

import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { getSession } from '$lib/stores/user.store';
import { links } from '$lib/stores/link.store';
import { goto } from '$app/navigation';

export let errorInvalidUrl = '';

const myLinks: Link[] = [];

export async function addLink(url: string, folderID: string) {
	const s = getSession();
	const accountID = s.account?.id;
	if (!accountID) return;

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/add`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${s.access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			url: url,
			folder_id: folderID
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	if (result[0] === null) {
		console.log('no result returned');

		return;
	}

	if (result.message) {
		return;
	}

	const link: Link = result[0];
	console.log('link', link);

	if (get(links) !== null) {
		links.update((values) => [link, ...values]);
	} else {
		links.set([...myLinks, link]);
	}
}
