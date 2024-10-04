<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Check, LayoutList } from 'lucide-svelte';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let viewType = 'List';
	let showInList = [
		{ label: 'Cover', checked: true },
		{ label: 'Title', checked: true },
		{ label: 'Note', checked: true },
		{ label: 'Description', checked: false },
		{ label: 'Highlights', checked: true },
		{ label: 'Tags', checked: true }
	];

	function toggleItem(index: number) {
		showInList[index].checked = !showInList[index].checked;
		console.log(
			`${showInList[index].label} is now ${showInList[index].checked ? 'checked' : 'unchecked'}`
		);
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		<Button variant="ghost" size="sm" class="text-gray-400">
			<LayoutList class="mr-2 h-4 w-4" /> List
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56 bg-neutral-900 text-white">
		<DropdownMenuLabel>View</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			{#each ['List', 'Cards', 'Headlines', 'Moodboard'] as type}
				<DropdownMenuItem on:click={() => (viewType = type)}>
					{#if viewType === type}
						<Check class="mr-2 h-4 w-4" />
					{/if}
					<span>{type}</span>
				</DropdownMenuItem>
			{/each}
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuLabel>Show in list</DropdownMenuLabel>
		<DropdownMenuGroup>
			{#each showInList as item, index}
				<DropdownMenuItem class=" hover:text-neutral-600" on:click={(e) => e.preventDefault()}>
					<Checkbox bind:checked={item.checked} on:click={() => toggleItem(index)}></Checkbox>
					{item.label}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
