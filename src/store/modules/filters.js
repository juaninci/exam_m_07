import productService from '@/services/productService';

export default {
  namespaced: true,
  state: () => ({
    selectedCategory: 'all',
    categories: []
  }),
  mutations: {
    SET_CATEGORY(state, category) { 
      state.selectedCategory = category; 
    },
    SET_CATEGORIES(state, categories) { 
      state.categories = categories; 
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await productService.getCategories();
        commit('SET_CATEGORIES', response.data);
      } catch (err) {
        console.error("Vuex Error fetchCategories:", err);
      }
    }
  }
};