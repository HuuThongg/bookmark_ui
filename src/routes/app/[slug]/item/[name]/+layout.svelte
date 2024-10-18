<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ExternalLink, Maximize2, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import * as Tabs from '$lib/components/ui/tabs';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import MainPage from '$lib/components/main-page/main-page.svelte';
	import { goto } from '$app/navigation';
	import { viewModeStore } from '$lib/stores';
	import { ViewMode } from '$lib/constants';

	$: closeUrl = $page.url.pathname.split('/item')[0];
	let isEditPage = true;
	let editLink = '';
	let webLink = '';
	$: if ($page.url.pathname.includes('/edit')) {
		isEditPage = true;

		editLink = $page.url.pathname;
		webLink = $page.url.pathname.split('edit')[0] + 'web';
	} else {
		isEditPage = false;
		webLink = $page.url.pathname;
		editLink = $page.url.pathname.split('web')[0] + 'edit';
	}
</script>

<MainPage />

<aside
	class="flex w-full min-w-[450px] flex-1 shrink-0 flex-col overflow-hidden border border-l border-border bg-bg"
>
	<Tabs.Root value={isEditPage ? 'edit' : 'web'} class="Root flex w-full flex-1 flex-col p-0">
		<div
			class="sticky top-0 z-[4] flex flex-shrink-0 justify-between whitespace-nowrap px-4 py-2 shadow-xl backdrop-blur-md"
		>
			<div>
				<Button
					variant="ghost"
					size="sm"
					class="rounded-lg"
					on:click={async () => {
						await goto(`${closeUrl}`);
					}}
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
				<Tabs.List class="flex gap-x-1 bg-transparent  p-0">
					<Tabs.Trigger
						class={buttonVariants({
							variant: 'outline',
							size: 'sm',
							class:
								'bg:text-accent-color/30 rounded-lg p-0 px-2 py-1 text-color data-[state=active]:bg-accent/40 data-[state=active]:text-accent-color'
						})}
						value="edit"
						on:click={async () => {
							viewModeStore.set(ViewMode.EDIT);
							await goto(editLink);
						}}>Edit</Tabs.Trigger
					>
					<Tabs.Trigger
						class={buttonVariants({
							variant: 'outline',
							size: 'sm',
							class:
								'bg:text-accent-color/30 rounded-lg p-0 px-2 py-1 text-color data-[state=active]:bg-accent/40 data-[state=active]:text-accent-color'
						})}
						value="web"
						on:click={async () => {
							viewModeStore.set(ViewMode.WEB);
							await goto(webLink);
						}}>Web</Tabs.Trigger
					>
				</Tabs.List>
			</div>
			<Button variant="ghost" size="sm" class="justify-self-end rounded-lg">
				<span class="sr-only">ExternalLink</span>
				<ExternalLink class="size-5" />
			</Button>
		</div>

		<div id="content" class="relative h-full w-full overflow-x-hidden overflow-y-scroll">
			<slot />
		</div>
	</Tabs.Root>
</aside>
