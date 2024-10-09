import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { currentFolderAtSlug, folders, selectedFolders } from '$lib/stores/folder.store';
import { getSession } from '$lib/stores/user.store';
import type { Folder } from '$lib/types/folder';
import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';

let myFolders: Partial<Folder>[] = [];

export async function renameFolder(folder_name: string | undefined, folder_id: string | undefined) {
	if (folder_name === undefined || folder_id === undefined) return;
	const s = getSession();
	if (!s || (s && !s.access_token)) {
		toast.error('session is timeout');
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/folder/rename`, {
		method: 'PATCH',
		mode: 'cors',
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
			new_folder_name: folder_name,
			folder_id: folder_id
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const folder: Folder = result[0];
	currentFolderAtSlug.set({ folder_id: folder.folder_id, folder_name: folder.folder_name });

	myFolders = get(folders);

	const index: number = myFolders.findIndex((object) => {
		return object.folder_id === folder.folder_id;
	});

	myFolders.splice(index, 1, folder);

	folders.set(myFolders);

	selectedFolders.set([]);

	selectedFolders.update((values) => (values = [folder, ...values]));

	// folders.update((values) => (values = values.filter((v) => v.folder_id !== folder.folder_id)));

	// folders.update((values) => (values = [folder, ...values]));
}
