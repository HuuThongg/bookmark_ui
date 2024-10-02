<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Index from '$lib/components/collection/index.svelte';
	import { user } from '$lib/stores/user.store';
	import CreateFolderUI from '$lib/components/sidebar-ui/create-folder-ui.svelte';
	import I from '$lib/components/collection/i.svelte';
	import { handleLogout } from '$lib/api/auth';
	import { AppRoute } from '$lib/constants';

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
	onMount(() => {
		// Initialize data or fetch bookmarks from a server
	});
</script>

<div class="flex h-screen w-full flex-row overflow-clip">
	<Resizable.PaneGroup direction="horizontal" class="flex h-screen w-full flex-row overflow-clip">
		<Resizable.Pane>
			<aside
				class="relative z-[6] flex w-[300px] min-w-[200px] max-w-[40%] flex-col will-change-auto"
			>
				<!-- Header -->
				<div class="flex w-full px-1 py-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline">
								<Avatar.Root class="size-6">
									<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
									<Avatar.Fallback>CN</Avatar.Fallback>
								</Avatar.Root>
								<p class="pl-2">{$user.fullname || 'Default name'}</p>
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
					<Button on:click={() => (showForm = !showForm)}>Plus</Button>
				</div>
				<div>
					<div>collection</div>
					{#if showForm}
						<CreateFolderUI />
						<div>Hello</div>
					{/if}
					<div class="h-[500px] w-full">
						<I />
					</div>
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
			</aside>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane>
			<main class="h-full w-full max-w-full">
				<slot />
			</main>
			<aside class="nested-slot">
				<slot name="nested" />
			</aside>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
