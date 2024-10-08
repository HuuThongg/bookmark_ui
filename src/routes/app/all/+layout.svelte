<script>
	import BookmarkHeader from '$lib/components/bookmark-header.svelte';
	import FilterHeader from '$lib/components/main-page/filter-header.svelte';
</script>

<div class=" mx-auto w-full overflow-y-auto">
	<div class="p-4 pb-0">
		<BookmarkHeader />
		<FilterHeader />
	</div>
	<slot />
</div>
