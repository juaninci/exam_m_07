import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  const mockProduct = {
    title: 'Laptop Gamer',
    price: 1200,
    image: 'test-image.jpg',
    description: 'Una laptop potente'
  };

  it('debe renderizar correctamente la información del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct }
    });

    expect(wrapper.text()).toContain('Laptop Gamer');
    expect(wrapper.text()).toContain('1200');
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('test-image.jpg');
  });
});