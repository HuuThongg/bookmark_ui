<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	import { toast } from 'svelte-sonner';
	import { folderSchema } from '$lib/schemas';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { CreateFolder } from '$lib/api/folder/createFolder';
	$: form = superForm(defaults(zod(folderSchema)), {
		SPA: true,
		validators: zod(folderSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await CreateFolder(form.data.folderName);
					toast.success('sucesss');
				} catch (error) {
					toast.error('Error connecting to the server!');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<form method="post" use:enhance class="flex w-full">
	<div class=" flex w-full items-center px-4">
		<Form.Field {form} name="folderName" class="relative w-full">
			<Form.Control let:attrs>
				<Form.Label class="sr-only">Folder Name</Form.Label>
				<Input {...attrs} bind:value={$formData.folderName} placeholder="Type your collection" />
				{#if $submitting}
					<span class="absolute right-2 top-[8px] h-6 w-6">
						<LoadingSpinner />
					</span>
				{/if}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
