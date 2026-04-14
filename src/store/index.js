import { createStore } from 'vuex';
import products from './modules/products.js';
import filters from './modules/filters.js';
import favorites from './modules/favorites.js';

// 🎓 IMPORTANTE: Exportar por defecto el resultado de createStore
export default createStore({
  modules: {
    products,
    filters,
    favorites
  }
});