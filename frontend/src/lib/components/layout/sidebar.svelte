<script lang="ts">
    import { ChevronDown, ChevronRight, Store } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { MOCK_NAVIGATION, type NavItem } from "../../types/navigation";
  
    let { isOpen } = $props();
    
    let searchQuery = $state("");
    let expandedMenu = $state<Record<string, boolean>>({});
  
    function toggleMenu(title: string) {
      expandedMenu[title] = !expandedMenu[title];
    }
  
    let filteredNav = $derived(
      MOCK_NAVIGATION.filter(nav => 
        nav.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        nav.children?.some(child => child.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  </script>
  
  <aside class="{isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out md:static md:translate-x-0">
    <div class="flex h-full flex-col">
      <div class="flex h-16 items-center border-b px-4 md:hidden">
        <Store class="h-6 w-6 text-primary mr-2" />
        <span class="font-bold text-lg">KasirPro</span>
      </div>
  
      <div class="p-4 border-b">
        <Input 
          type="search" 
          placeholder="Search menu..." 
          bind:value={searchQuery} 
          class="bg-muted/50"
        />
      </div>
  
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        {#each filteredNav as item (item.title)}
          {#if item.children}
            <div>
              <Button 
                variant="ghost" 
                class="w-full justify-between font-medium" 
                onclick={() => toggleMenu(item.title)}
              >
                {item.title}
                {#if expandedMenu[item.title]}
                  <ChevronDown class="h-4 w-4" />
                {:else}
                  <ChevronRight class="h-4 w-4" />
                {/if}
              </Button>
              
              {#if expandedMenu[item.title]}
                <div class="flex flex-col ml-4 mt-1 border-l pl-2 space-y-1">
                  {#each item.children as child (child.title)}
                    <Button variant="ghost" class="w-full justify-start text-sm" href={child.url}>
                      {child.title}
                    </Button>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <Button variant="ghost" class="w-full justify-start font-medium" href={item.url}>
              {item.title}
            </Button>
          {/if}
        {:else}
          <p class="text-sm text-muted-foreground text-center mt-4">No pages found.</p>
        {/each}
      </nav>
    </div>
  </aside>