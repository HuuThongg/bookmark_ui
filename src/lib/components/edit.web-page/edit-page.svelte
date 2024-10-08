<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Heart, Bell, ChevronsDownUp, Check, Plus } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import TagInput from './tag-input.svelte';
	import { addNote } from '$lib/api/link/addNote';
	import { editedLink } from '$lib/stores/link.store';
	import { changeLinkTitle } from '$lib/api/link/changeLinkTitle';
	import { changeLinkURL } from '$lib/api/link/changeLinkURL';

	let isDialogOpen = false;
	$: link = $editedLink;
	$: orignalNote = $editedLink.link_notes ?? '';
	$: note = orignalNote;
	$: oldTitle = $editedLink.link_title ?? 'title';
	$: title = oldTitle;

	$: oldURL = $editedLink.link_url ?? 'https://example.com';
	$: URL = oldURL;
	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next.js',
			label: 'Next.js'
		},
		{
			value: 'nuxt.js',
			label: 'Nuxt.js'
		},
		{
			value: 'remix',
			label: 'Remix'
		},
		{
			value: 'astro',
			label: 'Astro'
		}
	];

	let open = false;
	let value = '';
	let searchValue = '';

	$: selectedValue = frameworks.find((f) => f.value === value)?.label ?? 'Select a framework...';
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const tagOptions = ['AI', 'UI', 'Design', 'Code'];

	function handleSave() {
		//console.log('Saving note:', { note, collection, tags, url });
		isDialogOpen = false;
	}
	function addFramework(newFramework: string) {
		frameworks.push({ value: newFramework, label: capitalize(newFramework) });
		value = newFramework; // Set the new framework as selected
	}

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	async function handleUpdateNote() {
		if (link && link.link_id) {
			if (note !== orignalNote) {
				await addNote(link.link_id, note.trim());
			}
		}
	}
	async function handleUpdateTitle() {
		if (link && link.link_id) {
			title = title.trim();
			if (title === oldTitle) return;
			await changeLinkTitle(link.link_id, title);
		}
	}

	async function handleUpdateLinkURL() {
		if (link && link.link_id) {
			URL = URL.trim();
			if (URL === oldURL) return;
			await changeLinkURL(link.link_id, URL);
		}
	}
</script>

<Card.Root class="w-full">
	<Card.Content class="w-full">
		<div class="grid gap-2">
			<Label for="title">Title</Label>
			<Input
				id="title"
				bind:value={title}
				on:blur={handleUpdateTitle}
				placeholder="https://example.com"
			/>
		</div>

		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="note">Note</Label>
				<Textarea
					id="note"
					bind:value={note}
					on:blur={handleUpdateNote}
					placeholder="Enter your note here..."
				/>
			</div>
			<Dialog.Root>
				<Dialog.Trigger class="text-left">Collection</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
						<Dialog.Description>
							This action cannot be undone. This will permanently delete your account and remove
							your data from our servers.
						</Dialog.Description>
					</Dialog.Header>
				</Dialog.Content>
			</Dialog.Root>
			<TagInput />
			<div class="grid gap-2">
				<Label for="url">URL</Label>
				<Input
					id="url"
					bind:value={URL}
					on:blur={handleUpdateLinkURL}
					placeholder="https://example.com"
				/>
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
