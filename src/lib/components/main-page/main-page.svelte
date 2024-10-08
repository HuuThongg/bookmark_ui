<script lang="ts">
	import { links } from '$lib/stores/link.store';
	import LinkList from './link/link-list.svelte';
	$: linkList = $links;
</script>

<LinkList {linkList} />
{#if linkList.length === 0}
	<div class=" mt-10 flex w-full justify-center">
		<h3 class="text-xl">Add a link</h3>
	</div>
{/if}
