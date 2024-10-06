<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="p-2 sm:p-5 md:p-7 lg:p-20">
	<Card.Root class=" w-full  md:mx-auto md:max-w-md lg:mx-auto lg:max-w-md">
		<Card.Header class="md:mx-auto">
			<Card.Title class="flex w-full justify-center capitalize">
				<slot name="title" />
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<slot />
		</Card.Content>
	</Card.Root>
</div>
