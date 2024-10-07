import type { TreeItem } from '$lib/types';
import type { Folder, SelectedFolderNameID } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { buildTree } from '$lib/utils';
import { derived, writable } from 'svelte/store';

export const folderName = writable<string>('Untitled collection');

export const newLink = writable<string>('');

export const selectedFolders = writable<Folder[]>([]);
export const sidebarSelectedFolderId = writable<string | null>(null);

export const currentFolder = writable<string>('');

export const currentFolderAtSlug = writable<SelectedFolderNameID>();


export const foldersFound = writable<Folder[]>([]);

export const lastCreatedFolder = writable<Folder>();

export const loading = writable<boolean>(true);

export const createFolderMode = writable<boolean>(false);

export const folders = writable<Folder[]>([]);
export const treeStructureStore = derived(folders, ($fs) => {
  if (!$fs.length) return [];
  return buildTree($fs, null);
});
export const treeStructureFlattenStore = derived(treeStructureStore, ($tree) => {
  if (!$tree.length) return [];

  const flattened: TreeItem[] = [];

  function flatten(tree: TreeItem[]) {
    tree.forEach((item: TreeItem) => {
      const newItem = { ...item }; // Create a copy to avoid mutating the original item
      if (!newItem.children || newItem.children.length === 0) {
        delete newItem.children;
      }
      flattened.push(newItem);
      if (newItem.children?.length) {
        flatten(newItem.children);
      }
    });
  }

  flatten($tree);
  console.log("flatten", flattened);
  return flattened;
});
