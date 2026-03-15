<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  const products = data.products;
</script>

<main class="min-h-screen bg-slate-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Kasir MVP</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each products as product (product.id)}
        <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-800">{product.name}</h2>
            <p class="text-slate-500 text-sm">Sisa Stok: {product.stock}</p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="font-bold text-slate-900">Rp {product.price.toLocaleString('id-ID')}</span>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Tambah
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>