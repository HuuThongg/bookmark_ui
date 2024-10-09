<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { user } from '$lib/stores/user.store';
	import CreateFolderUI from '$lib/components/sidebar-ui/create-folder-ui.svelte';
	import I from '$lib/components/collection/i.svelte';
	import { handleLogout } from '$lib/api/auth';
	import { AppRoute } from '$lib/constants';
	import { cn, getCookie } from '$lib/utils';
	import { Plus } from 'lucide-svelte';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	import { sidebarSelectedFolderId } from '$lib/stores/folder.store';
	import TrashUi from './sidebar-ui/trashUI.svelte';
	import AllCollection from './sidebar-ui/AllCollection.svelte';
	import { getTagStats } from '$lib/api/link/getTagStats';

	export let defaultLayout = [65];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number = 100;

	let isCollapsed = defaultCollapsed;
	let tagStatsPromise = getTagStats();
	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}; path=/app`;
	}

	function onCollapse() {
		isCollapsed = true;
		setCollapsedCookie(isCollapsed);
	}

	function onExpand() {
		isCollapsed = false;
		setCollapsedCookie(isCollapsed);
	}

	function setCollapsedCookie(value: boolean) {
		document.cookie = `PaneForge:collapsed=${value}; path=/app;`;
		window.dispatchEvent(new Event('collapsedCookieChanged'));
	}
	window.addEventListener('collapsedCookieChanged', () => {
		const newCollapsedCookie = getCookie('PaneForge:collapsed');
		if (newCollapsedCookie) {
			isCollapsed = JSON.parse(newCollapsedCookie);
		}
	});
	let bookmarks = [
		{ title: 'All bookmarks', count: 8 },
		{ title: 'Unsorted', count: 1 }
	];

	let filters = [
		{ title: 'Favorites', count: 1 },
		{ title: 'Notes', count: 3 }
	];

	function toggleCreateFolderUI() {
		isOpenCreatedFolderComponent.set(!$isOpenCreatedFolderComponent);
	}
</script>

<div class=" flex h-screen w-full flex-row overflow-hidden bg-bg">
	<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="flex h-full  items-stretch ">
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={12}
			maxSize={40}
			{onCollapse}
			{onExpand}
			class="md:max-w-[400px]"
			style="width: {isCollapsed ? '0' : ''}; flex-grow: {isCollapsed && 0}; min-width: {isCollapsed
				? 'auto'
				: '200px'};"
		>
			<aside class={cn('  flex h-full w-full  flex-col bg-sidebar-bg')}>
				<div class="mt-3 flex w-full justify-between px-2 py-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost" class="pl-2">
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
					<Button
						variant="ghost"
						size="sm"
						class=" rounded-lg px-2"
						on:click={toggleCreateFolderUI}
					>
						<span class="sr-only">Create a collection</span>
						<Plus class="h-5 w-5" />
					</Button>
				</div>
				<div class="flex h-full flex-col space-y-2 overflow-y-auto">
					{#if $isOpenCreatedFolderComponent && $sidebarSelectedFolderId === null}
						<CreateFolderUI />
					{/if}
					<AllCollection />
					<TrashUi />
					<I />
					<div class=" w-full justify-self-end">
						<ul class="font-sans font-light text-color">
							{#if tagStatsPromise}
								{#await tagStatsPromise}
									<p>...waiting</p>
								{:then tags}
									<h4 class="px-5 py-1 text-sm text-secondary-text">Tags {tags.length}</h4>
									{#each tags as tag}
										<div
											class="flex cursor-pointer items-center justify-between rounded px-5 py-0 text-sm hover:bg-hover-bg"
										>
											<div class="flex items-center">
												<span class="mr-2 text-lg">#</span>
												<span>{tag.tag_name}</span>
											</div>
											<span>{tag.amount}</span>
										</div>
									{/each}
								{:catch error}
									<p style="color: red">{error.message}</p>
								{/await}
							{/if}
						</ul>
					</div>
				</div>
			</aside>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane>
			<slot />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
