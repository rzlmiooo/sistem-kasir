<script lang="ts">
  import { onMount } from "svelte";
  import postData from "$lib/api/postData";
  import type { Product, ProductPayload } from "./components/interfaces";
  import { PRODUCT_ENDPOINTS } from "./components/endpoints";

  import Table from "./components/display/table.svelte";
  import Form from "./components/display/form.svelte";

  let products: Product[] = $state([]);
  let selectedProduct: Product | null = $state(null);
  let selectedIdsToDelete: number[] = $state([]);  
  let showForm = $state(false);
  let formMode: "create" | "edit" | "delete" | "deleteMultiple" = $state("create");

  const loadProducts = async () => {
    try {
      const res = await postData(PRODUCT_ENDPOINTS.GET_ALL, {});
      let payload = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
      
      if (Array.isArray(payload.data)) {
        products = payload.data;
      } else {
        products = [];
      }
    } catch (error) {
      products = [];
    }
  }

  const createProduct = async (data: ProductPayload) => {
    await postData(PRODUCT_ENDPOINTS.CREATE, data);
    await loadProducts();
  }

  const updateProduct = async (data: ProductPayload) => {
    await postData(PRODUCT_ENDPOINTS.UPDATE, data);
    await loadProducts();
  }

  const deleteProduct = async (id: number) => {
    await postData(PRODUCT_ENDPOINTS.DELETE, { id });
    await loadProducts();
  }

  const deleteMultipleProducts = async (ids: number[]) => {
    if (ids.length === 0) return;
    
    const isConfirmed = confirm(`Are you sure you want to delete ${ids.length} selected products?`);
    if (!isConfirmed) return;

    try {
      const deletePromises = ids.map(id => postData(PRODUCT_ENDPOINTS.DELETE, { id }));
      await Promise.all(deletePromises);
      await loadProducts();
    } catch (error) {
      console.error("Gagal multi delete:", error);
    }
  }

  const refresh = async () => {
    await loadProducts();
  }

  const handleCreate = () => {
    formMode = "create";
    selectedProduct = null;
    showForm = true; 
  }

  const handleEdit = (product: Product) => {
    formMode = "edit";
    selectedProduct = product;
    showForm = true;
  }

  const handleDelete = (product: Product) => {
    formMode = "delete";
    selectedProduct = product;
    showForm = true; 
  }

  const handleDeleteMultiple = (ids: number[]) => {
    formMode = "deleteMultiple";
    selectedIdsToDelete = ids;
    showForm = true;
  }

  const handleSubmitMultiple = async () => {
    try {
      const deletePromises = selectedIdsToDelete.map(id => postData(PRODUCT_ENDPOINTS.DELETE, { id }));
      await Promise.all(deletePromises);
      await loadProducts();
      
      showForm = false; 
      selectedIdsToDelete = []; 
    } catch (error) {
      console.error("Gagal multi delete:", error);
    }
  }

  const handleSubmit = async (data: ProductPayload) => {
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

<div class="p-6 h-full space-y-4">
  <Form
    mode={formMode}
    product={selectedProduct}
    selectedCount={selectedIdsToDelete.length} 
    bind:open={showForm} 
    on:submit={(e) => handleSubmit(e.detail)}
    on:submitMultiple={handleSubmitMultiple} 
  />
  
  <div class="w-full">
    <Table
      {products}
      on:refresh={refresh}
      on:create={handleCreate}
      on:edit={(e) => handleEdit(e.detail)}
      on:delete={(e) => handleDelete(e.detail)}
      on:deleteMultiple={(e) => handleDeleteMultiple(e.detail)} 
    />
  </div>
</div>