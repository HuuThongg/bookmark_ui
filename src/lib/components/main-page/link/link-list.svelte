<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { selectedLinksMode } from '$lib/stores';
	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import type { Link, OpenContextMenuEventDetail } from '$lib/types/link';
	import LinkItem from './link-item.svelte';
	export let linkList: Link[] = [];
	let currentOpenMenu: string | null = null;

	function handleOpenContextMenu(event: CustomEvent<OpenContextMenuEventDetail>) {
		currentOpenMenu = event.detail.link_id;
	}
	afterNavigate(() => {
		//currentFolderAtSlug.set(null);
		selectedLinkIdsToEdit.set([]);
		selectedLinksMode.set(false);
	});
</script>

<div class="h-full w-full space-y-4 overflow-y-auto" data-sveltekit-preload-data="off">
	{#each linkList as link}
		<LinkItem {link} {currentOpenMenu} on:openContextMenu={handleOpenContextMenu} />
	{/each}
</div>
