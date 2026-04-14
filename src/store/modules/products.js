import productService from '@/services/productService';

export default {
  namespaced: true, // Evita choques de nombres con otros módulos
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  mutations: {
    // Las mutaciones son la única forma de cambiar el estado
    SET_ITEMS(state, products) { 
      state.items = products; 
    },
    SET_LOADING(state, status) { 
      state.loading = status; 
    },
    SET_ERROR(state, error) { 
      state.error = error; 
    }
  },
  actions: {
    // Aquí va la lógica asíncrona
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await productService.getProducts();
        commit('SET_ITEMS', response.data);
      } catch (err) {
        commit('SET_ERROR', 'Hubo un problema al obtener los productos.');
        console.error("Vuex Error fetchProducts:", err);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    allProducts: (state) => state.items
  }
};