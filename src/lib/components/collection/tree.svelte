<script context="module" lang="ts">
	import { ArrowLeft, Folder, FolderOpen } from 'lucide-svelte';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';

	type Icon = 'svelte' | 'folder' | 'js';

	export type TreeItem = {
		title: string;
		icon: Icon;
		children?: TreeItem[];
	};

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
	import type { MeltEventHandler } from '@melt-ui/svelte/internal/types';
	import { goto } from '$app/navigation';
	import CreateFolderUi from '../sidebar-ui/create-folder-ui.svelte';

	export let treeItems: TreeItem[];
	export let level = 1;

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected },
		states: {
			expanded: { get },
			selectedItem
		}
	} = getContext<TreeView>('tree');

	const expandedItems = get(); // Call the get function to retrieve expanded items
	console.log('Expanded Items:', expandedItems);
	$: console.log('selectedItem', $selectedItem);

	// State to track the currently focused item index
	let focusedIndex = 0;
</script>

{#each treeItems as { title, icon, children }, i}
	{@const itemId = `${title}-${i}`}
	{@const hasChildren = !!children?.length}

	<li class={level !== 1 ? 'pl-4' : ''}>
		<button
			class="flex items-center gap-1 rounded-md p-1 focus:bg-magnum-200"
			use:melt={$item({ id: itemId, hasChildren })}
			aria-expanded={$isExpanded(itemId)}
			on:m-keydown={() => console.log('d', itemId)}
			data-id={itemId}
		>
			<!-- Toggle icon -->
			{#if icon === 'folder' && hasChildren && $isExpanded(itemId)}
				<svelte:component this={icons['folderOpen']} class="h-4 w-4" />
			{:else}
				<svelte:component this={icons[icon]} class="h-4 w-4" />
			{/if}

			<span class="select-none">{title}</span>

			<!-- Selected icon -->
			{#if $isSelected(itemId)}
				<svelte:component this={icons['highlight']} class="h-4 w-4" />
			{/if}
		</button>
		<div>
			<CreateFolderUi />
		</div>

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
