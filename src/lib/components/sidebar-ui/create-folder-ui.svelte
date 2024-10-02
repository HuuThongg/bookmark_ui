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

<div class="mx-auto mt-10 max-w-96">
	<form method="post" use:enhance class="flex w-full justify-between">
		<Form.Field {form} name="folderName">
			<Form.Control let:attrs>
				<Form.Label class="sr-only">Folder Name</Form.Label>
				<Input {...attrs} bind:value={$formData.folderName} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button aria-disabled={$submitting}>
			{#if $submitting}
				<span class="h-6">
					<LoadingSpinner />
				</span>
			{:else}
				Add
			{/if}
		</Form.Button>
	</form>
</div>
