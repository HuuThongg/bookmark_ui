<script lang="ts">
	import hero from '$lib/images/bookmarking1.webp';
	import FeatureCard from '$lib/components/landingPage/featureCard.svelte';
	import { Layers, ArrowRight, LayersIcon, SearchIcon, MaximizeIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import bookmarking2 from '$lib/images/bookmarking2.webp';
</script>

<div class="flex flex-col">
	<header class="border-b">
		<div class="container mx-auto flex items-center justify-between px-5 py-4">
			<a href="/" class="flex items-center space-x-2">
				<Layers class="h-6 w-6 text-primary" />
				<span class="text-xl font-bold">BookmarkPro</span>
			</a>
			<Button variant="default" href="/account/login">Login</Button>
		</div>
	</header>

	<main class=" flex-grow">
		<section class="bg-gradient-to-b from-background to-muted pb-20 pt-10 lg:py-20">
			<div
				class="container mx-auto mt-0 grid grid-cols-1 grid-rows-[auto] gap-y-10 px-5 lg:grid-cols-[475px_1fr] lg:grid-rows-[auto] lg:gap-x-20 lg:gap-y-0"
			>
				<div class="flex flex-col justify-center text-center">
					<h1 class="mb-4 text-4xl font-bold text-color">All-in-one bookmark manager</h1>
					<p class="mb-8 text-xl text-primary-text">Intuitive. Powerful. Runs everywhere.</p>
					<div class="flex justify-center space-x-4">
						<Button size="lg" href="/account/signup">
							Sign Up
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
						<Button size="lg" variant="outline" href="/galery">
							Learn more
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
					</div>
					<div class="mt-8">
						<img
							src={bookmarking2}
							width="1200"
							height="600"
							alt="BookmarkPro App Interface"
							class="rounded-lg shadow-2xl"
						/>
					</div>
				</div>
				<div class="relative">
					<img
						src={hero}
						width="1200"
						height="600"
						alt="BookmarkPro App Interface"
						class="rounded-lg shadow-2xl"
					/>
				</div>
			</div>
		</section>

		<section class="lg:py-15 px-4 py-5 md:py-10">
			<div class="container mx-auto px-4">
				<h2 class="mb-12 text-center text-3xl font-bold">Key Features</h2>
				<div
					class="grid grid-cols-1 grid-rows-[auto] gap-8 md:grid-cols-2 md:grid-rows-[auto] lg:grid-cols-3"
				>
					<FeatureCard
						title="Organize with ease"
						description="Effortlessly categorize and manage your bookmarks with intuitive tools."
					>
						<LayersIcon class="size-10" />
					</FeatureCard>

					<FeatureCard
						title="Full text search"
						description="Find any bookmark instantly with our powerful search functionality."
					>
						<SearchIcon class="h-10 w-10" />
					</FeatureCard>
					<FeatureCard
						title="In-app page view"
						description="View saved pages directly within the app for a seamless experience."
					>
						<MaximizeIcon class="h-10 w-10" />
					</FeatureCard>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t py-6">
		<div class="container mx-auto px-4 text-center text-sm text-muted-foreground">
			© 2024 BookmarkPro. All rights reserved.
		</div>
	</footer>
</div>
