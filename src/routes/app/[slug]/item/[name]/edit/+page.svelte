<script lang="ts">
	import EditPage from '$lib/components/edit.web-page/edit-page.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ExternalLink, Maximize2, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	$: closeUrl = $page.url.pathname.split('/item')[0];
</script>

<aside
	class="flex w-full min-w-[450px] flex-1 shrink-0 flex-col overflow-hidden border border-l border-border bg-bg"
>
	<div
		class="sticky top-0 z-[4] flex flex-shrink-0 justify-between whitespace-nowrap px-4 py-2 shadow-xl backdrop-blur-md"
	>
		<div>
			<Button
				variant="ghost"
				size="sm"
				class="rounded-lg"
				on:click={async () => await goto(`${closeUrl}`)}
			>
				<span class="sr-only">close</span>
				<X class="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="sm" class="rounded-lg">
				<span class="sr-only">FullScreen</span>
				<Maximize2 class="h-5 w-5" />
			</Button>
		</div>
		<div>
			<Button variant="ghost" size="sm" class="rounded-lg">
				<span>Edit</span>
			</Button>
		</div>
		<Button variant="ghost" size="sm" class="justify-self-end rounded-lg">
			<span class="sr-only">ExternalLink</span>
			<ExternalLink class="size-5" />
		</Button>
	</div>
	<div id="content" class="h-full w-full overflow-x-hidden overflow-y-scroll">
		<div class="mx-auto my-0 flex w-full max-w-md">
			<form action="" class="relative w-full flex-1">
				<div class="grid grid-rows-[auto_1fr] items-center gap-2 p-4"></div>
				<EditPage />
			</form>
		</div>
	</div>
</aside>
