<template>
  <!-- eventos de mouse a la tarjeta principal -->
  <div 
    class="product-card" 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
  >
    <img :src="props.product.image" :alt="props.product.title" class="card-img" />
    <h3>{{ props.product.title }}</h3>
    <p class="price">{{ props.product.price }} USD</p>
    <button @click="addToCart">Agregar al carrito</button>

    <!-- PROYECCIÓN: Solo se muestra si isHovered es true -->
    <Transition name="fade">
      <div v-if="isHovered" class="projection-overlay">
        <div class="projection-content">
          <div class="projection-image-container">
            <img :src="props.product.image" :alt="props.product.title" />
          </div>
          
          <div class="projection-footer">
            <h4>{{ props.product.title }}</h4>
            <p>{{ props.product.description }}</p>
            <span class="projection-price">${{ props.product.price }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Estado local para controlar la proyección
const isHovered = ref(false);

onMounted(() => {
  console.log(`Producto ${props.product.title} listo`);
});

const addToCart = () => {
  alert(`Agregaste ${props.product.title} al carrito`);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  background: white;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.card-img { width: 100px; height: 100px; object-fit: contain; }
.price { font-weight: bold; color: #42b983; }

/*ESTILOS DE LA PROYECCIÓN */
.projection-overlay {
  position: absolute; /* 🎓 CAMBIO: De fixed a absolute */
  top: 0;
  left: 0;
  width: 100%;       /* 🎓 CAMBIO: De 100vw a 100% del padre */
  height: 100%;      /* 🎓 CAMBIO: De 100vh a 100% del padre */
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none; 
  backdrop-filter: blur(4px);
}

.projection-content {
  background: white;
  border-radius: 15px;
  width: 400px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  animation: popIn 0.3s ease-out;
}

.projection-image-container {
  background: #f9f9f9;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.projection-image-container img {
  max-width: 250px;
  max-height: 250px;
  object-fit: contain;
}

.projection-footer {
  padding: 20px;
  text-align: left;
  border-top: 1px solid #eee;
}

.projection-footer h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.projection-footer p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
}

.projection-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #42b983;
}

/* Animaciones */
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Transición de Vue para el fade in/out */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>