<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search, Plus, Share } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/ui/dialog';

	import { urlSchema, type UrlSchema } from '$lib/schemas';

	import { toast } from 'svelte-sonner';
	import LoadingSpinner from './shared-components/loading-spinner.svelte';
	import { currentFolderAtSlug } from '$lib/stores/folder.store';
	import { addLink } from '$lib/api/link/add';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	const folerID_Name = get(currentFolderAtSlug);
	$: form = superForm(defaults(zod(urlSchema)), {
		SPA: true,
		validators: zod(urlSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await addLink(form.data.url, folerID_Name.folder_id);
					toast.success(`Added ${form.data.url}`);
					await goto(`${window.location.pathname}/item/edit`);
				} catch (error) {
					toast.error('Error: adding a link');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<div class="mb-4 flex items-center">
	<div class="relative flex-grow">
		<Search class="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
		<Input
			type="text"
			placeholder="Search"
			class="border-gray-700 bg-gray-800 pl-8 text-gray-100"
		/>
	</div>
	<Dialog.Root>
		<Dialog.Trigger>
			<Button variant="outline" class="ml-2 border-gray-700 bg-gray-800 text-gray-100">
				<Share class="mr-2 h-4 w-4" /> Share
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
		<Popover.Trigger class="">
			<Button variant="outline" class="ml-2 border-gray-700 bg-gray-800 text-gray-100">
				<Plus class="mr-2 h-4 w-4" /> Add
			</Button>
		</Popover.Trigger>

		<Popover.Content>
			<form method="POST" action="?/addBookmarkUrl" use:enhance>
				<Form.Field {form} name="url">
					<Form.Control let:attrs>
						<Form.Label>URL</Form.Label>
						<Input {...attrs} bind:value={$formData.url} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button aria-disabled={$submitting}>
					{#if $submitting}
						<span class="h-6">
							<LoadingSpinner />
						</span>
					{:else}
						Add to {$currentFolderAtSlug.folder_name}
					{/if}
				</Form.Button>
			</form>
		</Popover.Content>
	</Popover.Root>
</div>
