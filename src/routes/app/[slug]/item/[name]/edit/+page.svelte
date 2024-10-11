<script lang="ts">
	import EditPage from '$lib/components/edit.web-page/edit-page.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { editedLink } from '$lib/stores/link.store.js';

	export let data;
	$: link_source = $editedLink.link_url;
	$: console.log('data', data.tagsList);
</script>

<div class="mx-auto my-0 flex w-full max-w-md">
	<form action="" class="relative w-full flex-1">
		<div class="grid grid-rows-[auto_1fr] items-center gap-2 p-4"></div>
		<EditPage tagsList={data.tagsList} />
	</form>
</div>
