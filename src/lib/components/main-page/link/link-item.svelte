<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import {
		CirclePlus,
		Clipboard,
		ExternalLink,
		Eye,
		Grab,
		Pencil,
		Trash,
		Trash2
	} from 'lucide-svelte';
	import { deleteLinksForever } from '$lib/api/link/deleteLinksForever';
	import { loadingStatesStore, type LoadingStates } from '$lib/stores';
	import LoadingSpinner from '$lib/components/shared-components/loading-spinner.svelte';
	import { links } from '$lib/stores/link.store';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import type { Link, OpenContextMenuEventDetail } from '$lib/types/link';
	import { page } from '$app/stores';
	import { cn, copyToClipboard } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { moveLinksToTrash } from '$lib/api/link/moveLinksToTrash';

	export let link: Link;
	export let currentOpenMenu: string | null;
	let linkList: Link[] = [];
	$: linkList = $links;
	let loadingStates: LoadingStates = {};
	const a = links.subscribe((v) => console.log('v: ', v));

	const unsubscribe = loadingStatesStore.subscribe((value) => {
		loadingStates = value;
	});
	const buttonClass =
		'rounded-button flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm font-medium outline-none !ring-0 !ring-transparent data-[highlighted]:bg-muted';

	const dispatch = createEventDispatcher<{ openContextMenu: OpenContextMenuEventDetail }>();

	function openMenu() {
		dispatch('openContextMenu', { link_id: link.link_id });
	}
	onDestroy(() => {
		unsubscribe();
		a();
	});

	const currPathname = $page.url.pathname.split('/').at(2);

</script>

<ContextMenu.Root>
	<ContextMenu.Trigger on:contextmenu={openMenu}>
		<a
			href={`/app/${currPathname}/item/${link.link_id}/edit`}
			class="flex items-center justify-between rounded-lg bg-gray-800 p-3 hover:bg-gray-700"
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
					on:click={async () => await moveLinksToTrash([link])}
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
	</ContextMenu.Trigger>
	{#if currentOpenMenu === link.link_id}
		<ContextMenu.Content class="flex flex-col">
			<ContextMenu.Item
				on:click={() => window.open(`${link.link_url}`, '_blank')}
				class={cn('cursor-pointer', buttonClass)}
			>
				<div class="flex items-center">
					<ExternalLink class="text-foreground-alt mr-2 size-5" />
					Open in a new tab
				</div>
			</ContextMenu.Item>
			<ContextMenu.Item
				on:click={async () => await copyToClipboard(link.link_url)}
				class={cn('cursor-pointer', buttonClass)}
			>
				<div class="flex items-center">
					<Clipboard class="text-foreground-alt mr-2 size-5" />
					Copy link to clipboard
				</div>
			</ContextMenu.Item>

			<ContextMenu.Separator />
			<ContextMenu.Item class={cn('cursor-pointer', buttonClass)}>
				<div class="flex items-center">
					<Grab class="text-foreground-alt mr-2 size-5" />
					Select
				</div>
			</ContextMenu.Item>

			<ContextMenu.Item class={cn('cursor-pointer', buttonClass)}>
				<div class="flex items-center">
					<CirclePlus class="text-foreground-alt mr-2 size-5" />
					Add to favorites
				</div>
			</ContextMenu.Item>

			<ContextMenu.Separator />
			<ContextMenu.Item
				on:click={async () => await goto(`/app/${currPathname}/item/${link.link_id}/edit`)}
				class={cn('cursor-pointer', buttonClass)}
			>
				<div class="flex items-center">
					<Pencil class="text-foreground-alt mr-2 size-5" />
					Edit
				</div>
			</ContextMenu.Item>

			<ContextMenu.Item
				on:click={async () => await moveLinksToTrash([link])}
				class={cn('cursor-pointer', buttonClass)}
			>
				<div class="flex items-center">
					<Trash class="text-foreground-alt mr-2 size-5" />
					Delete
				</div>
			</ContextMenu.Item>
		</ContextMenu.Content>
	{/if}
</ContextMenu.Root>
