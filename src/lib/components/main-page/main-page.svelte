<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/ui/button/button.svelte';

	import { Eye, Pencil, Trash2 } from 'lucide-svelte';
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import { deleteLinksForever } from '$lib/api/link/deleteLinksForever';
	import { loadingStatesStore, type LoadingStates } from '$lib/stores';
	import LoadingSpinner from '$lib/components/shared-components/loading-spinner.svelte';
	import { links } from '$lib/stores/link.store';
	import { onDestroy } from 'svelte';
	import FilterHeader from '$lib/components/main-page/filter-header.svelte';
	import type { Link } from '$lib/types/link';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	let linkList: Link[] = [];
	$: linkList = $links;
	let loadingStates: LoadingStates = {};

	const unsubscribe = loadingStatesStore.subscribe((value) => {
		loadingStates = value;
	});

	onDestroy(() => {
		unsubscribe(); // Clean up subscription
	});
	const currPathname = $page.url.pathname.split('/').at(2);

	const notfullWidth = $page.url.pathname.includes('/item');
</script>

<div
	class={cn(
		'min-h-screen w-full max-w-[420px] bg-gray-900 p-4 text-gray-100',
		notfullWidth ? 'max-w-[420px]' : 'max-w-full'
	)}
>
	<div class=" mx-auto max-w-6xl overflow-y-auto">
		<BookmarkHeader />
		<!-- <FilterHeader /> -->
		<div class="space-y-4">
			{#each linkList as link}
				<a
					href={`/app/${currPathname}/item/${link.link_id}/edit`}
					class="flex items-center justify-between rounded-lg bg-gray-800 p-3"
				>
					<div class="flex items-center space-x-3">
						<img src={link.link_thumbnail} alt="" class="h-10 w-10 rounded" />
						<div>
							<h3 class="font-medium">{link.link_title}</h3>
							<p class="text-sm text-gray-400">
								{link.link_hostname} ·
								{dayjs(link.added_at).format('MMM D')}
							</p>
						</div>
					</div>
					<div class="flex items-center space-x-2">
						<Button variant="ghost" size="sm" class="text-gray-400">
							<Eye class="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="sm" class="text-gray-400">
							<Pencil class="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							class="text-gray-400"
							on:click={async () => deleteLinksForever([link])}
							aria-disabled={loadingStates[link.link_id]}
						>
							{#if loadingStates[link.link_id]}
								<LoadingSpinner />
							{:else}
								<Trash2 class="h-4 w-4" />
							{/if}
						</Button>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
