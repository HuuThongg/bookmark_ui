<script lang="ts">
	import AccountWrapper from '$lib/components/account/account-wrapper.svelte';
	import LoginForm from '$lib/components/form/loginForm.svelte';
</script>

<AccountWrapper>
	<span slot="title">Login</span>
	<LoginForm />
</AccountWrapper>
