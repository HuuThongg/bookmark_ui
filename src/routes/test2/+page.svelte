<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';

	import * as Resizable from '$lib/components/ui/resizable/index.js';

	import { Heart, Bell } from 'lucide-svelte';

	import * as Tabs from '$lib/components/ui/tabs';
	import { getCookie } from '$lib/utils';
	import AccountWrapper from '$lib/components/account/account-wrapper.svelte';
	let note = '';
	let collection = 'hello1';
	let tags: string[] = [];
	let url = 'https://purecode.ai';

	function handleSave() {
		console.log('Saving note:', { note, collection, tags, url });
		//isDialogOpen = false;
	}

	let defaultLayout = [65];

	let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;
	let navCollapsedSize: number = 100;

	function onlayoutchange(sizes: number[]) {
		//document.cookie = `paneforge:layout1=${JSON.stringify(sizes)}; path=/app`;
	}
	function setCollapsedCookie(value: boolean) {
		//document.cookie = `PaneForge:collapsed1=${value}; path=/app;`;
		//window.dispatchEvent(new Event('collapsedCookieChanged'));
	}
	window.addEventListener('collapsedCookieChanged', () => {
		//const newCollapsedCookie = getCookie('PaneForge:collapsed1');
		//if (newCollapsedCookie) {
		//isCollapsed = JSON.parse(newCollapsedCookie);
		//}
	});
	function onCollapse() {
		//isCollapsed = true;
		//setCollapsedCookie(isCollapsed);
	}

	function onExpand() {
		//isCollapsed = false;
		//setCollapsedCookie(isCollapsed);
	}
</script>

<a href="/test">Ttest</a>
<Tabs.Root value="account" class="w-[1000px]">
	<Tabs.List>
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="password">Password</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
	<Tabs.Content value="password">Change your password here.</Tabs.Content>
</Tabs.Root>
<Card.Root class="w-[350px]">
	<Card.Content class="w-full">
		<Card.Header>
			<Card.Title>Add New Note</Card.Title>
			<Card.Description>Create a new note with PureCode AI</Card.Description>
		</Card.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="note">Note</Label>
				<Textarea id="note" bind:value={note} placeholder="Enter your note here..." />
			</div>
			<div class="grid gap-2">
				<Label for="note">Add tags</Label>
				<Textarea id="note" bind:value={note} placeholder="Enter your note here..." />
			</div>
			<div class="grid gap-2">
				<Label for="url">URL</Label>
				<Input id="url" bind:value={url} placeholder="https://example.com" />
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div>
				<Button variant="ghost" class="p-2">
					<Heart />
				</Button>
				<Button variant="ghost" class="p-2">
					<Bell />
				</Button>
			</div>
			<Button on:click={handleSave}>Save Note</Button>
		</div>
	</Card.Content>
</Card.Root>

<Resizable.PaneGroup direction="horizontal" {onlayoutchange} class="w-full rounded-lg border">
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		collapsedSize={navCollapsedSize}
		collapsible
		minSize={12}
		maxSize={40}
		{onCollapse}
		{onExpand}
		class="md:max-w-[400px]"
		style="width: {isCollapsed ? '0' : ''}; flex-grow: {isCollapsed && 0}; min-width: {isCollapsed
			? 'auto'
			: '200px'};"
	>
		<div class="flex h-[200px] items-center justify-center p-6">
			<span class="font-semibold">One</span>
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={25}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Two</span>
				</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane defaultSize={75}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Three</span>
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
Copy
