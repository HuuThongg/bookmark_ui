import type { Folder, SelectedFolderNameID } from '$lib/types/folder';
import { writable } from 'svelte/store';

export const folderName = writable<string>('Untitled collection');

export const newLink = writable<string>('');

export const selectedFolders = writable<Folder[]>([]);
export const sidebarSelectedFolderId = writable<string | null>(null);

export const currentFolder = writable<string>('');

export const currentFolderAtSlug = writable<SelectedFolderNameID>();

export const folders = writable<Folder[]>([]);

export const foldersFound = writable<Folder[]>([]);

export const lastCreatedFolder = writable<Folder>();

export const loading = writable<boolean>(true);

export const createFolderMode = writable<boolean>(false);

