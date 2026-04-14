export default {
  namespaced: true,
  state: () => ({
    favoriteIds: [] // Guardamos solo los IDs para ahorrar memoria
  }),
  mutations: {
    TOGGLE_FAVORITE(state, productId) {
      const index = state.favoriteIds.indexOf(productId);
      if (index > -1) {
        // Si ya existe, lo eliminamos
        state.favoriteIds.splice(index, 1);
      } else {
        // Si no existe, lo agregamos
        state.favoriteIds.push(productId);
      }
    }
  },
  actions: {
    toggleFavorite({ commit }, productId) {
      commit('TOGGLE_FAVORITE', productId);
    }
  },
  getters: {
    isFavorite: (state) => (productId) => state.favoriteIds.includes(productId)
  }
};