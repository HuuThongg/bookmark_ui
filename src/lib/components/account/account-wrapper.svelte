<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-20">
	<Card.Root class=" w-full  lg:mx-auto lg:max-w-sm">
		<Card.Header>
			<Card.Title class="flex w-full justify-center capitalize">
				<slot name="title" />
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<slot />
		</Card.Content>
	</Card.Root>
</div>
