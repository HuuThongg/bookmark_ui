<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	//import {
	//	Combobox,
	//	ComboboxContent,
	//	ComboboxInput,
	//	ComboboxItem,
	//	ComboboxTrigger
	//} from '$lib/components/ui/combobox';
	import { Heart, Bell } from 'lucide-svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';

	let note = '';
	let collection = 'hello1';
	let tags: string[] = [];
	let url = 'https://purecode.ai';
	let isDialogOpen = false;

	const collections = ['hello1', 'hello2', 'hello3'];
	const tagOptions = ['AI', 'UI', 'Design', 'Code'];

	function handleSave() {
		// Implement save logic here
		console.log('Saving note:', { note, collection, tags, url });
		isDialogOpen = false;
	}
</script>

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
