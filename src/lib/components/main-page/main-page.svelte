<script lang="ts">
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import { links } from '$lib/stores/link.store';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import FilterHeader from './filter-header.svelte';
	import LinkList from './link/link-list.svelte';
	$: linkList = $links;

	const notfullWidth = $page.url.pathname.includes('/item');
	$: console.log('linkList mainpage', $links);
</script>

<div
	class={cn(
		'min-h-screen w-full max-w-[420px] bg-gray-900 p-4 text-gray-100',
		notfullWidth ? 'max-w-[420px]' : 'max-w-full'
	)}
>
	<div class=" mx-auto max-w-6xl overflow-y-auto">
		<BookmarkHeader />
		<FilterHeader />
		<LinkList {linkList} />
		{#if linkList.length === 0}
			<div class=" mt-10 flex w-full justify-center">
				<h3 class="text-xl">Add a link</h3>
			</div>
		{/if}
	</div>
</div>
