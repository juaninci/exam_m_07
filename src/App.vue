<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ProductList from './components/ProductList.vue';
</script>

<template>
    <div id="app-container">
        <AppHeader />

    <main>
        <ProductList />
    </main>

        <AppFooter />
    </div>
</template>

<style>
/* Estilos globales */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f9f9f9;
}
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>