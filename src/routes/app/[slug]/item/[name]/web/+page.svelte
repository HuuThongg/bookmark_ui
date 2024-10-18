<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { editedLink } from '$lib/stores/link.store.js';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import NavigationLoadingbar from '$lib/components/shared-components/navigation-loadingbar.svelte';
	import { page } from '$app/stores';
	export let data;
	let link_source: string | undefined = undefined;
	let iframeSrc = '';
	let showNavigationLoadingBar = false;
	onMount(async () => {
		if (link_source) {
			iframeSrc = `${PUBLIC_API_ENDPOINT}/public/proxy?url=${link_source}`;
		}
	});
	$: {
		link_source = $editedLink.link_url || $page.params.name;
		if (link_source) {
			iframeSrc = `${PUBLIC_API_ENDPOINT}/public/proxy?url=${link_source}`;
		}
	}
	beforeNavigate(({ from, to }) => {
		showNavigationLoadingBar = true;
	});
	$: console.log('showNavigationLoadingBar', showNavigationLoadingBar);
</script>

<div class="relative flex h-full flex-col">
	<div class="relative min-h-0 w-full grow">
		{#if showNavigationLoadingBar}
			<NavigationLoadingbar />
		{/if}
		<iframe
			on:load={() => (showNavigationLoadingBar = false)}
			src={iframeSrc}
			style="width:100%; height:100%;"
		/>
	</div>
</div>
