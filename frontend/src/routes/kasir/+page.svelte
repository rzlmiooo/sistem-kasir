<script lang="ts">
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
  
  let products = $derived(data.products || []);
</script>

<main class="min-h-screen bg-slate-50 p-8">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-slate-800">Kasir MVP</h1>
      <button class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition">
        + Produk Baru
      </button>
    </div>
    
    {#if products.length === 0}
      <div class="bg-white border border-slate-200 p-12 rounded-xl shadow-sm text-center">
        <p class="text-slate-500 text-lg mb-2">Belum ada produk nih bro 📦</p>
        <p class="text-slate-400 text-sm">Coba isi dummy data dulu via Drizzle Studio atau bikin fitur API POST-nya.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each products as product (product.id)}
          <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h2 class="text-lg font-semibold text-slate-800">{product.name}</h2>
              <p class="text-sm {product.stock < 10 ? 'text-red-500 font-medium' : 'text-slate-500'}">
                Sisa Stok: {product.stock}
              </p>
            </div>
            
            <div class="mt-4 flex items-center justify-between">
              <span class="font-bold text-slate-900">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition">
                Tambah
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    
  </div>
</main>