<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Cloud, Calendar, Download, SquareMinus } from 'lucide-svelte';
	import ListView from '$lib/components/view/list-view.svelte';

	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { selectedLinksMode } from '$lib/stores';
	import ActionToolbar from './action-toolbar.svelte';
	import { get } from 'svelte/store';
	import type { SelectedFolderNameID } from '$lib/types/folder';
	let folderAtSlug: SelectedFolderNameID;
	$: folderAtSlug = $currentFolderAtSlug;
	function toggleSelectedLinksMode() {
		selectedLinksMode.update((v) => !v);
	}
	//const folderAtSlug = get(currentFolderAtSlug);
</script>

<div class="mb-4 flex items-center justify-between">
	<div class="flex items-center">
		{#if $selectedLinksMode}
			<Button variant="ghost" on:click={toggleSelectedLinksMode}>
				<SquareMinus class="mr-2" />
			</Button>
		{:else}
			<Button variant="ghost" on:click={toggleSelectedLinksMode}>
				<Cloud class="mr-2" />
			</Button>
		{/if}
		<h2 class="text-xl font-semibold">{folderAtSlug.folder_name}</h2>
	</div>
	<div class="flex items-center space-x-4">
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
