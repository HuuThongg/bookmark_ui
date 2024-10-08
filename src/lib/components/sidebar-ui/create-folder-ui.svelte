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
	import { Plus } from 'lucide-svelte';
	$: form = superForm(defaults(zod(folderSchema)), {
		SPA: true,
		validators: zod(folderSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await CreateFolder(form.data.folderName, $sidebarSelectedFolderId);
					isOpenCreatedFolderComponent.set(false);
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
		<Form.Field
			{form}
			name="folderName"
			class="relative flex w-full flex-row space-y-0 bg-active-bg"
		>
			<Form.Control let:attrs>
				<Form.Label class="sr-only">Folder Name</Form.Label>
				<Plus class="ml-3" />
				<input
					class={cn('mt-0 h-auto w-full bg-active-bg focus-visible:outline-0')}
					{...attrs}
					bind:value={$formData.folderName}
					placeholder=""
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
