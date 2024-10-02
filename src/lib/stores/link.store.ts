import type { Link } from '$lib/types/link';
import { writable } from 'svelte/store';
export const links = writable<Link[]>([]);
