<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="flex flex-col items-center rounded-lg bg-bg p-6 text-center">
	<div class="mb-4 text-primary">
		<slot />
	</div>
	<h3 class="mb-2 text-xl font-semibold text-color">{title}</h3>
	<p class="text-primary-text">{description}</p>
</div>
