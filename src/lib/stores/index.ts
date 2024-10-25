import { ViewMode } from '$lib/constants';
import { type Tag } from '@melt-ui/svelte';
import { writable, derived } from 'svelte/store';
export const searching = writable<boolean>(false);
export const isDeleting = writable<boolean>(false);

export type LoadingStates = Record<string, boolean>;

export const loadingStatesStore = writable<LoadingStates>({});

export const selectedLinksMode = writable<boolean>(false);

export const isOpenCreatedFolderComponent = writable<boolean>(false);

export const query = writable<string>('');

export const searchInputFocused = writable<boolean>(false);

export const tagsForEachLinkStore = writable<Tag[]>([]);


export const viewModeStore = writable<ViewMode>(ViewMode.EDIT);
