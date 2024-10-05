import { writable } from 'svelte/store';

export const isDeleting = writable<boolean>(false);

export type LoadingStates = Record<string, boolean>;

export const loadingStatesStore = writable<LoadingStates>({});

export const selectedLinksMode = writable<boolean>(false);

export const isOpenCreatedFolderComponent = writable<boolean>(false);
