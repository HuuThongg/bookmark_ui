import { authenticate } from '$lib/api/auth';
import { getAllFolders } from '$lib/api/folder/getAllFolders';
import { folders } from '$lib/stores/folder.store';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async () => {
	await authenticate({ admin: true });
	const foldersList = await getAllFolders();

	console.log('folders', foldersList);
	folders.set(foldersList);
	return { title: 'hello' };
};
