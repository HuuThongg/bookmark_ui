<script context="module" lang="ts">
	import { ArrowLeft, FolderIcon, FolderOpen } from 'lucide-svelte';
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
	import { melt, type TreeView } from '@melt-ui/svelte';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import CreateFolderUi from '../sidebar-ui/create-folder-ui.svelte';
	import {
		sidebarSelectedFolderId,
		treeStructureFlattenStore,
		treeStructureStore
	} from '$lib/stores/folder.store';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	import { page } from '$app/stores';
	import { initInput } from '$lib/actions/focus';
	import { renameFolder } from '$lib/api/folder/renameFolder';
	import type { Folder } from '$lib/types/folder';
	import type { TreeItem } from '$lib/types';
	export let treeItems: TreeItem[];
	export let level = 1;
	export let isEditing: { [key: string]: boolean } = {}; // Track which folder is being edited
	let delay = 200;
	let timeout: number | undefined = undefined;
	let waiting = false;
	let clickType = '';
	let elementInput: HTMLInputElement | null = null;
	let folderStructure: TreeItem[] = [];
	$: folderStructure = $treeStructureStore;
	function changeSelectedFolderId(folderId: string) {
		console.log('folder_id', folderId);
		if (!($sidebarSelectedFolderId === folderId)) {
			sidebarSelectedFolderId.set(folderId);
		}
	}
	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');
	async function handleNameChange(event: Event, folderInfo: Folder) {
		folderInfo.folder_name = (event.target as HTMLInputElement).value; // Update folder o
	}
	async function handleSubmit(f: Folder, itemId: string) {
		await renameFolder(elementInput?.value, f.folder_id);
		isEditing[itemId] = false;
	}

	onMount(() => {
		const folder_id = $page.url.pathname.split('/').at(2);
		if (folder_id) {
			sidebarSelectedFolderId.set(folder_id);
		}
	});
</script>

{#each treeItems as { children, folderInfo }, i}
	{@const itemId = `${folderInfo.folder_id}`}
	{@const hasChildren = !!children?.length}

	<li class={level !== 1 ? 'pl-4' : ''}>
		{#if isEditing[itemId]}
			<form
				on:submit|preventDefault={async () => handleSubmit(folderInfo, itemId)}
				class="flex items-center gap-x-1 px-4"
			>
				<svelte:component this={icons['folderOpen']} class="h-4 w-4 pl-4" />
				<input
					type="text"
					id="folderName"
					class="w-full select-none focus-visible:bg-neutral-700"
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
					'flex w-full items-center gap-1 rounded-none p-1 px-4 focus:bg-neutral-700',
					($isSelected(itemId) || $sidebarSelectedFolderId === folderInfo.folder_id) &&
						'bg-neutral-700'
				)}
				use:melt={$item({ id: itemId, hasChildren })}
				aria-expanded={$isExpanded(itemId)}
				on:m-click={async () => {
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
							//let index = $treeStructureFlattenStore.findIndex((e) => e.title === folderInfo.title);
							//nextItem = $treeStructureFlattenStore[index + 1];
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
				<svelte:component this={icons['folderOpen']} class="h-4 w-4" />

				<span class="select-none pl-1">{folderInfo.folder_name}</span>

				<!-- Selected icon -->
				{#if $isSelected(itemId)}
					<p>-</p>
					<!-- <svelte:component this={icons['highlight']} class="h-4 w-4" /> -->
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
{/each}

<style>
	/* Remove focus box-shadow styling */
	li:focus {
		box-shadow: none !important;
	}
</style>
