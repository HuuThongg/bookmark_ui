import type { Link } from '$lib/types/link';
import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { links } from '$lib/stores/link.store';
import type { Fetch } from '$lib/types';

export async function getFolderLinks(fetch: Fetch, folderID: string | undefined): Promise<Link[]> {
	if (!folderID) throw new Error('folderID does not exists');

	const s = getSession();
	const accountID = s.account?.id;
	if (!accountID) throw new Error('accountID does not exists');
	let url = `${PUBLIC_API_ENDPOINT}/private/link/get_folder_links/${accountID}/${folderID}`;
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

	let linksList: Link[] = [];
	if (result[0]) {
		linksList = result[0];
		links.set(linksList);
	} else {
		links.set([]);
	}
	return linksList;
}
