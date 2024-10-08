<script lang="ts">
	import FullScreen from '$lib/components/full-screen.svelte';
	export let data;
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import { links } from '$lib/stores/link.store';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import FilterHeader from '$lib/components/main-page/filter-header.svelte';

	const notfullWidth = $page.url.pathname.includes('/item');
</script>

<div class="flex h-screen w-full flex-row overflow-hidden">
	<FullScreen defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
		<div class="flex h-full w-full bg-bg">
			<div
				class={cn(
					'min-h-screen w-full max-w-[420px] bg-bg p-2 text-color',
					notfullWidth ? 'max-w-[420px]' : 'max-w-full'
				)}
			>
				<div class=" mx-auto max-w-6xl overflow-y-auto">
					<BookmarkHeader />
					<FilterHeader />
					<slot />
				</div>
			</div>
			<slot />
		</div>
	</FullScreen>
</div>
