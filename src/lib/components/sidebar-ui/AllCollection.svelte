<script lang="ts">
	import { goto } from '$app/navigation';
	import { allLinksLength } from '$lib/stores/link.store';
	import { Cloud } from 'lucide-svelte';
	$: totalLength = $allLinksLength;
</script>

<button
	class="flex w-full items-center gap-1 rounded-none p-1 px-4 text-color focus-visible:bg-active-bg"
	on:click={async () => {
		await goto(`/app/all`, { keepFocus: true });
	}}
>
	<Cloud class="size-5 stroke-primary-text" />
	<span class="select-none pl-1 text-color">All Bookmarks</span>
	<span class="ml-auto text-secondary-text">{totalLength}</span>
</button>
