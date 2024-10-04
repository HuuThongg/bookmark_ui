import { getFolderLinks } from '$lib/api/folder/getFoldersLinks';
import { currentFolderAtSlug, folders } from '$lib/stores/folder.store';
import { get } from 'svelte/store';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ params, parent }) => {
	await parent();
	console.log('yoooooo');
	const folderID = params.slug;
	const linksList = await getFolderLinks(folderID);
	if (folderID) {
		const folder = get(folders).find((folder) => folder.folder_id == folderID);
		currentFolderAtSlug.set({
			folder_id: folderID,
			folder_name: folder?.folder_name ?? 'Folder Name'
		});
	}

	return { title: 'hello', slug: params.slug, linksList };
};
