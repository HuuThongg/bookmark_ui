<script lang="ts">
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
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

	let folderData: Folder[] = [];
	$: folderData = $folders;

	function buildTree(folders: Folder[], parentFolderID: string | null): TreeItem[] {
		const currentFolders = folders.filter((folder) => folder.subfolder_of === parentFolderID);
		// @ts-ignore: Ignore TypeScript for this function
		return currentFolders.map((folder) => {
			const children = buildTree(folders, folder.folder_id);

			return {
				folderInfo: folder,
				children: children // Correctly assign children
			};
		});
	}
	let treeItems: TreeItem[];
	$: {
		treeItems = buildTree(folderData, null);
	}
</script>

<div class="flex h-full w-full flex-col">
	<ul class="overflow-auto px-4 pb-4 pt-2" {...$tree}>
		<Tree {treeItems} />
	</ul>
</div>
