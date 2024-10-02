<script lang="ts">
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { get } from 'svelte/store';
	import { folders } from '$lib/stores/folder.store'; // Assuming links and folders are stored here
	import type { Folder } from '$lib/types/folder'; // Folder and Link interfaces
	import Tree from './t.svelte';
	import type { TreeItem } from './t.svelte';

	// Create tree context
	const ctx = createTreeView({
		defaultExpanded: []
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;

	let folderData: Folder[] = get(folders);

	function buildTree(folders: Folder[], parentFolderID: string | null): TreeItem[] {
		const currentFolders = folders.filter((folder) => folder.subfolder_of === parentFolderID);

		return currentFolders.map((folder) => {
			// Recursively build the children for each folder
			const children = buildTree(folders, folder.folder_id);

			// Ensure children is always an array, even if empty
			return {
				folderInfo: folder,
				children: children // Correctly assign children
			};
		});
	}

	const treeItems: TreeItem[] = buildTree(folderData, null);
	console.log('treeItems', treeItems);
</script>

<div class="flex h-full w-[18.75rem] flex-col rounded-xl bg-white text-neutral-900">
	<ul class="overflow-auto px-4 pb-4 pt-2" {...$tree}>
		<Tree {treeItems} />
	</ul>
</div>
