<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { folderSchema } from '$lib/schemas';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { CreateFolder } from '$lib/api/folder/createFolder';
	import { inputClass } from '$lib/utils';
	import { initInput } from '$lib/actions/focus';
	import { sidebarSelectedFolderId } from '$lib/stores/folder.store';
	import { isOpenCreatedFolderComponent } from '$lib/stores';
	$: form = superForm(defaults(zod(folderSchema)), {
		SPA: true,
		validators: zod(folderSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await CreateFolder(form.data.folderName, $sidebarSelectedFolderId);
					isOpenCreatedFolderComponent.set(false);
					//toast.success('create');
				} catch (error) {
					toast.error('Error connecting to the server!');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
	$: console.log('sidebarSelectedFolderId', $sidebarSelectedFolderId);
</script>

<form method="post" use:enhance class="flex w-full">
	<div class=" flex w-full items-center px-0">
		<Form.Field {form} name="folderName" class="relative w-full space-y-0">
			<Form.Control let:attrs>
				<Form.Label class="sr-only">Folder Name</Form.Label>
				<input
					class={cn(
						'mt-0 h-auto focus-within:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
						inputClass
					)}
					{...attrs}
					bind:value={$formData.folderName}
					placeholder="Type your collection"
					use:initInput
				/>
				{#if $submitting}
					<span class="absolute right-2 top-[8px] h-6 w-6">
						<LoadingSpinner />
					</span>
				{/if}
			</Form.Control>
		</Form.Field>
	</div>
</form>
