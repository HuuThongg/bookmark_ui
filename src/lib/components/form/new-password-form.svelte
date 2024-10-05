<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { passwordSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { onMount, tick } from 'svelte';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import Button from '../ui/button/button.svelte';
	import { inputClass } from '$lib/utils';
	import { createNewPasswordRequest } from '$lib/api/account/createNewPasswordRequest';
	let inputElement: HTMLInputElement | null;
	onMount(async () => {
		await tick();
		await focusInput();
	});
	async function focusInput() {
		if (inputElement) {
			inputElement.focus();
		}
	}
	$: form = superForm(defaults(zod(passwordSchema)), {
		SPA: true,
		validators: zod(passwordSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await createNewPasswordRequest(form.data.password);
				} catch (error) {
					toast.error('Can not reset password.');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<form method="POST" autocomplete="on" use:enhance>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>

			<input
				type="password"
				class={inputClass}
				{...attrs}
				bind:this={inputElement}
				bind:value={$formData.password}
			/>
		</Form.Control>
	</Form.Field>
	<div class="mt-4 flex items-center justify-end gap-2">
		<Form.Button size="sm" class=" w-auto" aria-disabled={$submitting}>
			{#if $submitting}
				<span class="h-6">
					<LoadingSpinner />
				</span>
			{:else}
				Reset password
			{/if}
		</Form.Button>

		<Button
			variant="link"
			class=" flex h-auto justify-center border border-input bg-background p-2 text-center capitalize hover:bg-accent hover:text-accent-foreground"
			href="/account/login">Cancel</Button
		>
	</div>
</form>
