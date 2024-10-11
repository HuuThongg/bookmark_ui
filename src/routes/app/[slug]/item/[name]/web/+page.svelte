<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { editedLink } from '$lib/stores/link.store.js';
	import { onMount } from 'svelte';

	export let data;
	$: link_source = $editedLink.link_url;

	let iframeSrc = '';

	onMount(async () => {
		if (link_source) {
			iframeSrc = `${PUBLIC_API_ENDPOINT}/public/proxy?url=${link_source}`;
		}
	});
</script>

<div class="flex h-full flex-col">
	<div class="min-h-0 w-full grow">
		<iframe src={iframeSrc} style="width:100%; height:100%;" />
	</div>
</div>
