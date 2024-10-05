<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Heart, Bell, ChevronsDownUp, Check, Plus } from 'lucide-svelte';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import TagInput from './tag-input.svelte';
	let note = '';
	let collection = 'hello1';
	let tags: string[] = [];
	let url = 'https://purecode.ai';
	let isDialogOpen = false;

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

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const collections = ['hello1', 'hello2', 'hello3'];
	const tagOptions = ['AI', 'UI', 'Design', 'Code'];

	function handleSave() {
		// Implement save logic here
		console.log('Saving note:', { note, collection, tags, url });
		isDialogOpen = false;
	}
	// Function to handle adding a new framework
	function addFramework(newFramework: string) {
		frameworks.push({ value: newFramework, label: capitalize(newFramework) });
		value = newFramework; // Set the new framework as selected
	}

	// Helper function to capitalize the first letter of the framework label
	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<Card.Root class="w-full">
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
			<Popover.Root bind:open let:ids>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="w-[200px] justify-between"
					>
						{selectedValue}
						<ChevronsDownUp class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input bind:value={searchValue} placeholder="Search framework..." class="h-9" />
						<Command.Empty>
							<p>No framework found.</p>
							<Button variant="ghost" class="mt-2" on:click={() => addFramework(searchValue)}>
								<Plus class="mr-2 h-4 w-4" />
								Add "{searchValue}"
							</Button>
						</Command.Empty>
						<Command.Group>
							{#each frameworks as framework}
								<Command.Item
									value={framework.value}
									onSelect={(currentValue) => {
										value = currentValue;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check
										class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')}
									/>
									{framework.label}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
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
