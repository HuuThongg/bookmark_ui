<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { user } from '$lib/stores/user.store';
	import CreateFolderUI from '$lib/components/sidebar-ui/create-folder-ui.svelte';
	import I from '$lib/components/collection/i.svelte';
	import { handleLogout } from '$lib/api/auth';
	import { AppRoute } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { Plus } from 'lucide-svelte';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	import { sidebarSelectedFolderId } from '$lib/stores/folder.store';
	import TrashUi from './sidebar-ui/trashUI.svelte';

	export let defaultLayout = [65, 240, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number = 100;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		console.log('onLayoutChange');
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		console.log('onCollapse');
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		console.log('onExpand');
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	let bookmarks = [
		{ title: 'All bookmarks', count: 8 },
		{ title: 'Unsorted', count: 1 }
		// ... other bookmarks
	];

	let filters = [
		{ title: 'Favorites', count: 1 },
		{ title: 'Notes', count: 3 }
		// ... other filters
	];
	let showForm = false;

	function toggleCreateFolderUI() {
		isOpenCreatedFolderComponent.set(!$isOpenCreatedFolderComponent);
	}
</script>

<div class=" flex h-screen w-full flex-row overflow-hidden">
	<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="flex h-full  items-stretch">
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={10}
			maxSize={14}
			{onCollapse}
			{onExpand}
			style="width: {isCollapsed ? '0' : ''}; flex-grow: {isCollapsed && 0};"
		>
			<aside class={cn('  flex h-full w-full flex-col ')}>
				<div class="mt-3 flex w-full justify-between px-4 py-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="secondary">
								<Avatar.Root class="size-6">
									<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
									<Avatar.Fallback>CN</Avatar.Fallback>
								</Avatar.Root>
								<p class="pl-2">{$user?.fullname || 'Default name'}</p>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Item>
								<a href="/settings" class="h-full w-full"> Setting </a>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={async () => await handleLogout(AppRoute.ACCOUNT_LOGIN)}
								>Log out</DropdownMenu.Item
							>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button variant="ghost" size="sm" class="rounded-lg" on:click={toggleCreateFolderUI}>
						<span class="sr-only">Create a collection</span>
						<Plus class="h-5 w-5" />
					</Button>
				</div>
				<div>
					{#if $isOpenCreatedFolderComponent && $sidebarSelectedFolderId === null}
						<CreateFolderUI />
					{/if}
					<TrashUi />
					<I />
					<div class="mt-2 w-full px-5">
						<ul>
							{#each bookmarks as bookmark}
								<li>
									<span>{bookmark.title}</span>
									<span>{bookmark.count}</span>
								</li>
							{/each}
						</ul>

						<ul>
							{#each filters as filter}
								<li>
									<span>{filter.title}</span>
									<span>{filter.count}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</aside>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<!-- <slot /> -->
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={15}>
			<slot />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
