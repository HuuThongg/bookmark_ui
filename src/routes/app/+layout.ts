import { authenticate } from '$lib/api/auth';
import { getAllFolders } from '$lib/api/folder/getAllFolders';
import { getSortedFolders } from '$lib/api/folder/getSortedFolders';
import { folders } from '$lib/stores/folder.store';
import { getCookie } from '$lib/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	await authenticate({ admin: true });
	const foldersList = await getAllFolders(fetch);
	await getSortedFolders(fetch);

	if (foldersList) {
		folders.set(foldersList);
	}
	let layout: number[] | undefined;
	let collapsed: boolean | undefined;
	const layoutCookie = getCookie('PaneForge:layout');
	const collapsedCookie = getCookie('PaneForge:collapsed');

	if (layoutCookie) layout = JSON.parse(layoutCookie);
	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	return { layout, collapsed };
};
