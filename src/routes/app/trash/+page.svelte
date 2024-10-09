<script lang="ts">
	import LinkList from '$lib/components/main-page/link/link-list.svelte';
	import { trashLinks } from '$lib/stores/link.store';
	$: linkList = $trashLinks;
</script>

<div class="w-full p-4">
	{#if linkList?.length > 0}
		<LinkList {linkList} />
	{/if}
</div>
