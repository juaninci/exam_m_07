import { mount } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';
import { createStore } from 'vuex';

describe('ProductList.vue', () => {
  it('debe mostrar el mensaje de error cuando el store tiene un error', async () => {
    // 🚀 CAMBIO CLAVE: Definimos el store usando 'modules' para imitar la app real
    const store = createStore({
      modules: {
        products: {
          namespaced: true,
          state: { 
            items: [], 
            loading: false, 
            error: 'Error de conexión' 
          },
          actions: {
            fetchProducts: () => Promise.resolve()
          }
        },
        filters: {
          namespaced: true,
          state: { 
            categories: [], 
            selectedCategory: 'all' 
          },
          actions: {
            fetchCategories: () => Promise.resolve()
          }
        }
      }
    });

    const wrapper = mount(ProductList, {
      global: {
        plugins: [store]
      }
    });

    
    await new Promise(resolve => setTimeout(resolve, 0)); 
    await wrapper.vm.$nextTick();

    console.log("HTML ACTUAL:", wrapper.html()); // <--- MIRA ESTO EN LA TERMINAL
    
    const errorDiv = wrapper.find('.error');
    expect(errorDiv.exists()).toBe(true);
  });
});