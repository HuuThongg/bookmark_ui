<script lang="ts">
	import type { Link, OpenContextMenuEventDetail } from '$lib/types/link';
	import LinkItem from './link-item.svelte';
	export let linkList: Link[] = [];
	let currentOpenMenu: string | null = null;

	function handleOpenContextMenu(event: CustomEvent<OpenContextMenuEventDetail>) {
		console.log('id', event.detail.link_id);
		currentOpenMenu = event.detail.link_id;
	}
	$: console.log('linkkkkkkk', linkList);
</script>

<div class="w-full space-y-4" data-sveltekit-preload-data="tap">
	{#each linkList as link}
		<LinkItem {link} {currentOpenMenu} on:openContextMenu={handleOpenContextMenu} />
	{/each}
</div>
