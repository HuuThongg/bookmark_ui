<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Cloud, Calendar, Download, SquareMinus } from 'lucide-svelte';
	import ListView from '$lib/components/view/list-view.svelte';

	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { selectedLinksMode } from '$lib/stores';
	import ActionToolbar from './action-toolbar.svelte';

	function toggleSelectedLinksMode() {
		selectedLinksMode.update((v) => !v);
	}
</script>

<div class="mb-4 flex items-center justify-between">
	<div class="flex items-center">
		{#if $selectedLinksMode}
			<Button on:click={toggleSelectedLinksMode}>
				<SquareMinus class="mr-2" />
			</Button>
		{:else}
			<Button on:click={toggleSelectedLinksMode}>
				<Cloud class="mr-2" />
			</Button>
		{/if}
		<h2 class="text-xl font-semibold">{$currentFolderAtSlug.folder_name}</h2>
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
