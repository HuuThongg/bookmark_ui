<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/ui/button/button.svelte';

	import { Cloud, Calendar, LayoutList, Download, Eye, Pencil, Trash2 } from 'lucide-svelte';
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import type { PageData } from './$types';
	import { deleteLinksForever } from '$lib/api/link/deleteLinksForever';
	import { isDeleting, loadingStatesStore, type LoadingStates } from '$lib/stores';
	import LoadingSpinner from '$lib/components/shared-components/loading-spinner.svelte';
	import { links } from '$lib/stores/link.store';
	import { onDestroy } from 'svelte';
	import ListView from '$lib/components/view/list-view.svelte';
	import FilterHeader from '$lib/components/main-page/filter-header.svelte';
	let loadingStates: LoadingStates = {};

	const unsubscribe = loadingStatesStore.subscribe((value) => {
		loadingStates = value;
	});

	onDestroy(() => {
		unsubscribe(); // Clean up subscription
	});
</script>

<div class="min-h-screen w-full bg-gray-900 p-4 text-gray-100">
	<div class="mx-auto max-w-4xl overflow-y-auto">
		<BookmarkHeader />
		<FilterHeader />
		<div class="space-y-4">
			{#each $links as link}
				<div class="flex items-center justify-between rounded-lg bg-gray-800 p-3">
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
				</div>
			{/each}
		</div>
	</div>
</div>
