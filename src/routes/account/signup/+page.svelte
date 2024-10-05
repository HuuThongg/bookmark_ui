<script lang="ts">
	import SignupForm from '$lib/components/form/SignupForm.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-20">
	<Card.Root class=" w-full  lg:mx-auto lg:max-w-sm">
		<Card.Header>
			<Card.Title class="flex w-full justify-center">Sign Up</Card.Title>
		</Card.Header>
		<Card.Content>
			<SignupForm />
		</Card.Content>
	</Card.Root>
</div>
