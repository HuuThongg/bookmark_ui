<script lang="ts">
	import { Search, Plus, ChevronDown, Heart, Bell } from 'lucide-svelte';

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

<div class="flex h-screen bg-gray-900 text-gray-300">
	<!-- Left Sidebar -->
	<div class="w-64 border-r border-gray-700 p-4">
		<div class="mb-4 flex items-center justify-between">
			<span class="font-semibold">longhuuthe1</span>
			<div class="flex space-x-2">
				<button class="rounded p-1 hover:bg-gray-700"><Search size={16} /></button>
				<button class="rounded p-1 hover:bg-gray-700"><Plus size={16} /></button>
			</div>
		</div>

		<nav>
			{#each collections as collection, i}
				<div
					class="cursor-pointer rounded px-2 py-1 hover:bg-gray-800 {i === 7 ? 'bg-gray-800' : ''}"
				>
					{collection}
					{i === 0 || i === 7 ? `(${i === 0 ? 11 : 4})` : ''}
				</div>
			{/each}
		</nav>

		<div class="mt-4">
			<div class="mb-2 font-semibold">Filters</div>
			<div class="mb-2 font-semibold">Tags (2)</div>
			{#each tags as tag}
				<div class="cursor-pointer rounded px-2 py-1 hover:bg-gray-800">
					# {tag}
				</div>
			{/each}
		</div>
	</div>

	<!-- Middle Section -->
	<div class="flex-1 border-r border-gray-700 p-4">
		<div class="mb-4 flex items-center justify-between">
			<div class="flex items-center">
				<input type="text" placeholder="Search" class="mr-2 rounded bg-gray-800 px-3 py-1" />
				<button class="rounded bg-gray-800 p-1"><ChevronDown size={16} /></button>
			</div>
			<div>
				<button class="mr-2 rounded bg-yellow-600 px-3 py-1 text-white">+</button>
				<button class="rounded bg-gray-700 px-3 py-1">-</button>
			</div>
		</div>

		<div class="space-y-4">
			{#each bookmarks as bookmark}
				<div class="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-800">
					{#if bookmark.icon}
						<img src={bookmark.icon} alt="" class="h-8 w-8 rounded" />
					{:else}
						<div class="h-8 w-8 rounded bg-gray-700"></div>
					{/if}
					<div>
						<div>{bookmark.title}</div>
						<div class="text-sm text-gray-500">{bookmark.url} · {bookmark.date}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Right Section -->
	<div class="w-96 p-4">
		<div class="mt-4 flex items-center justify-between">
			<div class="flex space-x-2">
				<button><Heart size={20} /></button>
				<button><Bell size={20} /></button>
			</div>
			<div class="text-sm text-gray-500">
				Saved {formatDate('2024-09-15T22:28:00')}
			</div>
		</div>

		<button class="mt-4 w-full rounded bg-gray-800 py-2 text-gray-300 hover:bg-gray-700">
			Delete
		</button>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
	}
</style>
