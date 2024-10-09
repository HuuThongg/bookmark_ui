<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<Toaster />
<div
	class="relative flex max-h-screen min-h-screen flex-col bg-bg"
	id="page"
	data-vaul-drawer-wrapper
>
	<slot />
</div>
