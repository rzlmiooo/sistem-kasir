<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";

  const { products } = $props();
  const dispatch = createEventDispatcher();
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold tracking-tight">Products</h2>
    <Button onclick={() => dispatch("create")}>
      Create Product
    </Button>
  </div>

  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-25">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead class="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each products as p (p.id)} 
          <TableRow>
            <TableCell class="font-medium">{p.id}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>${p.price}</TableCell>
            <TableCell>{p.stock}</TableCell>
            <TableCell class="text-right space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onclick={() => dispatch("edit", p)} 
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onclick={() => dispatch("delete", p)} 
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        {:else}
          <TableRow>
            <TableCell colspan={5} class="h-24 text-center">
              No products found.
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
</div>