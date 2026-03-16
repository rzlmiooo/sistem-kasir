<script lang="ts">
  import { onMount } from "svelte";
  import postData from "$lib/api/postData";
  import type { Product, ProductPayload } from "./components/interfaces";
  import { PRODUCT_ENDPOINTS } from "./components/endpoints";

  import Table from "./components/display/table.svelte";
  import Form from "./components/display/form.svelte";

  let products: Product[] = $state([]);
  let selectedProduct: Product | null = $state(null);
  let formMode: "create" | "edit" | "delete" = $state("create");
  
  let showForm = $state(false);

  async function loadProducts() {
    try {
      const res = await postData(PRODUCT_ENDPOINTS.GET_ALL, {});
      
      let payload = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
      
      if (Array.isArray(payload.data)) {
        products = payload.data;
      } else {
        console.warn("Waduh, payload.data bukan array bro!", payload.data);
        products = [];
      }
      
    } catch (error) {
      console.error("Gagal load products:", error);
      products = [];
    }
  }

  async function createProduct(data: ProductPayload) {
    await postData(PRODUCT_ENDPOINTS.CREATE, data);
    await loadProducts();
  }

  async function updateProduct(data: ProductPayload) {
    await postData(PRODUCT_ENDPOINTS.UPDATE, data);
    await loadProducts();
  }

  async function deleteProduct(id: number) {
    await postData(PRODUCT_ENDPOINTS.DELETE, { id });
    await loadProducts();
  }

  function handleCreate() {
    formMode = "create";
    selectedProduct = null;
    showForm = true; 
  }

  function handleEdit(product: Product) {
    formMode = "edit";
    selectedProduct = product;
    showForm = true;
  }

  function handleDelete(product: Product) {
    formMode = "delete";
    selectedProduct = product;
    showForm = true; 
  }

  async function handleSubmit(data: ProductPayload) {
    try {
      if (formMode === "create") await createProduct(data);
      if (formMode === "edit") await updateProduct(data);
      if (formMode === "delete" && data.id !== undefined) await deleteProduct(data.id);
      
      showForm = false; 
    } catch (error) {
      console.error("Gagal submit:", error);
    }
  }

  onMount(loadProducts);
</script>

<div class="p-6 space-y-4">
  
  <Form
    mode={formMode}
    product={selectedProduct}
    bind:open={showForm} 
    on:submit={(e) => handleSubmit(e.detail)}
  />
  
  <div class="w-full">
    <Table
      {products}
      on:create={handleCreate}
      on:edit={(e) => handleEdit(e.detail)}
      on:delete={(e) => handleDelete(e.detail)}
    />
  </div>
  
</div>