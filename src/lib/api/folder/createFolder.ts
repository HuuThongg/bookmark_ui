import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import type { Folder } from '$lib/types/folder';
import { createFolderMode, folderName, folders, lastCreatedFolder } from '$lib/stores/folder.store';
import { get } from 'svelte/store';
import { session } from '$lib/stores/user.store';

let myFolders: Folder[] = [];

let folderID: string = '';

export async function CreateFolder(folder_name: string, parent_folder_id?: string) {
	if (!parent_folder_id) {
		folderID = 'null';
	} else {
		folderID = parent_folder_id;
	}

	createFolderMode.set(false);
	console.log('folderName', folder_name);
	console.log('parent_folder_id', parent_folder_id);
	console.log('fetching', `${PUBLIC_API_ENDPOINT}/private/folder/create`);

	try {
		const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/folder/create`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${get(session).access_token}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				folder_name: folder_name,
				parent_folder_id: folderID
			}) // body data type must match "Content-Type" header
		});
		if (!response.ok) {
			console.log('message', response.text());
			throw new Error('Error  creating folder!');
		}
		const result = await response.json();
		console.log('result', result);

		const folder: Folder = result[0];

		if (folder === null) return;

		if (get(folders) !== null) {
			folders.update((values) => [folder, ...values]);
		} else {
			folders.set([...myFolders, folder]);
		}

		lastCreatedFolder.set(folder);

		folderName.set('Untitled collection');
	} catch (error) {
		console.error(error);
		throw new Error('Error  creating folder');
	}
}
