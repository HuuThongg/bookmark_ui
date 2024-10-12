<script lang="ts">
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import { links } from '$lib/stores/link.store';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import FilterHeader from './filter-header.svelte';
	import LinkList from './link/link-list.svelte';
	import Button from '../ui/button/button.svelte';
	$: linkList = $links;

	const notfullWidth = $page.url.pathname.includes('/item');
	$: console.log('linkList mainpage', $links);
</script>

<div
	class={cn(
		'min-h-screen w-full max-w-[420px] bg-bg p-2 text-color',
		notfullWidth ? 'min-w-[420px] max-w-[420px]' : 'max-w-full'
	)}
>
	<div class=" mx-auto h-full max-w-6xl overflow-hidden">
		<BookmarkHeader />
		<FilterHeader />
		<LinkList {linkList} />
		{#if linkList.length === 0}
			<div class=" mt-10 flex w-full justify-center">
				<h3 class="text-lg">No Link Found</h3>
			</div>
			<div class="flex w-full justify-center">
				<Button href="/app/all" variant="link" size="lg" class="text-lg">All bookmarks</Button>
			</div>
		{/if}
	</div>
</div>
