<script lang="ts">
  import { 
    ChevronRight, LayoutDashboard, Package, ShoppingCart, 
    Users, Truck, UserCog, Settings 
  } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { slide } from 'svelte/transition';
  import { MOCK_NAVIGATION } from "../../types/navigation";
  import { page } from '$app/stores';

  const iconMap: Record<string, any> = {
    "layout-dashboard": LayoutDashboard,
    "package": Package,
    "shopping-cart": ShoppingCart,
    "users": Users,
    "truck": Truck,
    "user-cog": UserCog,
    "settings": Settings
  };

  let { isOpen } = $props();
  let searchQuery = $state("");
  let expandedMenu = $state<Record<string, boolean>>({});

  $effect(() => {
    const currentPath = $page.url.pathname;
    MOCK_NAVIGATION.forEach(group => {
      group.items.forEach(item => {
        if (item.children?.some(child => child.url === currentPath)) {
          expandedMenu[item.title] = true;
        }
      });
    });
  });

  function toggleMenu(title: string) {
    expandedMenu[title] = !expandedMenu[title];
  }

  let filteredNav = $derived(
    MOCK_NAVIGATION.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.children?.some(child => child.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(group => group.items.length > 0)
  );

  const isActive = (path: string | undefined) => $page.url.pathname === path;
  const isParentActive = (item: any) => item.children?.some((c: any) => isActive(c.url));
</script>

<div class="
  absolute inset-y-0 left-0 z-40 bg-background shadow-lg transition-transform duration-300 ease-in-out
  md:static md:shadow-none md:transition-[width] md:shrink-0 md:overflow-hidden md:translate-x-0
  {isOpen ? 'translate-x-0 md:w-64 border-r' : '-translate-x-full md:w-0 border-none'}
">
  <aside class="w-64 h-full flex flex-col">
    <div class="p-4 border-b">
      <Input type="search" placeholder="Search menu..." bind:value={searchQuery} class="bg-muted/50" />
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-6">
      {#each filteredNav as group (group.label)}
        <div class="space-y-2">
          <h4 class="px-2 text-[8pt] font-bold text-muted-foreground tracking-widest uppercase">
            {group.label}
          </h4>

          <div class="space-y-1">
            {#each group.items as item (item.title)}
              {#if item.children}
                <div class="w-full">
                  <Button 
                    variant={isParentActive(item) ? "secondary" : "ghost"} 
                    class="w-full justify-between font-medium px-2 h-9 {isParentActive(item) ? 'text-primary' : ''}" 
                    onclick={() => toggleMenu(item.title)}
                  >
                    <span class="flex items-center gap-3">
                      {#if item.icon && iconMap[item.icon]}
                        {@const Icon = iconMap[item.icon]}
                        <Icon class="h-4 w-4 {isParentActive(item) ? 'opacity-100' : 'opacity-70'}" />
                      {/if}
                      {item.title}
                    </span>
                    <ChevronRight 
                      class="h-4 w-4 transition-transform duration-300 {expandedMenu[item.title] ? 'rotate-90' : ''}" 
                    />
                  </Button>
                  
                  {#if expandedMenu[item.title]}
                    <div transition:slide={{ duration: 250 }} class="flex flex-col ml-4 mt-1 border-l pl-2 space-y-1">
                      {#each item.children as child (child.title)}
                        <Button 
                          variant={isActive(child.url) ? "secondary" : "ghost"} 
                          class="w-full justify-start text-sm px-2 h-8 font-normal {isActive(child.url) ? 'font-semibold text-primary' : 'opacity-80'}" 
                          href={child.url}
                        >
                          {child.title}
                        </Button>
                      {/each}
                    </div>
                  {/if}
                </div>
              {:else}
                <Button 
                  variant={isActive(item.url) ? "secondary" : "ghost"} 
                  class="w-full justify-start font-medium pl-3 h-9 {isActive(item.url) ? 'text-primary' : ''}" 
                  href={item.url}
                >
                  <span class="flex items-center gap-3">
                    {#if item.icon && iconMap[item.icon]}
                      {@const Icon = iconMap[item.icon]}
                      <Icon class="h-4 w-4 {isActive(item.url) ? 'opacity-100' : 'opacity-70'}" />
                    {/if}
                    {item.title}
                  </span>
                </Button>
              {/if}
            {/each}
          </div>
        </div>
      {:else}
        <div class="text-center py-10">
          <p class="text-xs text-muted-foreground">No pages found.</p>
        </div>
      {/each}
    </nav>
  </aside>
</div>