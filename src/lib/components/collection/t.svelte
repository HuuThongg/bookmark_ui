<script context="module" lang="ts">
	import { ArrowLeft, Folder, FolderOpen } from 'lucide-svelte';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';
	export interface TreeItem {
		children: TreeItem[];
		folderInfo: Folder;
	}
	export const icons = {
		svelte: Svelte,
		folder: Folder,
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
	import { sidebarSelectedFolderId } from '$lib/stores/folder.store';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	import { page } from '$app/stores';
	export let treeItems: TreeItem[];
	export let level = 1;
	export let isEditing: { [key: string]: boolean } = {}; // Track which folder is being edited
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
	function handleNameChange(event: Event, folderInfo: Folder) {
		folderInfo.folder_name = (event.target as HTMLInputElement).value; // Update folder o
		console.log('hello', folderInfo.folder_name);
	}
	function handleSubmit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		},
		f: Folder
	) {
		console.log('handleSubmit');
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
			<form on:submit={(event) => handleSubmit(event, folderInfo)} class="flex items-center gap-1">
				<input
					type="text"
					class="select-none"
					bind:value={folderInfo.folder_name}
					on:input={(event) => handleNameChange(event, folderInfo)}
				/>
				<button type="submit" class="rounded-md p-1">Save</button>
			</form>
		{:else}
			<button
				class={cn(
					'flex w-full items-center gap-1 rounded-none p-1 px-4 focus:bg-neutral-700',
					$isSelected(itemId) ||
						($sidebarSelectedFolderId === folderInfo.folder_id && 'bg-neutral-700')
				)}
				use:melt={$item({ id: itemId, hasChildren })}
				aria-expanded={$isExpanded(itemId)}
				on:m-click={async () => {
					console.log('srat onclick');
					changeSelectedFolderId(folderInfo.folder_id);
					isOpenCreatedFolderComponent.set(false);
					await goto(`/app/${itemId}`, { keepFocus: true });
					console.log('end onclick');
				}}
				on:m-keydown={async () => {
					console.log('start keydown');
					changeSelectedFolderId(folderInfo.folder_id);
					//await goto(`/app/${itemId}`, { keepFocus: true });
					console.log('/end keydown');
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
