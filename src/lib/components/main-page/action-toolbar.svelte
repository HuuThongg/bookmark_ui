<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import { selectedLinksMode } from '$lib/stores';
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import {
		Folder,
		Hash,
		Trash,
		Download,
		ExternalLink,
		MoreHorizontal,
		Star,
		StarOff
	} from 'lucide-svelte';
	import { page } from '$app/stores';
	import TagInput from '../edit.web-page/tag-input.svelte';
	let moveDialogOpen = false;
	let addTagsDialogOpen = false;
	let deleteDialogOpen = false;

	import { type Tag } from '@melt-ui/svelte';
	import BulkTag from './bulk-tag.svelte';
	$: isIconNameHidden = $page.url.pathname.includes('/item');
	function handleOpen() {
		// Implement open functionality
	}

	function handleDelete() {
		// Implement delete functionality
	}

	function addToFavorites() {
		// Implement add to favorites functionality
	}

	function removeFromFavorites() {
		// Implement remove from favorites functionality
	}

	function deleteTags() {
		// Implement delete tags functionality
	}
	function toggleSelectedLinksMode() {
		selectedLinksMode.update((v) => !v);
	}
	const tagsList: Tag[] = [];
</script>

{#if $selectedLinksMode}
	<div class="flex gap-x-1 rounded-md">
		<Dialog bind:open={moveDialogOpen}>
			<DialogTrigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" class="p-2 text-primary-text">
					<Folder class="mr-2 size-4" />
					<span class={isIconNameHidden ? 'hidden' : 'block'}>Move</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Move Item</DialogTitle>
				</DialogHeader>
				<!-- Add your move dialog content here -->
			</DialogContent>
		</Dialog>

		<Dialog bind:open={addTagsDialogOpen}>
			<DialogTrigger>
				<Button variant="ghost" class="p-2 text-primary-text">
					<Hash class="mr-2 h-4 w-4" />
					<span class={isIconNameHidden ? 'hidden' : 'block'}>Add tags</span>
				</Button>
			</DialogTrigger>
			<DialogContent class="bg-sidebar-bg">
				<BulkTag />
			</DialogContent>
		</Dialog>
		<Dialog bind:open={deleteDialogOpen}>
			<DialogTrigger>
				<Button variant="ghost" size="sm" class="p-2 text-primary-text" on:click={handleDelete}>
					<Trash class="mr-2 size-4" />
					<span class={isIconNameHidden ? 'hidden' : 'block'}>Delete</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Tags</DialogTitle>
				</DialogHeader>
				<!-- Add your add tags dialog content here -->
			</DialogContent>
		</Dialog>

		<Button variant="ghost" size="sm" class="p-2 text-primary-text" on:click={handleOpen}>
			<ExternalLink class="mr-2 size-4" />
			<span class={isIconNameHidden ? 'hidden' : 'block'}>Open</span>
		</Button>

		<DropdownMenu>
			<DropdownMenuTrigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm" class="p-2 text-primary-text">
					<MoreHorizontal class="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem on:click={addToFavorites}>
					<Star class="mr-2 size-4" />
					Add to Favorites
				</DropdownMenuItem>
				<DropdownMenuItem on:click={removeFromFavorites}>
					<StarOff class="mr-2 size-4" />
					Remove from Favorites
				</DropdownMenuItem>
				<DropdownMenuItem on:click={deleteTags}>
					<Trash class="mr-2 size-4 " />
					Delete Tags
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
{/if}
