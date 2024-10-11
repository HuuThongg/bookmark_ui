<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { editedLink } from '$lib/stores/link.store.js';

	export let data;
	$: link_source = $editedLink.link_url;
</script>

<div class="flex h-full flex-col">
	<div class="min-h-0 w-full grow">
		<iframe src={link_source} width="100%" height="100%"></iframe>
	</div>
</div>
