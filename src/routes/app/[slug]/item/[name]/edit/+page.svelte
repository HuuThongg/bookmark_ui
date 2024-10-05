<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditPage from '$lib/components/edit.web-page/edit-page.svelte';
	import FullScreen from '$lib/components/full-screen.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bell, ChevronDown, ExternalLink, Heart, Maximize2, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let bookmarks = [
		{
			title: 'Raindrop.io — All in One Bookmark Manager',
			url: 'app.raindrop.io',
			date: 'May 1',
			icon: '/placeholder.svg?height=32&width=32'
		},
		{
			title: 'Facebook - log in or sign up',
			url: 'facebook.com',
			date: 'Sep 15',
			icon: '/placeholder.svg?height=32&width=32',
			tags: ['learn']
		},
		{
			title: 'hello',
			url: 'hello',
			date: 'Sep 15'
		},
		{
			title: 'PureCode AI - Generate UI Using AI',
			url: 'purecode.ai',
			date: '10:23 PM'
		}
	];

	let selectedBookmark = bookmarks[1];
	let collections = [
		'All bookmarks',
		'Unsorted',
		'go',
		'dsada',
		'Shoop',
		'Behavior Questions',
		'react',
		'ui',
		'e',
		'hello1',
		'hello'
	];
	let tags = ['interview', 'learn'];

	function formatDate(date: string) {
		return new Date(date).toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
	}
</script>

<aside class="flex w-full min-w-0 flex-1 flex-col overflow-hidden bg-neutral-900">
	<div
		class="sticky top-0 z-[4] flex flex-shrink-0 justify-between whitespace-nowrap px-4 py-2 shadow-xl backdrop-blur-md"
	>
		<div>
			<Button variant="ghost" size="sm" class="rounded-lg">
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
