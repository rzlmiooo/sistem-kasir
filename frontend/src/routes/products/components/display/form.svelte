<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Dialog from "$lib/components/ui/dialog";

  let { mode, product, open = $bindable(false) } = $props();

  let name = $state("");
  let price = $state(0);
  let stock = $state(0);

  $effect(() => {
    if (open) {
      name = product?.name ?? "";
      price = product?.price ?? 0;
      stock = product?.stock ?? 0;
    }
  });

  const dispatch = createEventDispatcher();

  function submit() {
    dispatch("submit", {
      id: product?.id,
      name,
      price,
      stock
    });
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-106">
    
    <Dialog.Header>
      <Dialog.Title>
        {mode === "create" ? "Create Product" : mode === "edit" ? "Edit Product" : "Delete Product"}
      </Dialog.Title>
      <Dialog.Description>
        {mode === "delete" 
          ? "Are you sure you want to delete this product? This action cannot be undone." 
          : "Fill in the details below to save the product."}
      </Dialog.Description>
    </Dialog.Header>

    <div class="space-y-4 py-4">
      {#if mode !== "delete"}
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Product Name" bind:value={name} />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="price">Price</Label>
            <Input id="price" type="number" placeholder="0" bind:value={price} />
          </div>
          <div class="space-y-2">
            <Label for="stock">Stock</Label>
            <Input id="stock" type="number" placeholder="0" bind:value={stock} />
          </div>
        </div>
      {:else}
        <div class="rounded-md bg-destructive/15 p-3 text-destructive">
          <p class="text-sm font-medium">
            Delete product: <b>{product?.name}</b>?
          </p>
        </div>
      {/if}
    </div>

    <Dialog.Footer>
      <Button variant="outline" onclick={() => (open = false)}>
        Cancel
      </Button>
      <Button 
        variant={mode === "delete" ? "destructive" : "default"} 
        onclick={submit}
      >
        {mode === "delete" ? "Confirm Delete" : "Save Changes"}
      </Button>
    </Dialog.Footer>

  </Dialog.Content>
</Dialog.Root>