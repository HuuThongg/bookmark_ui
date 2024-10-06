<script lang="ts">
	import { goto } from '$app/navigation';
	import { trashLinksLength } from '$lib/stores/link.store';
	import { Trash2 } from 'lucide-svelte';
</script>

<button
	class="flex w-full items-center gap-1 rounded-none p-1 px-4 focus:bg-neutral-700"
	on:click={async () => {
		await goto(`/app/trash`, { keepFocus: true });
	}}
>
	<Trash2 class="size-5" />
	<span class="select-none pl-1">Trash</span>
	<span class="ml-auto text-muted-foreground">{$trashLinksLength}</span>
</button>
