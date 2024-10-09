import type { TreeItem, TreeItem1 } from '$lib/types';
import type { MinimalFolder, Folder, SelectedFolderNameID } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { buildTree, buildTree1, buildTree2 } from '$lib/utils';
import { derived, writable } from 'svelte/store';

export const folderName = writable<string>('Untitled collection');

export const newLink = writable<string>('');

export const selectedFolders = writable<Folder[]>([]);
export const sidebarSelectedFolderId = writable<string | null>(null);

export const currentFolder = writable<string>('');

export const currentFolderAtSlug = writable<SelectedFolderNameID | null>(null);

export const foldersFound = writable<Folder[]>([]);

export const lastCreatedFolder = writable<Folder>();

export const loading = writable<boolean>(true);

export const createFolderMode = writable<boolean>(false);

export const folders = writable<Folder[]>([]);

export const sortableFolderStore = writable<MinimalFolder[]>([]);

export const treeSortedStructureStore = derived(sortableFolderStore, ($fs) => {
	if (!$fs.length) return [];
	return buildTree2($fs, null);
});

export const treeSortedStructureFlattenStore = derived(sortableFolderStore, ($tree) => {
	if (!$tree.length) return [];

	const flattened: TreeItem1[] = [];

	function flatten(tree: TreeItem1[]) {
		tree.forEach((item: TreeItem1) => {
			const newItem = { ...item }; // Create a copy to avoid mutating the original item
			if (!newItem.children || newItem.children.length === 0) {
				delete newItem.children;
			}
			flattened.push(newItem);
			if (newItem.children.length) {
				flatten(newItem.children);
			}
		});
	}

	flatten($tree);
	console.log('flatten', flattened);
	return flattened;
});
