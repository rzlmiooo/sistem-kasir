<script lang="ts">
  import { Menu, Search, User, Store } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let { toggleSidebar } = $props();

  let currentTime = $state("");
  
  $effect(() => {
    const updateClock = () => {
      currentTime = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      }).format(new Date());
    };
    
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  });
</script>

<header class="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 shadow-sm z-50">
  
  <div class="flex items-center justify-between gap-2 font-bold text-lg w-68">
    <div class="flex gap-2 items-center">
      <Store class="h-6 w-6 text-primary" />
      LawuPOS
    </div>
    <Button variant="ghost" size="icon" onclick={toggleSidebar} class="ml-4">
      <Menu class="h-5 w-5" />
    </Button>
  </div>


  <div class="flex items-center w-lg px-6">
    <div class="relative w-full hidden md:block">
      <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search anything..." class="w-full bg-muted/50 pl-8" />
      <span class="absolute right-2.5 top-2.5 text-muted-foreground text-xs tracking-wide">CTRL + K</span>
    </div>
  </div>

  <div class="flex items-center gap-4">
    <div class="hidden lg:block text-sm text-muted-foreground font-medium">
      {currentTime}
    </div>

    <Button variant="outline" size="icon" class="rounded-full">
      <User class="h-5 w-5" />
    </Button>
  </div>
</header>