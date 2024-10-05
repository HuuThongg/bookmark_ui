<script lang="ts">
	import AccountWrapper from '$lib/components/account/account-wrapper.svelte';
	import NewPasswordForm from '$lib/components/form/new-password-form.svelte';
</script>

<AccountWrapper>
	<p slot="title">New Password</p>
	<NewPasswordForm />
</AccountWrapper>
