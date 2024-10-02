import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { getSession } from '$lib/stores/user.store';
import type { Folder } from '$lib/types/folder';

export async function getRootFoldersOnly(): Promise<Folder[]> {
	const s = getSession();

	const getFoldersEndPoint = `${PUBLIC_API_ENDPOINT}/private/folder/getRootFoldersByUserID`;

	const response = await fetch(getFoldersEndPoint, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${s.access_token}`
		}
	});

	const result = await response.json();

	const folders: Folder[] = result[0];

	return folders;
}
