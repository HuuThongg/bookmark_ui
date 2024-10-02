<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoadingSpinner from '../shared-components/loading-spinner.svelte';
	import { login } from '$lib/api/auth/login';
	import { setSession, type Session } from '$lib/stores/user.store';
	import { AppRoute } from '$lib/constants';
	onMount(async () => {
		//if (oauth.isCallback(window.location)) {
		//     try {
		//       await oauth.login(window.location);
		//       await onSuccess();
		//       return;
		//     } catch (error) {
		//       console.error('Error [login-form] [oauth.callback]', error);
		//       oauthError = getServerErrorMessage(error) || $t('errors.unable_to_complete_oauth_login');
		//       oauthLoading = false;
		//     }
		//   }
	});

	$: form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					const session: Session = await login(form.data);
					setSession(session); // Update the session store
					toast.success('Welcome Back');
					goto(AppRoute.APP); // Redirect to the homepage

					//const user = await login({ loginCredentialDto: { email, password } });
					//
					//     if (user.isAdmin && !$serverConfig.isOnboarded) {
					//       await onOnboarding();
					//       return;
					//     }
					//
					//     if (!user.isAdmin && user.shouldChangePassword) {
					//       await onFirstLogin();
					//       return;
					//     }
				} catch (error) {
					toast.error('Error connecting to the server.');
				}
			}
		},
		onUpdated: () => {}
	});
	$: ({ form: formData, submitting, enhance } = form);
</script>

<div class="mx-auto mt-10 max-w-96">
	<form method="POST" autocomplete="on" use:enhance>
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
				<Input {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button aria-disabled={$submitting}>
			{#if $submitting}
				<span class="h-6">
					<LoadingSpinner />
				</span>
			{:else}
				Login
			{/if}
		</Form.Button>
	</form>
</div>
