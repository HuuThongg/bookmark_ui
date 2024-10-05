<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { login } from '$lib/api/auth/login';
	import { setSession } from '$lib/stores/user.store';
	import { AppRoute } from '$lib/constants';
	import type { Session } from '$lib/types/session';
	import Button from '../ui/button/button.svelte';
	onMount(async () => {});
	import { inputClass } from '$lib/utils';
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
	$: form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				//try {
				//	const session: Session = await login(form.data);
				//	setSession(session);
				//	toast.success('Welcome Back');
				//	await goto(AppRoute.APP);
				//} catch (error) {
				//	if (error instanceof Error) {
				//		if (error.message === 'invalid password') {
				//			toast.error('Invalid Password');
				//		}
				//	} else {
				//		toast.error('error from the server');
				//	}
				//}
				await login(form.data);
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<form method="POST" autocomplete="on" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<input class={inputClass} {...attrs} bind:this={inputElement} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<div class="flex items-center justify-between">
				<Form.Label>Password</Form.Label>

				<Button tabindex="-1" variant="link" class="h-auto p-2 capitalize  " href="/account/lost"
					>reset password</Button
				>
			</div>
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
			Login
		{/if}
	</Form.Button>

	<Button
		variant="link"
		class="mt-2 flex h-auto justify-center p-2 text-center capitalize "
		href="/account/signup">Sign up</Button
	>
</form>
