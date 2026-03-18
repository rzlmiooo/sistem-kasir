<script lang="ts">
	import { onMount } from "svelte";
	import "./layout.css";
	import { Toaster } from "svelte-sonner";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Topbar from "$lib/components/layout/topbar.svelte";
	import Sidebar from "$lib/components/layout/sidebar.svelte";
  
	let { children } = $props();
  
	// Ubah jadi true kalau mau default-nya kebuka pas pertama kali di-load
	let isSidebarOpen = $state(true); 
	let isMounted = $state(false);
  
	onMount(() => {
	  isMounted = true;
	});
  
	function toggleSidebar() {
	  isSidebarOpen = !isSidebarOpen;
	}
  </script>
  
  <Toaster position="bottom-right" richColors />
  
  <div class="flex h-screen flex-col overflow-hidden bg-muted/20">
	
	<Topbar {toggleSidebar} />
  
	<div class="flex flex-1 overflow-hidden relative">
	  
	  <Sidebar isOpen={isSidebarOpen} />
  
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
  
	  {#if isSidebarOpen}
		<button 
		  type="button"
		  class="absolute inset-0 z-30 w-full bg-black/50 md:hidden cursor-default border-none outline-none"
		  onclick={() => (isSidebarOpen = false)}
		  aria-label="Close sidebar"
		></button>
	  {/if}
  
	</div>
  </div>