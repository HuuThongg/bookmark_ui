<script lang="ts">
	import { goto } from '$app/navigation';
	import { trashLinksLength } from '$lib/stores/link.store';
	import { Trash2 } from 'lucide-svelte';
</script>

<button
	class="flex w-full items-center gap-1 rounded-none p-1 px-4 text-color focus-visible:bg-active-bg"
	on:click={async () => {
		await goto(`/app/trash`, { keepFocus: true });
	}}
>
	<Trash2 class="size-5 stroke-primary-text" />
	<span class="select-none pl-1 text-color">Trash</span>
	<span class="ml-auto text-secondary-text">{$trashLinksLength}</span>
</button>
