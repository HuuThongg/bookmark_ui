<script context="module" lang="ts">
	import { ArrowLeft, FolderIcon, FolderOpen, Trash } from 'lucide-svelte';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';

	export const icons = {
		svelte: Svelte,
		folder: FolderIcon,
		folderOpen: FolderOpen,
		js: JS,
		highlight: ArrowLeft
	};
</script>

<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { melt, type TreeView } from '@melt-ui/svelte';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import CreateFolderUi from '../sidebar-ui/create-folder-ui.svelte';
	import { sidebarSelectedFolderId } from '$lib/stores/folder.store';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	import { page } from '$app/stores';
	import { initInput } from '$lib/actions/focus';
	import { renameFolder } from '$lib/api/folder/renameFolder';
	import type { MinimalFolder } from '$lib/types/folder';
	import type { TreeItem1 } from '$lib/types';
	import { buttonVariants } from '../ui/button';
	import Button from '../ui/button/button.svelte';
	import { TriangleAlert } from 'lucide-svelte';
	import { deleteFolder } from '$lib/api/folder/deleteFolder';
	export let treeItems: TreeItem1[];
	export let level = 1;
	export let isEditing: { [key: string]: boolean } = {};
	let delay = 250;
	let timeout: number | undefined = undefined;
	let waiting = false;
	let elementInput: HTMLInputElement | null = null;
	function changeSelectedFolderId(folderId: string) {
		if (!($sidebarSelectedFolderId === folderId)) {
			sidebarSelectedFolderId.set(folderId);
		}
	}
	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');
	async function handleNameChange(event: Event, folderInfo: MinimalFolder) {
		folderInfo.folder_name = (event.target as HTMLInputElement).value; // Update folder o
	}
	async function handleSubmit(f: MinimalFolder, itemId: string) {
		await renameFolder(elementInput?.value, f.folder_id);
		isEditing[itemId] = false;
	}

	onMount(() => {
		const folder_id = $page.url.pathname.split('/').at(2);
		if (folder_id) {
			sidebarSelectedFolderId.set(folder_id);
		}
	});

	let currentOpenMenu: string | null = null;
	function handleFolderTreeContextMenu(folder_id: string) {
		currentOpenMenu = folder_id;
	}

	function handleDeleteFolder(folder_id: string) {
		deleteFolder([folder_id]);
	}

	function toggleCreateFolderUI(folder_id: string) {
		//console.log('create-folder-ui');
		sidebarSelectedFolderId.set(folder_id);
		//console.log('isOpenCreatedFolderComponent', $isOpenCreatedFolderComponent);
		//console.log('se', $sidebarSelectedFolderId);
		isOpenCreatedFolderComponent.set(!$isOpenCreatedFolderComponent);

		//console.log('after derComponent', $isOpenCreatedFolderComponent);
	}
</script>

