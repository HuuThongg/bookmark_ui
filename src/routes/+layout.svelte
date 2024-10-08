<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<Toaster />
<div
	class="bg-bg relative flex max-h-screen min-h-screen flex-col"
	id="page"
	data-vaul-drawer-wrapper
>
	<slot />
</div>
