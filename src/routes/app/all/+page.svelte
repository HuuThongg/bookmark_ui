<script lang="ts">
	import LinkList from '$lib/components/main-page/link/link-list.svelte';
	import { query } from '$lib/stores'; // assume query is reactive store holding search input
	import { linksFound, allLinks } from '$lib/stores/link.store'; // assume these are stores
	$: linkList = $query === '' ? $allLinks : $linksFound;
</script>

<div class="h-full w-full overflow-y-auto p-4">
	{#if $query !== '' && $linksFound.length === 0}
		<span class="pl-3 text-lg">Not found</span>
	{:else}
		<LinkList {linkList} />
	{/if}
</div>
