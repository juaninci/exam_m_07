<template>
  <!-- Contenedor principal con posición relativa para que la proyección de la card se centre aquí -->
  <div class="product-container">
    
    <!-- 🔍 SECCIÓN DE FILTROS -->
    <div class="filter-section">
      <label for="category-select">Filtrar por categoría: </label>
      <select id="category-select" v-model="selectedCategory">
        <option value="all">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ formatCategory(cat) }}
        </option>
      </select>
    </div>

    <!-- ⏳ ESTADO DE CARGA (Loading) -->
    <div v-if="loading" class="status-message">
      <div class="spinner"></div>
      <p>Cargando productos increíbles...</p>
    </div>

    <!-- ❌ ESTADO DE ERROR (Error) -->
    <!-- Importante: La clase 'error' es la que buscan los Unit Tests -->
    <div v-else-if="error" class="status-message error">
      <p>⚠️ {{ error }}</p>
      <button @click="fetchData">Reintentar</button>
    </div>

    <!-- 📦 ESTADO VACÍO (Empty) -->
    <div v-else-if="filteredProducts.length === 0" class="status-message empty">
      <p>No encontramos productos en esta categoría. 🔍</p>
    </div>

    <!-- ✅ LISTA DE PRODUCTOS (Success) -->
    <div v-else class="product-grid">
      <ProductCard 
        v-for="prod in filteredProducts" 
        :key="prod.id" 
        :product="prod" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();

// --- PROPIEDADES COMPUTADAS (Sincronizadas con Vuex) ---
// Usamos computed para que el componente reaccione automáticamente a los cambios en el store

const loading = computed(() => store.state.products.loading);
const error = computed(() => store.state.products.error);
const categories = computed(() => store.state.filters.categories);

// Getter y Setter para el v-model del select
const selectedCategory = computed({
  get: () => store.state.filters.selectedCategory,
  set: (value) => store.commit('filters/SET_CATEGORY', value)
});

// Lógica de filtrado reactiva
const filteredProducts = computed(() => {
  const products = store.state.products.items;
  const cat = store.state.filters.selectedCategory;
  
  if (cat === 'all') return products;
  return products.filter(p => p.category === cat);
});

// --- MÉTODOS ---

const fetchData = async () => {
  try {
    // Disparamos las acciones del store
    await Promise.all([
      store.dispatch('products/fetchProducts'),
      store.dispatch('filters/fetchCategories')
    ]);
  } catch (err) {
    console.error("Error crítico al cargar datos:", err);
  }
};

const formatCategory = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// CICLO DE VIDA 

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.product-container {
  position: relative; /* Fundamental para el posicionamiento absolute de la proyección de la Card */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 400px;
}

.filter-section {
  margin: 20px;
  text-align: center;
  font-size: 1.1rem;
}

select {
  padding: 8px;
  margin-left: 10px;
  border-radius: 5px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.status-message {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
}

.error { 
  color: #d9534f; 
}

.empty { 
  color: #666; 
  font-style: italic; 
}

/* Spinner de carga */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>