<script lang="ts">
	import { createTagsInput, melt, type Tag } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { addTagForLinks } from '$lib/api/link/addTags';
	import { editedLink, selectedLinkIdsToEdit } from '$lib/stores/link.store';
	import Button from '../ui/button/button.svelte';
	import { DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { initInput } from '$lib/actions/focus';
	import { cn } from '$lib/utils';
	$: link = $editedLink;
	let initialTags: Tag[] = [];
	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags: initialTags,
		unique: true,
		addOnPaste: true
	});
	$: console.log('tag', $tags);
	let tagContent: string = '';
	$: hasTag = $tags.length > 0;
	$: {
		if ($tags.length > 1) tagContent = $tags.length + ' tags';
		else if ($tags.length === 1) tagContent = 1 + ' tag';
		else tagContent = 'tag';
	}
	async function handleAddTags() {
		await addTagForLinks(
			$selectedLinkIdsToEdit,
			$tags.map((a) => a.value)
		);
	}
</script>

<DialogHeader class="flex flex-row items-center justify-between ">
	<DialogTitle class="text-base text-color">Add Tags</DialogTitle>
	<Button
		class={cn('mr-2 px-3 py-2 text-base', {
			'active:active-bg-color bg-accent-color  text-base text-bg-accent-color hover:bg-hover-accent-color':
				hasTag,
			'bg-muted text-black': !hasTag
		})}
		on:click={handleAddTags}>Add {tagContent}</Button
	>
</DialogHeader>
<div class="min-h-40 w-full">
	<div class="flex flex-col items-start justify-center gap-2">
		<div
			use:melt={$root}
			class="flex w-full min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-bg-alternative px-3 py-2 text-primary-text focus-within:ring focus-within:ring-ring"
		>
			{#each $tags as t}
				<div
					use:melt={$tag(t)}
					class="flex items-center overflow-hidden rounded-md bg-magnum-200 text-magnum-900 [word-break:break-word] data-[disabled]:bg-magnum-300 data-[selected]:bg-accent-color data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
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

			<input
				use:melt={$input}
				type="text"
				placeholder="Enter tags..."
				class="min-w-[4.5rem] shrink grow basis-0 border-0 bg-transparent text-color outline-none focus:!ring-0 data-[invalid]:text-red-500"
				use:initInput
			/>
		</div>
	</div>
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
