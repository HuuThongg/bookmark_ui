<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cloud } from 'lucide-svelte';
</script>

<button
	class="flex w-full items-center gap-1 rounded-none p-1 px-4 focus:bg-neutral-700"
	on:click={async () => {
		await goto(`/app/all`, { keepFocus: true });
	}}
>
	<Cloud class="size-5" />
	<span class="select-none pl-1">All Bookmarks</span>
	<span class="ml-auto text-muted-foreground">13</span>
</button>
