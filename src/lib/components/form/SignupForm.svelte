<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { signupSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { setSession } from '$lib/stores/user.store';
	import { signup } from '$lib/api/auth/signup';
	import { AppRoute } from '$lib/constants';
	import type { Session } from '$lib/types/session';
	import Button from '../ui/button/button.svelte';
	import { inputClass } from '$lib/utils';
	import { onMount, tick } from 'svelte';
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
	$: form = superForm(defaults(zod(signupSchema)), {
		SPA: true,
		validators: zod(signupSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					const session: Session = await signup(form.data); // Call the API function here
					setSession(session);
					toast.success('Signup successful');
					await goto(AppRoute.APP);
				} catch (error) {
					toast.error((error as Error).message || 'Error during signup');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<div class="mx-auto mt-10 max-w-96">
	<form method="POST" use:enhance>
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<input
					class={inputClass}
					{...attrs}
					bind:value={$formData.username}
					bind:this={inputElement}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="mt-3 w-full" aria-disabled={$submitting}>
			{#if $submitting}
				<span class="h-6">
					<LoadingSpinner />
				</span>
			{:else}
				Sign up
			{/if}
		</Form.Button>

		<Button
			variant="link"
			class="mt-2 flex h-auto justify-center p-2 text-center capitalize "
			href="/account/login">Sign in</Button
		>
	</form>
</div>
