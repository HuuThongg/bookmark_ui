import type { Link } from '$lib/types/link';
import { writable, derived } from 'svelte/store';
export const links = writable<Link[]>([]);

export const trashLinks = writable<Partial<Link>[]>([]);

export const trashLinksLength = derived(
  trashLinks, ($trashLinks) => $trashLinks.length
);


export const linksFound = writable<Link[]>([]);
