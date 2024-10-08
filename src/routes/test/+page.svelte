<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Bookmark from '$lib/components/v0/bookmark.svelte';
</script>

<div
	class="bg-bg relative flex max-h-screen min-h-screen flex-col"
	id="page"
	data-vaul-drawer-wrapper
>
	<div class="m-5 max-w-4xl">
		<Input placeholder="dsada" />
		<Input class="bg-accent text-accent-foreground" />
		<Input
			class="bg-bg-alternative text-color placeholder:text-secondary-text focus-visible:bg-bg"
			placeholder="e"
		/>
	</div>
	<div class="grid grid-cols-5 gap-5">
		<button class="">hellllo</button>

		<Button class="text-bg-accent-color">BUttton</Button>
		<Button class="">Button</Button>

		<Button variant="secondary" class="">secondary Button</Button>
		<Button
			variant="outline"
			class="text-color bg-bg hover:bg-hover-bg hover:text-primary-text  border border-input"
			>secondary Button</Button
		>
	</div>
	<div>hello</div>
</div>
