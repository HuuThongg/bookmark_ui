<script lang="ts">
	import { onMount } from 'svelte';
	import FullScreen from '$lib/components/full-screen.svelte';
	export let data;
</script>

<div class="flex h-screen w-full flex-row overflow-hidden">
	<FullScreen defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
		<div class="flex h-full w-full">
			<slot />
		</div>
	</FullScreen>
</div>
