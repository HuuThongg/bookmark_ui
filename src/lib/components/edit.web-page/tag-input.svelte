<script lang="ts">
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import { createCombobox } from '@melt-ui/svelte';
	import { X, Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	// Initial tags and available tag options
	const initialTags = ['Svelte', 'Typescript'];
	const availableTags = ['Svelte', 'Typescript', 'Golang', 'UI', 'Design'];

	// Create Tags Input
	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags: initialTags,
		unique: true,
		add(tag) {
			return { id: tag, value: tag };
		},
		addOnPaste: true
	});

	// Create Combobox for tag suggestions
	const {
		elements: { menu, input: comboboxInput, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<string>({
		forceVisible: true
	});

	// Filter available tags based on user input and the selected tags
	$: filteredTags = $touchedInput
		? availableTags.filter(
				(tag) =>
					!$tags.some((t) => t.value === tag) &&
					tag.toLowerCase().includes($inputValue.toLowerCase())
			)
		: availableTags.filter((tag) => !$tags.some((t) => t.value === tag));

	// When a tag is selected from the combobox, add it to the tags input
	$: if ($selected) {
		console.log('inputValue', $inputValue);
		console.log('before tag', $tags);
		//tags.update((currentTags) => [...currentTags, { id: $selected.value, value: $selected.value }]);
		console.log('after tags', $tags);
	}
	$: if ($open) {
		console.log('open');
	} else {
		console.log('close');
	}
</script>

<div class="flex flex-col items-start justify-center gap-2">
	<!-- Tags Input Field -->
	<div
		use:melt={$root}
		class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus-within:ring focus-within:ring-magnum-400"
	>
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="flex items-center overflow-hidden rounded-md bg-magnum-200 text-magnum-900 [word-break:break-word] data-[disabled]:bg-magnum-300 data-[selected]:bg-magnum-400 data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span class="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
				<button
					use:melt={$deleteTrigger(t)}
					class="flex h-full items-center px-1 enabled:hover:bg-magnum-300"
				>
					<X class="size-3" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="flex items-center overflow-hidden rounded-md bg-gray-500 px-1.5 text-white [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
			/>
		{/each}

		<!-- Input Field for New Tags -->
		<input
			use:melt={$input}
			use:melt={$comboboxInput}
			type="text"
			placeholder="Enter tags..."
			class="min-w-[4.5rem] shrink grow basis-0 border-0 bg-gray-500 text-white outline-none focus:!ring-0 data-[invalid]:text-red-500"
		/>
	</div>

	<!-- Combobox Dropdown for Available Tags -->
	{JSON.stringify($open)}
	{JSON.stringify(filteredTags)}
	{#if $open && filteredTags.length > 0}
		<ul
			class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<div
				class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
				tabindex="0"
			>
				{#each filteredTags as tag, index (index)}
					<li
						use:melt={$option({ value: tag })}
						class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4 hover:bg-magnum-100 data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900"
					>
						{#if $isSelected(tag)}
							<div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
								<Check class="size-4" />
							</div>
						{/if}
						<div class="pl-4">
							<span class="font-medium">{tag}</span>
						</div>
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>

<style>
	.check {
		position: absolute;
		left: 0.5rem; /* Same as left-2 */
		top: 50%;
		color: #3b82f6; /* Adjust this to your "magnum-500" color */
		transform: translateY(calc(-50% + 1px));
	}
</style>
