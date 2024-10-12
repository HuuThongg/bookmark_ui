<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import { page } from '$app/stores';
	export let data;
	const metaInfo = {
		title: 'Bookmarking.app - ALl-in-one boomark manager',
		description: 'All in One Bookmark Manager. For your inspiration, read later, media and stuff..',
		themeColor: 'currentColor',
		imageUrl: 'og1.webp', // Replace this with your actual image URL
		ogType: 'app',
		twitterCard: 'summary_large_image',
		externalDomain: 'https://example.com', // Set your external domain here,
		domain: 'https://bookmarking.app'
	};
</script>

<svelte:head>
	<title>{$page.data.meta?.title || 'Web'} - Bookmarking</title>
	<meta name="theme-color" content="currentColor" />

	{#if $page.data.meta}
		<meta name="description" content={metaInfo.description} />

		<!-- Facebook Meta Tags -->
		<meta property="og:url" content="https://bookmarking.app" />
		<meta property="og:type" content={metaInfo.ogType} />
		<meta property="og:title" content={metaInfo.title} />
		<meta property="og:description" content={metaInfo.description} />
		{#if metaInfo.imageUrl}
			<meta property="og:image" content={new URL(metaInfo.imageUrl, window.location.origin).href} />
		{/if}

		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="app" />
		<meta name="twitter:site" content="@bookmarking_app" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={metaInfo.title} />
		<meta name="twitter:description" content={metaInfo.description} />
		{#if metaInfo.imageUrl}
			<meta
				name="twitter:image"
				content={new URL(metaInfo.imageUrl, window.location.origin).href}
			/>
		{/if}
	{/if}
</svelte:head>
<Toaster />
<div
	class="relative flex max-h-screen min-h-screen flex-col bg-bg"
	id="page"
	data-vaul-drawer-wrapper
>
	<slot />
</div>
