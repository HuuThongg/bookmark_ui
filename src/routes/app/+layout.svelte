<script lang="ts">
	import FullScreen from '$lib/components/full-screen.svelte';
	import { getCookie } from '$lib/utils.js';
	export let data;
	window.addEventListener('collapsedCookieChanged', () => {
		const newCollapsedCookie = getCookie('PaneForge:collapsed');
		console.log('Collapsed cookie updated:', newCollapsedCookie);
	});
</script>

<div class="flex h-screen w-full flex-row overflow-hidden">
	<FullScreen defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
		<div class="flex h-full w-full bg-bg">
			<slot />
		</div>
	</FullScreen>
</div>
