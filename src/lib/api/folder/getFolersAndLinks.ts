import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { links } from '$lib/stores/link.store';
import { folders } from '$lib/stores/folder.store';
import { get } from 'svelte/store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { getSession, session } from '$lib/stores/user.store';

let f: Partial<Folder>[] = [];
let l: Partial<Link>[] = [];

let folderID;
export async function getLinksAndFolders(folder_id: string) {
	const s = getSession();
	const accountID = s.account?.id;
	if (!accountID) return;

	if (!folder_id) {
		folderID = 'null';
	} else {
		folderID = folder_id;
	}

	const url = `${PUBLIC_API_ENDPOINT}/private/getLinksAndFolders/${accountID}/${folderID}`;
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
		throw new Error('Can not get Folders and Links');
	}
	const result = await res.json();

	f = result[0].folders;

	l = result[0].links;

	if (f !== null) {
		folders.set(f);
	} else {
		folders.set([]);
	}

	if (l !== null) {
		links.set(l);
	} else {
		links.set([]);
	}
}
