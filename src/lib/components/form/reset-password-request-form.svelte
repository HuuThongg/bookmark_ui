<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { emailSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { AppRoute } from '$lib/constants';
	import Button from '../ui/button/button.svelte';
	import { inputClass } from '$lib/utils';
	import { requestPasswordResetLink } from '$lib/api/account/resetPasswordRequestLink';

	let inputElement: HTMLInputElement | null;
	let isSentResetPassword = false;
	onMount(async () => {
		await tick();
		await focusInput();
	});
	async function focusInput() {
		if (inputElement) {
			inputElement.focus();
		}
	}
	$: form = superForm(defaults(zod(emailSchema)), {
		SPA: true,
		validators: zod(emailSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await requestPasswordResetLink(form.data.email);
					isSentResetPassword = true;
					await goto(AppRoute.APP);
				} catch (error) {
					toast.error('Error connecting to the server.');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

{#if isSentResetPassword}
	<h3 class="text-lg text-secondary-foreground">Check your main box!</h3>
	<Button
		variant="link"
		class="mt-4 flex h-auto justify-center border border-input bg-background p-2 text-center capitalize hover:bg-accent hover:text-accent-foreground"
		href="/account/login">Sign in</Button
	>
{:else}
	<form method="POST" autocomplete="on" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>

				<input
					class={inputClass}
					{...attrs}
					bind:this={inputElement}
					bind:value={$formData.email}
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
{/if}
