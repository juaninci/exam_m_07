import axios from 'axios';

//instancia de axios para no repetir la URL base en cada llamada
const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
  // Función para obtener todos los productos
    getProducts() {
        return apiClient.get('/products');
    },
  //para agregar luego getProductById(id), deleteProduct(id), etc.
    getCategories() {
    return apiClient.get('/products/categories');
  } //funcian para categoria
};