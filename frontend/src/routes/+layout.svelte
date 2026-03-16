<script lang="ts">
	import "./layout.css";
	import { Toaster } from "svelte-sonner";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Topbar from "$lib/components/layout/topbar.svelte";
	import Sidebar from "$lib/components/layout/sidebar.svelte";
  
	let { children } = $props();
  
	let isSidebarOpen = $state(false);
	let isMounted = $state(false);
  
	$effect(() => {
	  isMounted = true;
	});
  
	function toggleSidebar() {
	  isSidebarOpen = !isSidebarOpen;
	}
  </script>
  
  <Toaster position="bottom-right" richColors />
  
  <div class="flex h-screen w-full overflow-hidden bg-muted/20">	
	<Sidebar isOpen={isSidebarOpen} />
	<div class="flex flex-1 flex-col overflow-hidden">
	  <Topbar {toggleSidebar} />
	  <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
		{#if !isMounted}
		  <div class="space-y-4">
			<Skeleton class="h-8 w-1/4" />
			<Skeleton class="h-100 w-full rounded-xl" />
		  </div>
		{:else}
		  {@render children()}
		{/if}
	  </main>
	</div>
	{#if isSidebarOpen}
	  <div 
		class="fixed inset-0 z-40 bg-black/50 md:hidden"
		onclick={() => (isSidebarOpen = false)}
	  ></div>
	{/if}
  </div>