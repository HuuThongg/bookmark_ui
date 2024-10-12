<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import {
		CirclePlus,
		Clipboard,
		ExternalLink,
		Eye,
		FolderOpenDot,
		Grab,
		Pencil,
		Trash,
		Trash2
	} from 'lucide-svelte';
	import { loadingStatesStore, type LoadingStates } from '$lib/stores';
	import LoadingSpinner from '$lib/components/shared-components/loading-spinner.svelte';
	import { checkboxLinkStore, selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import type { Link, OpenContextMenuEventDetail } from '$lib/types/link';
	import { page } from '$app/stores';
	import { cn, copyToClipboard } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { moveLinksToTrash } from '$lib/api/link/moveLinksToTrash';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let link: Link;
	export let currentOpenMenu: string | null;
	let loadingStates: LoadingStates = {};

	$: checked = $checkboxLinkStore[link.link_id] ?? false;

	$: linkIdsSelected = $selectedLinkIdsToEdit;
	$: isEdited = linkIdsSelected.findIndex((l) => l === link.link_id) !== -1;
	const unsubscribe = loadingStatesStore.subscribe((value) => {
		loadingStates = value;
	});
	const buttonClass =
		'rounded-button flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm font-medium outline-none !ring-0 !ring-transparent data-[highlighted]:bg-muted';

	const dispatch = createEventDispatcher<{ openContextMenu: OpenContextMenuEventDetail }>();

	function openMenu() {
		dispatch('openContextMenu', { link_id: link.link_id });
	}

	function handleToggleSelectedLink() {
		selectedLinkIdsToEdit.update((v) => {
			if (!checked) {
				return [...v, link.link_id];
			} else {
				return v.filter((l) => l !== link.link_id);
			}
		});
	}
	onDestroy(() => {
		unsubscribe();
	});

	let folderIDslug = link.link_id;
	$: currPathname = $page.url.pathname.split('/').at(2) ?? '';

	$: folderIDslug = currPathname === 'all' ? link.folder_id : currPathname;
	$: isCurrentActive = $page.url.pathname.includes(`/item/${link.link_id}`);
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger on:contextmenu={openMenu}>
		<a
			href={`/app/${folderIDslug}/item/${link.link_id}/edit`}
			class={cn(
				'group/item relative flex select-none items-center justify-between rounded-lg bg-transparent p-3 transition-colors hover:bg-hover-bg active:bg-accent-color',
				{
					'bg-accent-color/30': isEdited,
					'bg-hover-bg': !isEdited && isCurrentActive
				}
			)}
		>
			<div class="flex items-center space-x-3">
				<Avatar.Root class="h-auto w-16 rounded-sm">
					<Avatar.Image
						src={link.link_thumbnail}
						alt=""
						class="h-full w-full rounded-sm"
						draggable="false"
					/>
					<Avatar.Fallback class="h-16 rounded-sm"></Avatar.Fallback>
				</Avatar.Root>
				<div>
					<h3 class="font-medium text-color">{link.link_title}</h3>
					<div>
						<span class="line-clamp-5 text-sm text-primary-text">{link.description ?? ''}</span>
					</div>
					<span class="text-secondary-text">{link.link_notes}</span>

					{#if link?.tags && link.tags.length > 0}
						<div>
							{#each link.tags as tag}
								<span class="ml-1 text-accent-color/90 hover:underline">#{tag.tag_name}</span>
							{/each}
						</div>
					{/if}
					<div class="flex items-center space-x-2 text-sm leading-4">
						<FolderOpenDot class="size-3 text-secondary-text" />
						<span class="text-secondary-text hover:underline">{link.folder_name}</span>
						<p class="text-sm text-secondary-text hover:underline">
							{link.link_hostname} ·
							{dayjs(link.added_at).format('MMM D')}
						</p>
					</div>
				</div>
			</div>
			{#if checked}
				<div class="box">+</div>
			{/if}
			<label
				class={`absolute left-2 top-1 z-[1] cursor-pointer ${isEdited ? 'visible ' : 'invisible group-hover/item:visible'}`}
				title="Select"
			>
				<input
					type="checkbox"
					bind:value={checked}
					class="cursor-pointer"
					on:click|stopPropagation={handleToggleSelectedLink}
				/>
			</label>
			<div class="invisible absolute right-2 top-2 z-[1] group-hover/item:visible">
				<div class=" flex items-center space-x-2" style="">
					<Button
						variant="ghost"
						size="sm"
						class="border bg-accent-foreground hover:border-accent-color  hover:bg-accent-foreground focus-visible:bg-accent-foreground"
					>
						<Eye class="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						class="border bg-accent-foreground hover:border-accent-color  hover:bg-accent-foreground focus-visible:bg-accent-foreground"
					>
						<Pencil class="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						class="border bg-accent-foreground hover:border-accent-color  hover:bg-accent-foreground focus-visible:bg-accent-foreground"
						on:click={async () => await moveLinksToTrash([link.link_id])}
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
		</a>
		<Separator class="my-1" />
	</ContextMenu.Trigger>
	{#if currentOpenMenu === link.link_id}
		<ContextMenu.Content class="flex flex-col bg-bg">
			<ContextMenu.Item class={cn(buttonClass, 'cursor-pointer p-0 ')}>
				<a rel="noopener noreferrer" href={link.link_url} class="flex items-center px-3">
					<ExternalLink class="text-foreground-alt mr-2 size-5" />
					Open in a new tab
				</a>
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
				on:click={async () => await goto(`/app/${folderIDslug}/item/${link.link_id}/edit`)}
				class={cn('cursor-pointer', buttonClass)}
			>
				<div class="flex items-center">
					<Pencil class="text-foreground-alt mr-2 size-5" />
					Edit
				</div>
			</ContextMenu.Item>

			<ContextMenu.Item
				on:click={async () => await moveLinksToTrash([link.link_id])}
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

<style>
	/* Hide the default checkbox */
	input[type='checkbox'] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		width: 15px;
		height: 15px;
		cursor: pointer;
	}

	/* Style the checked state to display an "X" */
	input[type='checkbox']:not(checked) {
		background-color: #61afef;
		position: relative;
	}

	input[type='checkbox']:not(checked)::before {
		content: 'X';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 10px;
		font-weight: bold;
	}
</style>
