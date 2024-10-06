<script lang="ts">
	import { links } from '$lib/stores/link.store';
	import type { OpenContextMenuEventDetail } from '$lib/types/link';
	import LinkItem from './link-item.svelte';
	$: linkList = $links;
	let currentOpenMenu: string | null = null;

	function handleOpenContextMenu(event: CustomEvent<OpenContextMenuEventDetail>) {
		console.log('id', event.detail.link_id);
		currentOpenMenu = event.detail.link_id;
	}
</script>

<div class="space-y-4">
	{#each linkList as link}
		<LinkItem {link} {currentOpenMenu} on:openContextMenu={handleOpenContextMenu} />
	{/each}
</div>
