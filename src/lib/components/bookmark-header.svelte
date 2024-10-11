<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search, Plus, Share, X, AlignLeft } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/ui/dialog';

	import { urlSchema } from '$lib/schemas';
	import { searchInputFocused } from '$lib/stores';
	import { toast } from 'svelte-sonner';
	import LoadingSpinner from './shared-components/loading-spinner.svelte';
	import { currentFolderAtSlug, folderName, foldersFound } from '$lib/stores/folder.store';
	import { addLink } from '$lib/api/link/add';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { query } from '$lib/stores';
	import { searchLinksAndFolders } from '$lib/api/searchLinkAndFolder';
	import { debounce } from '@melt-ui/svelte/internal/helpers';
	import { linksFound } from '$lib/stores/link.store';
	import { cn, getCookie } from '$lib/utils';
	import { page } from '$app/stores';
	$: folerID_Name = $currentFolderAtSlug;
	$: form = superForm(defaults(zod(urlSchema)), {
		SPA: true,
		validators: zod(urlSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					let folder_id: string | null = null;
					if (folerID_Name) {
						folder_id = folerID_Name.folder_id;
					}
					const link = await addLink(form.data.url, folder_id);
					toast.success(`Added ${form.data.url}`);
					if (!link) return;
					await goto(`/app/${$currentFolderAtSlug?.folder_id}/item/${link.link_id}/edit`);
				} catch (error) {
					toast.error('Error: adding a link');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);

	async function handleSearchFormSubmit() {
		console.log('helllllo');
		await handleSearchInput();
	}
	async function handleSearchInput() {
		if ($query === '') {
			foldersFound.set([]);

			linksFound.set([]);

			return;
		}

		await searchLinksAndFolders($query);

		//await highlightSearchResults();
	}
	function handleSearchInputKeyDown(e: KeyboardEvent) {
		if (e.code === 'Space') e.preventDefault();
	}
	async function handleSearchFocus() {
		searchInputFocused.set(true);
	}
	function handleClearSearch() {
		$query = '';

		searchInputFocused.set(false);

		foldersFound.set([]);

		linksFound.set([]);

		const input = document.getElementById('search') as HTMLInputElement | null;

		if (input === null) return;

		input.focus();
	}
	let isShowSidebarToggle = false;

	$: isIconNameHidden = $page.url.pathname.includes('/item');
	window.addEventListener('collapsedCookieChanged', () => {
		const newCollapsedCookie = getCookie('PaneForge:collapsed');
		if (newCollapsedCookie) {
			isShowSidebarToggle = JSON.parse(newCollapsedCookie);
		}
	});
	function openSideBar() {
		document.cookie = `PaneForge:collapsed=false; path=/app;`;
		window.dispatchEvent(new Event('collapsedCookieChanged'));
	}
</script>

<div class="m-1 mx-2 flex items-center">
	<Button
		on:click={openSideBar}
		class={cn('-ml-2 mr-1 p-2', isShowSidebarToggle ? 'block' : 'hidden')}
		variant="ghost"
	>
		<AlignLeft class="size-5" />
	</Button>
	<div class="relative flex-grow">
		<form on:submit|preventDefault|stopPropagation={handleSearchFormSubmit}>
			<Search class="absolute left-2 top-1/2 -translate-y-1/2 transform text-primary-text" />
			<Input
				class=" pl-10 "
				type="search"
				name="search"
				id="search"
				placeholder="Search..."
				autocomplete="off"
				bind:value={$query}
				on:keydown={handleSearchInputKeyDown}
				on:focus={handleSearchFocus}
				on:input={debounce(handleSearchInput, 400)}
			/>
		</form>

		{#if $query === 'x'}
			<div class="clear">
				<X on:click={handleClearSearch} on:keyup />
			</div>
		{/if}
	</div>
	<Dialog.Root>
		<Dialog.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" class="ml-2 border-0 ">
				<Share class=" size-4" />
				<span class={isIconNameHidden ? 'hidden' : 'ml-3 block'}>Share</span>
			</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Collection Name</Dialog.Title>
				<Dialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>

	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button builders={[builder]} variant="default" class="ml-2 text-base font-semibold">
				<Plus class="size-5" />

				<span class={isIconNameHidden ? 'hidden' : 'ml-3 block'}>Add</span>
			</Button>
		</Popover.Trigger>

		<Popover.Content>
			<form method="POST" action="?/addBookmarkUrl" use:enhance>
				<Form.Field {form} name="url">
					<Form.Control let:attrs>
						<Form.Label>URL</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.url}
							placeholder="/example.com"
							on:keydown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault(); // Prevent default Enter behavior
									if ($formData.url) {
										form.submit();
									}
								}
							}}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button aria-disabled={$submitting}>
					Add to {$currentFolderAtSlug?.folder_name ?? 'Unsorted'}
					{#if $submitting}
						<span class="ml-2 h-6">
							<LoadingSpinner />
						</span>
					{/if}
				</Form.Button>
			</form>
		</Popover.Content>
	</Popover.Root>
</div>
