<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Cloud, Calendar, Download, SquareMinus, Folder as FolderIcon } from 'lucide-svelte';
	import ListView from '$lib/components/view/list-view.svelte';

	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { links, selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import { selectedLinksMode } from '$lib/stores';
	import ActionToolbar from './action-toolbar.svelte';
	import { get } from 'svelte/store';
	import type { SelectedFolderNameID } from '$lib/types/folder';
	import { onDestroy, onMount } from 'svelte';
	import Label from '../ui/label/label.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	let folderAtSlug: SelectedFolderNameID;
	$: folderAtSlug = $currentFolderAtSlug;
	let linkIds: string[] = [];
	const unSub = links.subscribe((l) => (linkIds = l.map(({ link_id }) => link_id)));
	function toggleSelectedLinksMode() {
		selectedLinksMode.update((v) => !v);
		if ($selectedLinkIdsToEdit.length > 0) {
			selectedLinkIdsToEdit.set([]);
		} else {
			selectedLinkIdsToEdit.set(linkIds);
		}
	}
	onDestroy(() => {
		unSub();
	});
	//const folderAtSlug = get(currentFolderAtSlug);
	$: checked = $selectedLinksMode;
	$: console.log('sdsa', $selectedLinkIdsToEdit);
</script>

<div class="mb-4 flex items-center justify-between">
	<div class="flex items-center">
		<div class="relative">
			{#if !$selectedLinksMode}
				<FolderIcon class="pointer-events-none absolute left-0 top-0 z-10" />
			{/if}
			<Checkbox id="terms" bind:checked on:click={toggleSelectedLinksMode} class="border-none " />
		</div>
		<Label title="Select all links" class="flex items-center gap-x-2 pl-4 text-xl font-semibold">
			<span class="">All in</span>
			<h2 class="">{folderAtSlug.folder_name}</h2>
		</Label>
	</div>
	<div class="flex h-10 items-center space-x-4">
		{#if $selectedLinksMode}
			<ActionToolbar />
		{:else}
			<Button variant="ghost" size="sm" class="text-gray-400">
				<Calendar class="mr-2 h-4 w-4" /> By date
			</Button>
			<ListView />
			<Button variant="ghost" size="sm" class="text-gray-400">
				<Download class="mr-2 h-4 w-4" /> Export
			</Button>
		{/if}
	</div>
</div>
