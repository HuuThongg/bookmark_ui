<script lang="ts">
	import AccountWrapper from '$lib/components/account/account-wrapper.svelte';
	import ResetPasswordRequestForm from '$lib/components/form/reset-password-request-form.svelte';
</script>

<AccountWrapper>
	<span slot="title">Reset Password</span>
	<ResetPasswordRequestForm />
</AccountWrapper>
