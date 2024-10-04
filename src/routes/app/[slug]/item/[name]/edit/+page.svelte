<script lang="ts">
	import FullScreen from '$lib/components/full-screen.svelte';
	import { Bell, ChevronDown, Heart } from 'lucide-svelte';

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

<div class="flex w-full">
	<div class="mb-4">
		<img src={selectedBookmark.icon} alt="" class="mb-2 h-16 w-16 rounded" />
		<h2 class="text-xl font-semibold">{selectedBookmark.title}</h2>
		<p class="text-sm text-gray-500">{selectedBookmark.url}</p>
	</div>

	<div class="space-y-4">
		<div>
			<label for="node" class="mb-1 block text-sm font-medium">Note</label>
			<input id="node" type="text" value="Hello" class="w-full rounded bg-gray-800 px-3 py-2" />
		</div>

		<div>
			<label for="collection" class="mb-1 block text-sm font-medium">Collection</label>
			<div class="flex items-center rounded bg-gray-800 px-3 py-2">
				<span class="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
				<span>react / ui</span>
				<ChevronDown size={16} class="ml-auto" />
			</div>
		</div>

		<div>
			<label for="tags" class="mb-1 block text-sm font-medium">Tags</label>
			<div class="flex items-center rounded bg-gray-800 px-3 py-2">
				<span>#learn</span>
				<input type="text" placeholder="Add tags..." class="ml-2 flex-1 bg-transparent" />
			</div>
		</div>

		<div>
			<label for="url" class="mb-1 block text-sm font-medium">URL</label>
			<input
				type="text"
				value="https://www.facebook.com"
				class="w-full rounded bg-gray-800 px-3 py-2"
			/>
		</div>
		<div class="mt-4 flex items-center justify-between">
			<div class="flex space-x-2">
				<button><Heart size={20} /></button>
				<button><Bell size={20} /></button>
			</div>
			<div class="text-sm text-gray-500">Saved</div>
		</div>

		<button class="mt-4 w-full rounded bg-gray-800 py-2 text-gray-300 hover:bg-gray-700">
			Delete
		</button>
	</div>
</div>
