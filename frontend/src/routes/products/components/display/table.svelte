<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import { Plus, Trash2, Pencil, RotateCcw, Search } from "lucide-svelte";

  const { products } = $props();
  const dispatch = createEventDispatcher();

  let searchQuery = $state("");
  let selectedIds = $state<number[]>([]);

  let filteredProducts = $derived(
    products.filter((p: any) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(searchLower) ||
        p.price.toString().includes(searchLower) ||
        p.stock.toString().includes(searchLower)
      );
    })
  );

  let isAllSelected = $derived(
    filteredProducts.length > 0 && selectedIds.length === filteredProducts.length
  );

  const toggleAll = () => {
    if (isAllSelected) {
      selectedIds = [];
    } else {
      selectedIds = filteredProducts.map(p => p.id);
    }
  }

  const toggleSelection = (id : number) => {
    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter(i => i !== id);
    } else {
      selectedIds = [...selectedIds, id];
    }
  }

  const handleMultiDelete = () => {
    dispatch("deleteMultiple", selectedIds);
    selectedIds = [];
  }
</script>

<div class="bg-gray-50 p-4 border rounded-2xl space-y-4">
  <div class="flex items-center gap-2">
    <Button onclick={() => dispatch("create")} class="flex items-center gap-1 bg-success text-success-foreground hover:bg-success/90">
      <Plus />New Product
    </Button>
    <Button 
      onclick={handleMultiDelete}
      class="ml-2 flex items-center gap-1 transition-all bg-danger text-danger-foreground hover:bg-danger/90"
      disabled={selectedIds.length === 0}
    >
      <Trash2 /> Delete {selectedIds.length > 0 ? selectedIds.length : ''}
    </Button>
    <Button onclick={() => dispatch("refresh")} variant="outline" class="ml-6 flex items-center gap-1 border-info text-info hover:bg-info hover:text-info-foreground">
      <RotateCcw /> Refresh
    </Button>
  </div>

  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold tracking-tight">Products</h2>
    <div class="flex items-center">
      <div class="relative w-64 hidden md:block">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search anything..." class="w-full pl-8" bind:value={searchQuery} />
      </div>
    </div>
  </div>

  <div class="rounded-md border bg-white">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-12 text-center">
            <Checkbox 
              checked={isAllSelected} 
              onCheckedChange={toggleAll} 
              aria-label="Select all"
              class="h-5 w-5 data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=checked]:text-info-foreground"            
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead class="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each filteredProducts as p (p.id)} 
          <TableRow 
            data-state={selectedIds.includes(p.id) ? "selected" : undefined}
            class="cursor-pointer transition-colors hover:bg-muted/50"
            onclick={() => toggleSelection(p.id)}
          >
            <TableCell class="text-center">
              <Checkbox 
                checked={selectedIds.includes(p.id)} 
                aria-label="Select row"
                class="h-5 w-5 data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=checked]:text-info-foreground"              
              />
            </TableCell>
            <TableCell class="font-medium">{p.name}</TableCell>
            <TableCell>${p.price}</TableCell>
            <TableCell>{p.stock}</TableCell>
            <TableCell class="flex justify-end w-full space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                class="flex items-center gap-2 border-success text-success hover:bg-success hover:text-success-foreground"
                onclick={(e) => { e.stopPropagation(); dispatch("edit", p); }} 
              >
                <Pencil class="w-4 h-4" /> Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                class="flex items-center gap-2"
                onclick={(e) => { e.stopPropagation(); dispatch("delete", p); }} 
              >
                <Trash2 class="w-4 h-4" /> Delete
              </Button>
            </TableCell>
          </TableRow>
        {:else}
          <TableRow>
            <TableCell colspan={5} class="h-24 text-center">
              {searchQuery ? "No products match your search." : "No products found."}
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
</div>