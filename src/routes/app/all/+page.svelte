<script lang="ts">
	import LinkList from '$lib/components/main-page/link/link-list.svelte';
	import { allLinks } from '$lib/stores/link.store';
	$: linkList = $allLinks;
</script>

<div class="w-full p-4">
	<LinkList {linkList} />
</div>
