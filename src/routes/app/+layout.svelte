<script lang="ts">
	import FullScreen from '$lib/components/full-screen.svelte';
	export let data;
</script>

<div class="flex h-screen w-full flex-row overflow-hidden">
	<FullScreen defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
		<div class="flex h-full w-full bg-bg">
			<slot />
		</div>
	</FullScreen>
</div>
