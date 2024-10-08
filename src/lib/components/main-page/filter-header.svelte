<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Calendar, Download, Folder as FolderIcon } from 'lucide-svelte';
	import ListView from '$lib/components/view/list-view.svelte';

	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { links, selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import { selectedLinksMode } from '$lib/stores';
	import ActionToolbar from './action-toolbar.svelte';
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

<div class="mx-2 mb-4 flex items-center justify-between">
	<div class="flex items-center">
		<div class="relative">
			{#if !$selectedLinksMode}
				<FolderIcon class="pointer-events-none absolute left-0 top-0 z-10" />
			{/if}
			<Checkbox
				id="terms"
				bind:checked
				on:click={toggleSelectedLinksMode}
				class="border-none p-1"
			/>
		</div>
		<Label title="Select all links" class="flex items-center gap-x-2 pl-3 text-base font-semibold">
			<span class="">All</span>
			<h2 class="">{folderAtSlug.folder_name}</h2>
		</Label>
	</div>
	<div class="flex h-10 items-center text-primary-text">
		{#if $selectedLinksMode}
			<ActionToolbar />
		{:else}
			<Button variant="ghost" size="sm" class="">
				<Calendar class="mr-2 size-5 stroke-primary-text" /> By date
			</Button>
			<ListView />
			<Button variant="ghost" size="sm" class="">
				<Download class="mr-2 size-5 stroke-primary-text" /> Export
			</Button>
		{/if}
	</div>
</div>
