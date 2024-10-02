import { get } from 'svelte/store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import type { Folder } from '$lib/types/folder';
import { session } from '$lib/stores/user.store';

export async function getFolder(folderID: string): Promise<Partial<Folder>> {
	let url = `${PUBLIC_API_ENDPOINT}/private/folder/getOne/${get(session).account.id}/${folderID}`;

	const res = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${get(session).access_token}`
		}
	});

	if (!res.ok) {
		throw new Error('can get folder');
	}
	const result = await res.json();

	const folder: Partial<Folder> = result[0];

	return folder;
}
