<script lang="ts">
	import { createTreeView } from '@melt-ui/svelte';
	import { onMount, setContext } from 'svelte';
	import { sortableFolderStore, treeSortedStructureStore } from '$lib/stores/folder.store';
	import Tree from './t.svelte';
	import type { TreeItem1 } from '$lib/types';
	import Sortable from 'sortablejs';
	import type { MinimalFolder } from '$lib/types/folder';
	import { buildTree2 } from '$lib/utils';
	import { saveFolderSort } from '$lib/api/folder/saveSortedStructre';
	const ctx = createTreeView({
		defaultExpanded: []
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;
	let sortedFs: MinimalFolder[] = [];
	$: sortedFs = $sortableFolderStore;
	let sortedTree: TreeItem1[] = [];
	$: {
		sortedTree = buildTree2(sortedFs, null);
	}

	let rootElement: HTMLUListElement;

	onMount(() => {
		initializeSortable(rootElement, sortedTree, undefined);

		initSortableRecursive(sortedTree, null, 0);
	});

	// Recursive function to initialize Sortable for nested lists
	const initSortableRecursive = (items: TreeItem1[], parentIndex: string | null, depth: number) => {
		items.forEach((item, index) => {
			const id = parentIndex === null ? `child-${index}` : `${parentIndex}-${index}`;

			let childElement = document.getElementById(id);
			if (childElement) {
				initializeSortable(childElement, items, index);
			}

			// Recursively initialize Sortable for children if they exist
			if (item.children && item.children.length) {
				initSortableRecursive(item.children, id, depth + 1);
			}
		});
	};

	// Initialize Sortable for a given element
	const initializeSortable = (
		element: HTMLElement,
		parentArray: TreeItem1[],
		index: number | undefined
	) => {
		Sortable.create(element, {
			group: 'nested',
			animation: 150,
			onEnd: (e) => {
				const newSortedArray = sort1(e);
				newSortedArray.forEach((folder, index) => {
					folder.folderInfo.folder_order = index;
				});
				//sortedTree = newSortedArray;
				updateStoreAndSync1(newSortedArray);
			}
		});
	};
	const updateStoreAndSync1 = (newSortedArray) => {
		//sortableFolderStore.set(newSortedArray);
		saveSortedStructure(newSortedArray);
	};
	const sort1 = (e: Sortable.SortableEvent) => {
		return arrayMove1([...sortedTree], e.oldIndex!, e.newIndex!);
		console.log('move sort', sortedTree);
	};

	function arrayMove1(orig: TreeItem1[], fromIndex: number, toIndex: number) {
		let slicedArr = JSON.parse(JSON.stringify(orig));

		//for (let i = 0; i < slicedArr.length; i++) {
		//	console.log(`Element at index ${i}:`, slicedArr[i].folderInfo.folder_name);
		//}

		var element = slicedArr[fromIndex];

		slicedArr.splice(fromIndex, 1);

		if (toIndex > slicedArr.length) {
			toIndex = slicedArr.length;
		}

		slicedArr.splice(toIndex + 1, 0, element);

		//console.log('Updated order:');
		//for (let i = 0; i < slicedArr.length; i++) {
		//	console.log(`Element at index ${i}:`, slicedArr[i].folderInfo.folder_name);
		//}

		return slicedArr;
	}
	//const sort = (e: Sortable.SortableEvent) => {
	//	sortedTree = arrayMove([...sortedTree], e.oldIndex!, e.newIndex!);
	//};
	//
	//const sortNested = (e: Sortable.SortableEvent, parentArray: TreeItem1[], parentIndex: number) => {
	//	console.log('parentIndex, ', parentIndex);
	//	console.log('oldIndex', e.oldIndex);
	//	console.log('newIndex', e.newIndex);
	//	let newChildren = arrayMove([...parentArray[parentIndex].children], e.oldIndex!, e.newIndex!);
	//	parentArray[parentIndex].children = newChildren;
	//};

	const saveSortedStructure = async (newSortedArray: MinimalFolder[]) => {
		await saveFolderSort(newSortedArray);
	};
</script>

<div class="flex h-full w-full flex-col">
	<div class="mt-2 pl-4">Collections</div>
	<ul bind:this={rootElement} class="overflow-auto pt-2" {...$tree}>
		<Tree treeItems={sortedTree} />
	</ul>
</div>
