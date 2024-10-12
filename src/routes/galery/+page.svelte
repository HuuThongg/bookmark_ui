<script lang="ts">
	import hero from '$lib/images/hero.png';
	import bookmarking1 from '$lib/images/bookmarking1.webp';
	import bookmarking2 from '$lib/images/bookmarking2.webp';
</script>

<section class="bg-gradient-to-b from-background to-muted pb-20 pt-10 lg:py-20">
	<div
		class="container mx-auto mt-0 grid grid-cols-1 grid-rows-[auto] gap-y-10 px-5 lg:grid-cols-[475px_1fr] lg:grid-rows-[auto] lg:gap-x-20 lg:gap-y-0"
	>
		<div class="relative">
			<img
				src={hero}
				width="1200"
				height="600"
				alt="BookmarkPro App Interface"
				class="rounded-lg shadow-2xl"
			/>
		</div>
		<div class="relative">
			<img
				src={bookmarking1}
				width="1200"
				height="600"
				alt="BookmarkPro App Interface"
				class="rounded-lg shadow-2xl"
			/>
		</div>
		<div class="relative">
			<img
				src={bookmarking2}
				width="1200"
				height="600"
				alt="BookmarkPro App Interface"
				class="rounded-lg shadow-2xl"
			/>
		</div>
	</div>
</section>
