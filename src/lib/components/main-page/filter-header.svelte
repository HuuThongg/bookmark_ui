<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Calendar, Download, Folder as FolderIcon, LoaderIcon } from 'lucide-svelte';
	import ListView from '$lib/components/view/list-view.svelte';

	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { allLinks, links, selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import { searching, selectedLinksMode } from '$lib/stores';
	import ActionToolbar from './action-toolbar.svelte';
	import type { SelectedFolderNameID } from '$lib/types/folder';
	import { onDestroy, onMount } from 'svelte';
	import Label from '../ui/label/label.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	let folderAtSlug: SelectedFolderNameID;
	$: folderAtSlug = $currentFolderAtSlug!;
	let linkIds: string[] = [];
	let unsubscribe = () => {};
	$: {
		unsubscribe();

		if (folderAtSlug) {
			unsubscribe = links.subscribe((l) => (linkIds = l.map(({ link_id }) => link_id)));
		} else {
			unsubscribe = allLinks.subscribe((l) => (linkIds = l.map(({ link_id }) => link_id)));
		}
	}
	function toggleSelectedLinksMode() {
		selectedLinksMode.update((v) => !v);
		if ($selectedLinkIdsToEdit.length > 0) {
			selectedLinkIdsToEdit.set([]);
		} else {
			selectedLinkIdsToEdit.set(linkIds);
		}
	}
	$: isIconNameHidden = $page.url.pathname.includes('/item');
	beforeNavigate(() => {
		currentFolderAtSlug.set(null);
	});
	onDestroy(() => {
		unsubscribe();
	});
	//const folderAtSlug = get(currentFolderAtSlug);
	$: checked = $selectedLinksMode;
</script>

<div class="mx-2 mb-4 flex items-center justify-between">
	{#if $searching}
		<LoaderIcon class="animate-spin" />
	{:else}
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
			<Label
				title="Select all links"
				class="flex items-center gap-x-2 pl-3 text-base font-semibold"
			>
				<span class="">All</span>
				<h2 class="">{folderAtSlug?.folder_name ?? 'bookmarks'}</h2>
			</Label>
		</div>
	{/if}
	<div class="flex h-10 items-center text-primary-text">
		{#if $selectedLinksMode}
			<ActionToolbar />
		{:else}
			<Button variant="ghost" size="sm" class="">
				<Calendar class="mr-2 size-5 stroke-primary-text" />
				<span class={isIconNameHidden ? 'hidden' : 'block'}>By date</span>
			</Button>
			<ListView />
			<Button variant="ghost" size="sm" class="">
				<Download class="mr-2 size-5 stroke-primary-text" />
				<span class={isIconNameHidden ? 'hidden' : 'block'}>Export</span>
			</Button>
		{/if}
	</div>
</div>