{#each treeItems as { children, folderInfo }, i}
	{@const itemId = `${folderInfo.folder_id}`}
	{@const hasChildren = !!children.length}

	<AlertDialog.Root>
		<ContextMenu.Root>
			<ContextMenu.Trigger on:contextmenu={() => handleFolderTreeContextMenu(folderInfo.folder_id)}>
				<li class={cn('hover:bg-hover-bg', level !== 1 ? 'pl-4' : '')} id={`child-${i}`}>
					{#if isEditing[itemId]}
						<form
							on:submit|preventDefault={async () => handleSubmit(folderInfo, itemId)}
							class="flex items-center gap-x-1 bg-hover-bg px-4"
						>
							<svelte:component this={icons['folderOpen']} class="size-5 stroke-primary-text" />
							<input
								type="text"
								id="folderName"
								class="w-full select-none bg-hover-bg pl-2 focus-visible:outline-0"
								bind:this={elementInput}
								bind:value={folderInfo.folder_name}
								on:input={(event) => handleNameChange(event, folderInfo)}
								on:focusout={() => (isEditing[itemId] = false)}
								use:initInput
							/>
						</form>
					{:else}
						<button
							class={cn(
								'flex w-full items-center gap-1 rounded-none p-1 px-4 focus:bg-hover-bg',
								($isSelected(itemId) || $sidebarSelectedFolderId === folderInfo.folder_id) &&
									'bg-hover-bg'
							)}
							use:melt={$item({ id: itemId, hasChildren })}
							aria-expanded={$isExpanded(itemId)}
							on:m-click={async () => {
								console.log('waiting', waiting);
								if (waiting) {
									clearTimeout(timeout);
									isEditing[itemId] = true;
									waiting = false;
									return;
								}
								waiting = true;
								timeout = setTimeout(() => {
									changeSelectedFolderId(folderInfo.folder_id);
									isOpenCreatedFolderComponent.set(false);
									goto(`/app/${itemId}`, { keepFocus: true });
									waiting = false;
								}, delay);
							}}
							on:m-keydown={async (e) => {
								let nextItem;
								if (e.detail.originalEvent.code === 'ArrowDown') {
									if ($isExpanded(itemId) && treeItems[i]?.children?.[0]) {
										nextItem = treeItems[i].children[0];
									} else if (treeItems[i + 1]) {
										nextItem = treeItems[i + 1]; // Next sibling
									} else {
										//console.log('d', $treeStructureFlattenStore);
										//let index = $treeSortedStructureFlattenStore.findIndex((e) => e.title === folderInfo.title);
										//nextItem = $treeSortedStructureFlattenStore[index + 1];
									}
									await goto(`/app/${nextItem.folder_id}`, { keepFocus: true });
								}
								if (e.detail.originalEvent.code === 'ArrowUp') {
									if ($isExpanded(itemId) && treeItems[i]?.children?.[0]) {
										nextItem = treeItems[i].children[0]; // First child
									} else if (treeItems[i - 1]) {
										nextItem = treeItems[i - 1];
									} else {
										//let index = $treeStructureFlattenStore.findIndex((e) => e.title === folderInfo.title);
										//nextItem = $treeStructureFlattenStore[index - 1];
									}
									await goto(`/app/${nextItem.folder_id}`, { keepFocus: true });
								}
							}}
						>
							<!-- Toggle icon -->
							<!-- {#if hasChildren && $isExpanded(itemId)} -->
							<svelte:component this={icons['folderOpen']} class="size-5 stroke-primary-text" />

							<span class="select-none pl-1 text-color">{folderInfo.folder_name}</span>

							<!-- Selected icon -->
							{#if $isSelected(itemId)}
								<p>-</p>
							{/if}
						</button>
					{/if}
					{#if $isOpenCreatedFolderComponent && $sidebarSelectedFolderId === itemId}
						<CreateFolderUi />
					{/if}
					{#if children}
						<ul use:melt={$group({ id: itemId })}>
							<svelte:self treeItems={children} level={level + 1} />
						</ul>
					{/if}
				</li>
			</ContextMenu.Trigger>

			{#if currentOpenMenu === folderInfo.folder_id}
				<ContextMenu.Content class="flex flex-col bg-bg p-0 py-[6px] text-left">
					<ContextMenu.Item
						class={buttonVariants({
							variant: 'outline',
							class: 'h-auto cursor-pointer justify-start rounded-none border-none px-3'
						})}
						on:click={() => {
							changeSelectedFolderId(folderInfo.folder_id);
							isOpenCreatedFolderComponent.set(true);
						}}
					>
						<div class="flex items-center">Create Nested collection</div>
					</ContextMenu.Item>
					<ContextMenu.Item
						class={buttonVariants({
							variant: 'outline',
							class: 'h-auto cursor-pointer justify-start rounded-none border-none px-3'
						})}
					>
						<div class="flex items-center">Select</div>
					</ContextMenu.Item>

					<ContextMenu.Separator class="mx-0" />
					<ContextMenu.Item
						class={buttonVariants({
							variant: 'outline',
							class: 'h-auto cursor-pointer justify-start rounded-none border-none px-3'
						})}
						on:click={() => {
							console.log('item', itemId);
							console.log('hasChildren', hasChildren);

							console.log('child', folderInfo);
							isEditing[itemId] = true;
						}}
					>
						<div class="flex items-center">Rename</div>
					</ContextMenu.Item>

					<ContextMenu.Item
						class={buttonVariants({
							variant: 'outline',
							class: 'h-auto cursor-pointer justify-start rounded-none border-none px-3'
						})}
					>
						<div class="flex items-center">Share</div>
					</ContextMenu.Item>
					<ContextMenu.Separator class="mx-0" />
					<AlertDialog.Trigger asChild let:builder>
						<ContextMenu.Item
							class={buttonVariants({
								variant: 'outline',
								class: 'h-auto cursor-pointer justify-start rounded-none border-none px-3 py-1'
							})}
						>
							<Button
								builders={[builder]}
								variant="outline"
								class="h-auto w-full justify-start rounded-none border-none bg-transparent p-0 hover:bg-transparent hover:text-black"
								>Delete</Button
							>
						</ContextMenu.Item>
					</AlertDialog.Trigger>
				</ContextMenu.Content>
			{/if}
		</ContextMenu.Root>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>
					<span><TriangleAlert class="size-5" /></span>Are you absolutely sure?</AlertDialog.Title
				>
				<AlertDialog.Description>
					Are you sure you want to delete this collection? All bookmarks within the collection will
					be moved to trash
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action on:click={() => handleDeleteFolder(folderInfo.folder_id)}
					>Delete</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/each}

<style>
	/* Remove focus box-shadow styling */
	li:focus {
		box-shadow: none !important;
	}
</style>
