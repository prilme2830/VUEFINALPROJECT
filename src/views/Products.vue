<script setup>
import { ref, computed } from "vue";
import { products } from "../stores/shop";
import ProductCard from "../components/ProductCard.vue";

const search = ref("");
const category = ref("All");

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesCategory =
      category.value === "All" || product.category === category.value;

    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <section class="section">
    <p class="eyebrow">SHOP FRESH</p>
    <h1>Our Products</h1>
    <p>Discover fresh fruits and vegetables for your daily needs.</p>

    <div class="filters">
      <input
        v-model="search"
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
      />

      <select v-model="category" aria-label="Filter by category">
        <option>All</option>
        <option>Fruits</option>
        <option>Vegetables</option>
      </select>
    </div>

    <p>{{ filteredProducts.length }} product(s) found</p>

    <div v-if="filteredProducts.length" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <p v-else class="empty-state">No products match your search.</p>
  </section>
</template>
